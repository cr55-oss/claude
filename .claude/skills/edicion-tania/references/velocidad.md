# Edición paso a paso y rápida [fijo]

Problema real que resuelve: la primera versión tardaba ~1 h y **cada ajuste, aunque fuera mínimo, otra hora** (4 h+ por video). Causa: se rehacía todo (análisis, render completo en 1080) en cada vuelta. Regla: **nada se calcula dos veces y nada se renderiza completo hasta el final.**

Objetivos: primera revisión del corte en ≤ 15 min; un ajuste básico en ≤ 5 min; render final una sola vez.

## 1. Preparación (una sola vez por video, se guarda en `work/`)
- **Proxy de edición:** si el crudo es 4K, HEVC/H.265, HDR o de cuadros variables (típico de iPhone), convertirlo **una vez** a 1080×1920 H.264, 30 fps constantes, keyframe cada segundo:
  `ffmpeg -i crudo.mov -vf "scale=1080:1920,fps=30" -c:v libx264 -crf 16 -preset fast -g 30 -pix_fmt yuv420p -c:a aac work/proxy.mp4`
  Remotion **nunca** lee el crudo 4K/HEVC directo: decodificarlo cuadro por cuadro es lo que más alarga el render. (Si el plan usa zoom > 1,3x, hacer el proxy en 1440×2560 solo para esos tramos.)
- **Voz procesada** (`work/voz.wav`), **transcripción** (`work/whisper.json`), **silencios** y **eventos** se calculan una vez. En cada ajuste se **reutilizan**; jamás se vuelve a transcribir ni a analizar.
- **`work/estado.json`:** qué pasos están aprobados (corte, color, escenas 1…n, audio). Al retomar o corregir, Claude lee este archivo y no repite lo aprobado.

## 2. Todo lo editable es un dato, no código
- `work/corte.json` — tramos que se quedan (inicio/fin en segundos).
- `work/escenas.json` — por escena: tramo, subtítulos, efecto, B-roll, zoom, textos.
- `work/audio.json` — música, puntos de ducking, SFX con su tiempo y volumen.
Los componentes de Remotion **leen** estos archivos. Un ajuste ("quita esa pausa", "ese texto 1 s antes", "otro B-roll") = **cambiar una línea del JSON**, no reescribir componentes.

## 3. Paso a paso con aprobación (sustituye a "editar todo y mostrar al final")
Después de cada paso, Claude muestra el resultado, espera "ok" o el ajuste, y marca el paso en `estado.json`.

| Paso | Cómo se hace (rápido) | Qué ve el usuario |
|---|---|---|
| **A. Corte en bruto** | Solo ffmpeg: concatenar los tramos de `corte.json` desde el proxy a 540 px, `-preset ultrafast`. **Sin Remotion.** Minutos. | MP4 ligero del corte con la voz limpia. Aquí se corrigen tomas, muletillas y pausas: la mayoría de los ajustes. |
| **B. Color** | Un ajuste de color (LUT/curvas) **horneado con ffmpeg** sobre el corte aprobado → `work/base.mp4`. No se aplica como filtro en Remotion. | 3 cuadros antes/después. |
| **C. Gráficos por escena** | Remotion sobre `base.mp4`. Revisión en **Remotion Studio** (`npx remotion studio`): se reproduce en vivo en el navegador, **sin renderizar**. Si el usuario no puede ver Studio, render de **solo esa escena** a 540 px (`--frames=a-b --scale=0.5`). | Escena por escena (o bloques de 3–4 escenas). |
| **D. Audio** | Mezcla de música + SFX + voz **con ffmpeg** sobre `base.mp4` a 540 px. Segundos. | Video ligero para escuchar la mezcla (en el celular). |
| **E. Render final** | Una sola vez, en 1080, **por segmentos** (uno por escena o cada ~15 s) en paralelo, y unirlos con `ffmpeg -f concat -c copy`. Normalizar −14 LUFS. | El MP4 final (o subirlo a invideo para el acabado). |

## 4. Correcciones después del render final
- Ubicar la escena afectada → cambiar su dato → **re-renderizar solo ese segmento** → volver a unir con `-c copy` (segundos).
- Cambio de audio (volumen, SFX, música) → solo remezclar el audio y reemplazarlo en el MP4 con `-c:v copy`. **Nunca** re-renderizar la imagen por un cambio de audio.
- Cambio de texto/subtítulo → solo el segmento donde está.
- Si el ajuste es manual y chico (mover un B-roll, recortar un silencio), hacerlo en **invideo** o DaVinci (ver `flujo-tecnico.md`), sin pasar por Claude.

## 5. Reglas de rendimiento en Remotion
- Nada de `backdrop-filter`/`filter: blur()` sobre el video a pantalla completa en cada cuadro: es lo más lento que existe. El fondo desenfocado del vidrio (glass type, checklist) se **pre-renderiza una vez** con ffmpeg (`boxblur`) como video aparte y se usa como capa.
- El recorte de Tania (máscara) se calcula **una vez** solo para los tramos que lo necesitan, no para todo el video.
- `--concurrency` ≈ núcleos − 1; `--image-format=jpeg` cuando no se necesita transparencia; aceleración por GPU si el equipo la tiene.
- Lottie y SVG en vez de video para animaciones cuando se pueda (más livianos).

## 6. Medir siempre
Al entregar, reportar el tiempo de cada paso (preparación, corte, color, escenas, audio, render, cada corrección). Si algo pasa de los objetivos de arriba, decir cuál paso fue y por qué, para corregir la skill.
