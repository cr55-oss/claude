# Flujo técnico (PC del usuario)

## Carpetas
```
Reels-Tania/
├── crudos/      ← videos originales (sincronizados desde Google Drive)
├── musica/      ← pistas de Artlist/Epidemic
├── sfx/         ← whoosh, pop, tick, hielo, etc.
├── broll/       ← tomas de archivo descargadas
├── proyectos/<tema>/   ← proyecto Remotion + work/ de cada video
└── editados/    ← MP4 finales
```
Nunca trabajes dentro de carpetas sincronizadas por la nube activas (Node se traba leyendo `node_modules`); el proyecto va en `proyectos/` local.

## Herramientas
- **Remotion** (cargar la skill `remotion-best-practices` antes de escribir componentes).
- **Whisper local** vía `@remotion/install-whisper-cpp` (modelo `large-v3-turbo`, idioma `es`, timestamps por palabra). La skill `modelo-clinico` trae un `scripts/preparar.mjs` que ya transcribe por tramos de voz y detecta silencios; se puede reutilizar como base.
- **ffmpeg** (el que trae Remotion o el del sistema).
- Fuentes: Montserrat 300/800/900 e Instrument Serif (regular e itálica) para los efectos editoriales (Google Fonts; descargarlas al proyecto para no depender de internet al renderizar).
- B-roll: Artlist (licencia comercial) o Pexels (API gratuita).

## Fase 1 — comandos útiles
```bash
# datos técnicos
ffprobe -v error -print_format json -show_streams -show_format crudo.mp4
# cuadros de muestra (1 cada 5 s) y del inicio (5 por segundo en los primeros 6 s)
ffmpeg -i crudo.mp4 -vf fps=1/5,scale=540:-1 work/muestra-%03d.jpg
ffmpeg -t 6 -i crudo.mp4 -vf fps=5,scale=540:-1 work/inicio-%03d.jpg
# silencios
ffmpeg -i crudo.mp4 -af silencedetect=noise=-35dB:d=0.35 -f null -
# cambios de escena
ffmpeg -i crudo.mp4 -vf "scdet=threshold=10" -f null -
# energía de movimiento (luego leer los valores por cuadro)
ffmpeg -i crudo.mp4 -vf "tblend=all_mode=difference,signalstats,metadata=print:key=lavfi.signalstats.YAVG" -f null -
# volumen de un tramo (habla ≈ −20 dB, silencio ≈ −60 dB)
ffmpeg -ss <de> -t <dur> -i crudo.mp4 -af volumedetect -f null -
```
Para el movimiento fuera del rostro, recorta primero el área sin cara (`crop=`) antes del `tblend`.

## Fase 6 — orden de edición en Remotion
1. **Corte:** lista de tramos a conservar (de los tiempos de Whisper + silencios) → video base continuo.
2. **Color:** filtro CSS/LUT sobre el `<OffthreadVideo>` (balance, exposición, contraste, calidez) + capa de grano y viñeta.
3. **Voz:** procesar el audio con ffmpeg antes de Remotion (afftdn ligero, highpass=f=80, equalizer, deesser, acompressor, alimiter) y usar ese audio limpio.
4. **Componentes:** `Subtitulo`, `TituloApilado`, `VentanaBroll`, `Acercamiento`, `ByN`, `Destello` y los efectos de héroe del plan (`CoverStory`, `GlassType`, `ChecklistGlass`, `ChartGrow`, `HeadlineWall`, `ZoomDigital`, ver `efectos.md`; los que van "detrás de Tania" usan la máscara de recorte). Todo sincronizado por **frame de la palabra** (de Whisper), no por segundos aproximados.
5. **Música y SFX:** pistas en `<Audio>` con volumen por frame (ducking dibujado según los tiempos de voz).
6. **Render:** h264, crf ~17, yuv420p, bt709; luego normalizar a −14 LUFS / −1 dBTP con ffmpeg `loudnorm` en dos pasadas.

## Velocidad (objetivo: ≤ 30–40 min por video después del primero)
1. **Plantilla reutilizable:** si existe `.claude/skills/edicion-tania/assets/template/`, copiarla como base del proyecto (componentes, fuentes, kit de SFX, configuración de render) en lugar de construir desde cero. **Al terminar un video aprobado**, copiar ahí los componentes nuevos o mejorados (`Subtitulo`, `TituloApilado`, efectos de héroe, animaciones, `VentanaBroll`, etc.), sin el video ni los archivos pesados, y hacer commit, para que el siguiente video arranque con todo hecho.
2. **Biblioteca de animaciones:** cada animación o efecto nuevo (termómetro, virus, checklist…) se guarda en la plantilla; los videos siguientes reutilizan los que ya existen.
3. **En paralelo:** mientras Whisper transcribe, buscar música/efectos/B-roll y extraer cuadros.
4. **Revisión sin re-render:** el acabado y los ajustes chicos se hacen en **invideo** (sección abajo). Para cambios en efectos, abrir **Remotion Studio** (`npx remotion studio`) o renderizar solo el tramo afectado (`--frames=inicio-fin`) a 540 px. Las capas en 1080 se renderizan **una sola vez**.
5. **Render:** usar la máxima concurrencia razonable (`--concurrency` ≈ núcleos − 1) y aceleración por hardware si el equipo la tiene; Whisper con GPU si está disponible.
6. **Registrar tiempos** de cada fase en la entrega para saber dónde se va el tiempo y mejorarlo.

## Acabado en invideo (ajustes sin re-render)
Remotion hace la edición y los efectos; **invideo es la mesa de acabado**: ahí se revisa y se ajusta sin volver a renderizar todo.
- **Conector:** en Claude Code usar el conector completo de invideo (`https://mcp.invideo.io/mcp`); el de las apps de Claude es solo para claude.ai. Al entrar a un proyecto, registrar un nombre (`register`) y pasarlo como `as` en cada llamada.
- **Proyecto por video:** `new_project` con el nombre del tema (p. ej. "Tania — fiebre agua fría"); ahí también se busca el B-roll de iStock (ver `recursos.md`).
- **Qué se sube (por capas, no un solo MP4):**
  1. Corte limpio con color y voz procesada (H.264 1080×1920).
  2. Capa de gráficos/efectos con transparencia (ProRes 4444 o WebM VP9 con alfa). **Verificar en el primer video que invideo respete el alfa**; si no, subir el render completo con gráficos y dejar en invideo solo música, SFX, B-roll y textos.
  3. Música y SFX como pistas separadas (WAV).
  Subir con `start_upload` → `add_media`; armar la línea de tiempo con `new_timeline` (1080×1920, 30 fps) y `edit_timeline` (consultar antes `timeline_catalog` con los `ops` que se van a usar). Marcar con `timeline_history` un checkpoint "v1 Claude" antes de cualquier ajuste.
- **Revisión (Fase 7):** `capture` en los cuadros clave para revisarlos primero; luego `add_to_export_page` + `share_export_page` para darle al usuario (o a Tania) un link donde ver el corte. Ajustes chicos (mover un B-roll, recortar un silencio, subir/bajar música, cambiar un texto) se hacen ahí con `edit_timeline`, sin re-render de Remotion. Solo un cambio en un efecto de héroe vuelve a Remotion, y se re-renderiza únicamente esa capa/tramo.
- **Entrega:** `export` con `format: video` (o `davinci`/`premiere` si el usuario quiere retocar a mano). Revisar el MP4 exportado: 1080×1920, −14 LUFS / −1 dBTP (si no cumple, normalizar con ffmpeg `loudnorm`).
- Si el conector de invideo no está disponible, seguir el camino anterior (render final en Remotion + exportación opcional para DaVinci).

## Exportación opcional para ajustes manuales (DaVinci Resolve)
Si no se usa invideo y el usuario quiere retocar algo a mano sin pedir otro render, exportar además: las capas de gráficos como video con transparencia (ProRes 4444 o WebM con alfa), el corte limpio, la música y los efectos por separado, y una línea de tiempo **FCPXML** que DaVinci Resolve (gratis) abre con todo acomodado.

## Fase 7 — cuadros de revisión
`renderStill` en cada evento del plan y en los bordes de cada escena, a escala 0,5. Revisarlos antes de mostrarlos.
