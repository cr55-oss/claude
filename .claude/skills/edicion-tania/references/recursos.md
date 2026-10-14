# Buscar y elegir B-roll, música y efectos

Claude busca y preselecciona los recursos **él mismo**; el usuario aprueba la selección junto con el plan.

## Dónde y cómo
| Fuente | Cómo accede Claude | Qué buscar ahí |
|---|---|---|
| **Pexels** (gratis, API) | `scripts/buscar-broll.mjs` con `PEXELS_API_KEY` | B-roll de mamás, bebés, casa, baño, médico |
| **Pixabay** (gratis, API, opcional) | el mismo script con `PIXABAY_API_KEY` | complemento de Pexels |
| **Artlist** (de pago, sin API pública) | **Claude en Chrome** con la sesión del usuario: navegar artlist.io, buscar, abrir clips, mirar previsualizaciones y descargar con su cuenta | B-roll premium, **música** y **efectos de sonido** |

Si Claude en Chrome no está disponible, Claude prepara la lista de búsquedas exactas y el usuario descarga.

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

## Música (Artlist / Epidemic)
- Claude **no puede escuchar**: preselecciona por la información del catálogo (estado de ánimo, instrumentos, BPM, duración, si tiene secciones tensas y cálidas, si tiene versiones/stems).
- Propone **3 pistas** con el motivo y los tiempos donde cambiaría de sección; **el usuario las escucha y elige**.
- Búsquedas: `emotional piano warm`, `soft ambient hopeful`, `gentle piano tension`, sin voces.

## Efectos de sonido
Preselección por nombre/descripción en Artlist: `pencil scratch paper`, `soft low whoosh`, `muted low pop`, `heartbeat soft`, `ice cubes dropping in water`. El usuario confirma al oírlos en la primera revisión; después quedan como "kit" fijo en `Reels-Tania/sfx/` para todos los videos.
