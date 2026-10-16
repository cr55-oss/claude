# Estilo visual — "Editorial cálido"

Valores por defecto. Ajusta al encuadre y al contenido de cada video y explica el ajuste en el plan.

## Formato
1080×1920, 30 fps. Si el crudo es horizontal o muy cerrado, propone en el plan cómo reencuadrar.

## Color e imagen (se corrige ANTES de poner gráficos)
1. Balance de blancos neutro; piel natural (nunca naranja ni verdosa).
2. Rostro bien expuesto; levantar sombras del rostro sin lavar los negros del todo.
3. Contraste medio, negros apenas lavados, tono general cálido suave.
4. Grano sutil (3–5 %) y viñeta suave en todo el video.
*Por qué:* lo primero que se percibe como "premium" es la piel y la luz.

## Encuadre
- Base 100 %. "Respiración": variar 100 ↔ 104 % cada 4–6 s para que el plano no se sienta congelado.
- **Acercamiento seco (★)** a 112–118 % centrado en el rostro, solo en frases clave o en la cumbre de una acción. Corte seco, sin animar el zoom.

## Zonas de pantalla (sobre 1080×1920)
| Zona | Área aprox. | Uso |
|---|---|---|
| Franja segura superior | y 0–220 | nada importante (interfaz de IG) |
| Zona de contenido | sobre la cabeza (medir en cada video) | animaciones, efectos de héroe, ventanas de B-roll, títulos apilados |
| Rostro | — | **nunca** cubierto |
| Zona de acción | donde ocurra el gesto/objeto | **nunca** cubierta mientras ocurre |
| Subtítulos | centrados, altura del pecho (~y 1150–1300) | 1–2 palabras |
| Franjas seguras inferior y derecha | y 1500–1920 · x 960–1080 | nada (caption y botones de IG) |

## Tipografía
- **Subtítulos:** Montserrat 800, ~64 px, blanco, **sin contorno ni caja**, sombra suave (0 2 10 rgba(0,0,0,.45)). 1–2 palabras, corte seco sincronizado a la palabra. Ocre `#E8955A` solo en la palabra clave (no en cada frase).
- **Títulos apilados:** Montserrat 900 MAYÚSCULAS (~120 px) para la palabra que pesa + Montserrat 300 minúsculas (~56 px) para los conectores. Una sola palabra en ocre. Entrada línea a línea o palabra a palabra: +14 px hacia arriba y aparición en 180–220 ms, `ease-out`, **sin rebote**. Mientras hay título, no hay subtítulo.
- **Serif editorial:** Instrument Serif (regular/itálica) para pensamientos ("tengo que bajarle la fiebre ya") y para los efectos de héroe de `efectos.md`.

## Animaciones (el trazo a mano simple está descartado)
- Calidad de motion design profesional: efectos de héroe de `efectos.md`, animaciones Lottie de diseñadores, ilustración 3D suave y cálida, o motion graphics propios en Remotion con curvas de easing cuidadas (spring sin rebote exagerado).
- Paleta: crema `#FFFAF2`, blanco, acento ocre `#E8955A`; sombras suaves para separarlas del fondo.
- Aparecen **en la palabra que las nombra**; salen con fade de 250 ms al cambiar de idea.
- Reutiliza el mismo elemento cuando el concepto vuelve (p. ej. el termómetro) para dar continuidad.
- Datos → objetos: una lista es un checklist glass, una tendencia es un chart grow (sin cifras si no se dijeron), un mito es un headline wall.
- Cada estilo nuevo se valida en la prueba de 10 s antes de usarse en el video completo.
- **Prohibido [fijo]:** stickers, emojis, brillantina, íconos de plantilla, flechas genéricas, dibujos a mano simples, imágenes de IA de bebés o personas.

## B-roll
- Solo cuando una situación real cuenta más que un dibujo (p. ej. "le tocas la frente"). Pocas tomas (2–4 por minuto como máximo).
- Dentro de una **ventana** en la zona de contenido (esquinas redondeadas ~28 px, borde fino crema), salvo que el plan justifique pantalla completa.
- Luz cálida, look coherente con el color de Tania, sin dramatismo excesivo con bebés.

## Sistema de puntuación (cada efecto, una función)
| Recurso | Significa | Uso típico |
|---|---|---|
| ★ Acercamiento seco | "esto importa" | 2–4 por video |
| Blanco y negro | momento íntimo / Tania como mamá | 1 por video |
| Silencio musical 0,5 s | remate | antes de cada frase clave |
| Destello cálido (light leak) | cambio de bloque | 1–3 por video |
| ✓ / ✗ ocre a mano | correcto / incorrecto | soluciones vs. errores |

## Cierre
Plano limpio, CTA con un ícono animado limpio (p. ej. guardar). Sin outro de marca salvo que el usuario lo pida. Cortar seco en la última palabra para que el loop sea natural.

## Lista de control antes de entregar
- [ ] Voz a velocidad natural; sin silencios largos ni tomas repetidas.
- [ ] Color corregido; piel natural; grano y viñeta sutiles.
- [ ] Nada sobre el rostro, la acción ni las franjas seguras.
- [ ] Cada dibujo/texto aparece en su palabra (verificado con tiempos de Whisper).
- [ ] Ningún número médico inventado.
- [ ] Puntuación respetada (1 B/N, silencios antes de frases clave, destellos solo en cambios de bloque).
- [ ] Subtítulos 1–2 palabras, sin contorno; ocre solo en palabras clave.
- [ ] Audio: −14 LUFS, pico ≤ −1 dBTP; la música nunca compite con la voz.
- [ ] Revisado en celular completo, con y sin audífonos.
