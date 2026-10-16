# Catálogo de efectos premium

Efectos "de héroe" para momentos concretos del video. Inspirados en el catálogo público "17 efectos con Claude" (prompteafácil · Luciano Mattica), adaptados a la marca de Tania. Solo se usan los 7 que esa página publica abiertos; los otros 10 son de pago en su comunidad y aquí solo se mencionan por nombre como ideas.

## Reglas de uso
- **Máximo 2–3 efectos de héroe por video.** Van en el gancho, en la frase clave o en la lista de solución, no en todo el video. El resto se sostiene con acercamientos, subtítulos y títulos.
- Cada efecto tiene que **decir algo del guion**, no decorar. Si cambiar la frase no cambia el efecto, no va.
- Acento de color: ocre `#E8955A`. Tipografías: sans gruesa para subtítulos (Montserrat 800/900), serif elegante para los efectos editoriales (Instrument Serif o Didot), mono pequeña para rótulos.
- **Nunca tapar la cara de Tania ni una acción mientras ocurre.**
- Proponer los efectos en el plan (escena + por qué) y validarlos en la **prueba de estilo de 10 s** antes del render completo.

## Requisito técnico: recorte de Tania (para efectos "detrás de ella")
Varios efectos ponen elementos **detrás** de Tania. Para eso hace falta una máscara de su figura por cuadro:
- `npx hyperframes remove-background` (HyperFrames, de HeyGen; skills: `npx skills add heygen-com/hyperframes`), o
- un modelo de segmentación local (por ejemplo rembg / Robust Video Matting), o
- Magnific `video_remove_background` (gasta créditos; solo con aprobación).
Componer en Remotion en tres capas: fondo → elemento → Tania recortada → subtítulos. Revisar bordes (pelo, manos) en los cuadros de revisión.

## Efectos disponibles

### 1. Digital zoom (acercamiento seco por palabra)
- **Qué es:** acercamientos con corte seco a 1,3x en el inicio exacto de una palabra clave; si la frase sigue, segundo salto a 1,6x en la siguiente palabra fuerte; vuelve a 1,0x al terminar la frase.
- **Para Tania:** ya es nuestro ★. Usarlo en las 2–3 frases clave. Subtítulo: palabras ya dichas en una línea chica y la palabra actual en grande debajo.

### 2. Cover story (portada de revista) — recomendado para ganchos
- **Qué es:** una palabra gigante en serif blanca detrás de la cabeza de Tania (su cabeza tapa la parte de abajo de las letras, como en las revistas). Letras que entran de a una cada 0,05 s subiendo. Arriba a la izquierda, mono chico: "Nº de la serie · fecha". Abajo a la izquierda, serif itálica en dos líneas con el tema. Zoom muy lento de 1,05x a 1,0x.
- **Para Tania:** ideal para el **gancho** o para abrir una serie ("FIEBRE", "POSPARTO", "CÓLICOS"). Transmite autoridad editorial. Requiere recorte.

### 3. Glass type (letras de vidrio)
- **Qué es:** una palabra en sans muy gruesa detrás de Tania, de "vidrio": el fondo se ve corrido y desenfocado dentro de las letras, borde interior blanco suave, filo de luz arriba, sombra debajo; letras que entran de a una; un brillo diagonal las cruza en 0,5 s.
- **Para Tania:** para una **palabra clave** potente ("CALMA", "NORMAL", "DEFENSA"). Muy premium; usar una vez por video como máximo. Requiere recorte.

### 4. Checklist glass (lista que se tilda)
- **Qué es:** tarjeta translúcida (85 % del ancho, esquinas 30 px, desenfoque del fondo ~22 px con tinte oscuro, borde blanco sutil, sombra suave) en el tercio superior. Rótulo pequeño en mayúsculas con un punto de color. Ítems aún no dichos como barras grises; al decir cada uno aparece un círculo ocre con un check que rebota y el texto en blanco. Entra subiendo 30 px en 0,3 s.
- **Para Tania:** perfecto para las **soluciones** ("ropa ligera / hidratado / observar cómo se comporta"). Rótulo, por ejemplo: "LO QUE SÍ AYUDA".

### 5. Chart grow (curva que sube)
- **Qué es:** video oscurecido; una línea se dibuja de izquierda a derecha en 0,6 s, plana al principio y subiendo al final, con brillo del color de acento y punto blanco en la punta; al llegar arriba aparece una pastilla con rebote.
- **Para Tania:** tendencias **sin cifras inventadas** (ej. "su temperatura va a volver a subir"); etiquetas en palabras, nunca números que Tania no dijo. Pastilla, por ejemplo: "VUELVE A SUBIR ↗".

### 6. Headline wall (notas en la pared)
- **Qué es:** notas de papel crema (#F6F3EC) con titulares en serif, un pin y una inclinación distinta (−6° a 6°), que aparecen detrás de Tania de a una con un rebote pequeño. Color natural del video. Requiere recorte.
- **Para Tania:** para **mitos** o lo que "todos dicen" ("Báñalo con agua fría", "Ponle alcohol", "Abrígalo más"). Luego se pueden tachar en ocre cuando ella los desmiente.

### 7. Phone mockup (teléfono flotando)
- **Qué es:** un iPhone (~230 px de ancho, inclinado −10°) que entra deslizando desde el borde libre en 0,4 s, con una app que se va completando.
- **Para Tania:** solo si el guion habla de algo en el celular (recordatorios de dosis, una app, un mensaje). Uso raro.

## Ideas adicionales (solo por nombre; implementación propia si se necesitan)
Giro 3D (clips orbitando), couch wall (capturas en la pared), frame break (salir de un cuadro), corte con zoom (transición entrando en la cara con desenfoque), zoom out (alejarse y revelar algo), green screen (cambiar el fondo), paper cut (collage de papel), doodle boil (contorno a mano que tiembla — **descartado** para Tania: el trazo a mano simple fue rechazado), vértigo (el fondo se estira detrás). Si alguno encaja con un guion, proponerlo en el plan con una implementación propia en Remotion y validarlo con la prueba de 10 s.
