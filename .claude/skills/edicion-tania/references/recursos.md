# Buscar y elegir B-roll, música y efectos

Claude busca y preselecciona los recursos **él mismo**; el usuario aprueba la selección junto con el plan.

## Dónde y cómo
| Fuente | Cómo accede Claude | Qué buscar ahí |
|---|---|---|
| **Epidemic Sound — música y efectos (conector)** | Conector `Epidemic_Sound` (ver sección abajo) | Música con arco emocional, stems, ajuste a la duración exacta, efectos de sonido |
| **Artlist — B-roll principal (suscripción ya pagada)** | Claude en Chrome con la sesión del usuario | B-roll (y música/efectos si Epidemic no tiene algo). Las descargas de stock entran en la suscripción (sin costo por clip); las funciones de IA de Artlist sí pueden gastar créditos aparte: no usarlas sin aprobación |
| **Magnific (antes Freepik) — respaldo** | **Conector `magnific`**: `stock_search` (video/foto/vector/ícono; filtros `ai_generated: excluded`, `orientation`, `video_type: footage`), `stock_get` (detalles), previsualización con marca de agua para elegir, `stock_download` para el archivo final (**gasta créditos**: ~150 los gratuitos, ~600 los premium) | B-roll de mamás/bebés/fiebre/baño, fotos |
| **Pexels** (gratis, API) | `scripts/buscar-broll.mjs` con `PEXELS_API_KEY` | B-roll de mamás, bebés, casa, baño, médico |
| **Pixabay** (gratis, API, opcional) | el mismo script con `PIXABAY_API_KEY` | complemento de Pexels |

Si Claude en Chrome no está disponible, Claude prepara la lista de búsquedas exactas y el usuario descarga.

**Audio:** Epidemic primero → Artlist si falta algo.

**Orden de búsqueda (B-roll):** Artlist primero (ya pagado) → Pexels/Pixabay (gratis) → Magnific (créditos) → Higgsfield para generar solo objetos/detalles que no existan en stock (créditos). Todo costo va en el plan.

### Magnific: reglas de uso
- Revisa el saldo con `account_balance` antes de descargar; **nunca descargues (gasta créditos) antes de la aprobación del plan.**
- Elige mirando la previsualización (`previewUrl` / `videoPreviewUrl`, con marca de agua): bájala y extrae 3 cuadros con ffmpeg para revisarla.
- Prefiere tomas **no generadas con IA** para personas y bebés; prefiere `orientation: portrait` o tomas donde el sujeto quepa en la ventana.
- Al descargar, registra la licencia (`creations_register_download` con `license: true`) y guarda el archivo licenciado, nunca la previsualización.
- Magnific también puede **generar efectos de sonido** (`audio_sfx_generate`: brillo de vidrio, hielo cayendo al agua, whoosh grave) y **limpiar voz** (`audio_clean_speech`). Úsalos solo si el plan lo indica y con el costo en créditos visible en el plan.

## Flujo (dentro de la Fase 4, antes de pedir aprobación)
1. Para cada hueco de B-roll del plan, escribe 2–3 búsquedas en inglés (los catálogos responden mejor): situación + detalle + luz. Ej.: `mother touching baby forehead warm light`, `mom checking baby fever home`.
2. Busca 6–10 candidatos por hueco (script o Chrome).
3. **Mira las imágenes** (miniatura + cuadros de muestra) de cada candidato y descarta con los criterios de abajo.
4. Deja **2–3 finalistas por hueco**, ordenados, con una línea de por qué.
5. En el plan, sección "Recursos": por hueco, el finalista recomendado + alternativas (link + imagen local) para que el usuario apruebe.
6. Después de la aprobación: descarga el elegido (`buscar-broll.mjs bajar --slot ... --id ...` o Chrome) a `Reels-Tania/broll/` y guarda el archivo de créditos.

## Criterios para elegir B-roll
- **Muestra exactamente lo que Tania dice** en ese instante (no "algo parecido").
- **Luz cálida y natural**, colores compatibles con el look de Tania; nada de luz fría de oficina ni saturación exagerada.
- **Personas creíbles para el público de Tania** (mamás latinas, casas reales); evitar estética de banco de imágenes "perfecta" o posada.
- **Bebés:** nada de llanto dramático, riesgo real, desnudez ni situaciones que una mamá vería como peligrosas o incorrectas (p. ej. mala práctica de sueño seguro).
- **Composición:** el sujeto debe caber bien en la ventana de la zona de contenido (o en vertical si va a pantalla completa); evitar texto, logos o marcas de agua.
- **Calidad:** mínimo 1080 px en el lado corto; sin cámara temblorosa salvo que se busque.
- **Licencia:** uso comercial permitido; guardar créditos.

## Higgsfield (conector) — solo cuando el stock no alcanza
Generación con IA (imagen/video), mejora de material y predicción de desempeño. **Gasta créditos: cada uso va en el plan con su costo y requiere aprobación.**

**Sí se usa para:**
- Planos de **objetos o detalle** que no existen en stock o no encajan: hielo cayendo al agua en cámara lenta, gotas, termómetro en macro, ropa ligera sobre una cama, un vaso de agua con luz cálida.
- Visuales **abstractos/explicativos** que una animación no resuelve bien (siempre coherentes con el look cálido; nunca "anatomía hiperrealista").
- **Mejorar material propio:** reescalar (`upscale_video`), reencuadrar (`reframe`) o reiluminar un cuadro problemático.
- **Revisión opcional del corte final** con `virality_predictor` (fuerza del gancho, riesgo de abandono). Es una opinión más, no una verdad: se reporta junto con el análisis propio.

**No se usa para [fijo]:**
- Bebés, niños o personas realistas generados con IA (se nota y resta credibilidad médica).
- Procedimientos médicos, síntomas o diagnósticos "mostrados" con IA.
- Clonar la voz o la cara de Tania, ni avatares/"AI influencer" de ella.

## Música y efectos con Epidemic Sound (conector — fuente principal de audio)
Herramientas del conector `Epidemic_Sound`:
- `SearchRecordings`: buscar por término, estado de ánimo (`moodSlugs`), instrumento, BPM, duración, sin voces (`vocals: false`). Devuelve etiquetas, BPM, duración, **stems** y una vista previa MP3.
- `SearchSimilarToRecording` / `SearchExternalReferences`: "algo como esta pista" (incluso a partir de una canción de Spotify que le guste al usuario).
- `EditRecording` + `PollEditRecordingJob` + `DownloadRecordingEdit`: **reacomoda la pista a la duración exacta del video** (`targetDurationMs`), evitando o prefiriendo partes (`preferenceRegions`) y **colocando una sección concreta en un segundo concreto** (`requiredRegionsAtOffsets`), p. ej. que la parte que "resuelve" caiga justo en la frase clave o en el CTA.
- `DownloadRecording`: WAV completo o **stems** (p. ej. solo `INSTRUMENTS` o sin `DRUMS`) para bajar la energía en partes tranquilas.
- `SearchSoundEffects` / `SearchSimilarToSoundEffect` / `DownloadSoundEffect`: kit de efectos (brillo de vidrio, tick suave, hielo cayendo al agua, whoosh grave, latido).

**Cómo "escucha" Claude la música sin oídos:** descarga la vista previa MP3 y la analiza con ffmpeg (curva de volumen por segundo con `ebur128`/`astats`, silencios, picos) o lee el `waveformUrl`. Así ubica dónde la pista es tranquila, dónde crece y dónde resuelve, y la alinea con el arco del guion. Aun así, **el usuario escucha las 2–3 finalistas y elige**.

Flujo de música en el plan:
1. Buscar 6–10 pistas por estado de ánimo (`sentimental`, `hopeful`, `peaceful`, `elegant`; piano solo o ambient; sin voces; 60–90 BPM).
2. Analizar su forma (curva de energía) y quedarse con 3 cuya forma se parezca al arco emocional del video.
3. En el plan: las 3 con link de vista previa, motivo y en qué segundo del video caería cada sección.
4. Tras la aprobación: `EditRecording` a la duración exacta del corte final, con la sección que resuelve anclada a la frase clave / CTA; descargar en WAV.

## Música (Artlist / Epidemic) — criterios
- Claude **no puede escuchar**: preselecciona por la información del catálogo (estado de ánimo, instrumentos, BPM, duración, si tiene secciones tensas y cálidas, si tiene versiones/stems).
- Propone **3 pistas** con el motivo y los tiempos donde cambiaría de sección; **el usuario las escucha y elige**.
- Búsquedas: `emotional piano warm`, `soft ambient hopeful`, `gentle piano tension`, sin voces.

## Efectos de sonido
Preselección por nombre/descripción en Artlist: `soft glass shimmer`, `soft tick`, `soft low whoosh`, `muted low pop`, `heartbeat soft`, `ice cubes dropping in water`. El usuario confirma al oírlos en la primera revisión; después quedan como "kit" fijo en `Reels-Tania/sfx/` para todos los videos.
