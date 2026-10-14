# Muletillas y fluidez

Objetivo: que Tania suene **segura y fluida**, como si lo hubiera dicho perfecto en una sola toma, **sin sonar acelerada ni recortada**. La velocidad de su voz nunca se toca; la fluidez sale de lo que se quita y de cómo se une.

## 1. Qué se quita
- **Muletillas sin significado:** "eh", "ehh", "mmm", "este…", "o sea", "bueno" (de arranque), "pues" (de relleno), "¿no?" (de muletilla), "como que", "digamos", "la verdad es que" (cuando no aporta), chasquidos de boca.
- **Arranques en falso:** "Cuando… cuando llega un virus" → queda "Cuando llega un virus".
- **Palabras repetidas por tropiezo:** "el el cuerpo" → "el cuerpo".
- **Respiraciones fuertes** entre frases (las suaves pueden quedarse si dan naturalidad).
- **Silencios:** dentro de una idea, pausas > 0,25 s se acortan; entre ideas, se dejan 0,2–0,35 s.

## 2. Qué NO se quita
- Palabras que llevan intención o calidez aunque parezcan relleno: **"créeme"**, "mira", "fíjate", "ojo", un "¿sabes?" que conecta.
- La **pausa antes de una frase clave** (puede ser 0,4–0,6 s: es el remate, coordinado con el silencio musical).
- Un "mmm" o risa espontánea que muestre a Tania humana y sume al momento (proponerlo en el plan).
- Si quitar una muletilla rompe la entonación (la frase queda cortada o con salto de tono), **se deja** o se busca otra toma.

## 3. Cómo detectarlas
- Whisper tiende a **limpiar** las muletillas de la transcripción. Para encontrarlas:
  - Transcribe también en modo literal (prompt inicial con muletillas de ejemplo: "eh, este, o sea, mmm…") y compara con la transcripción normal.
  - Busca **tramos con voz y sin palabras** (volumen de habla entre dos palabras con un hueco > 0,15 s en los tiempos de Whisper): suelen ser "eh"/"mmm".
  - Compara contra el **guion**: lo que se dijo y no está escrito es candidato a muletilla o a improvisación (decidir cuál es).
- Confirma cada candidata midiendo el tramo (duración corta, volumen de voz) antes de cortarla.

## 4. Cómo cortar para que no se note
- **Cortar entre sílabas nunca:** solo en límites de palabra, idealmente en un cruce por cero o en una consonante oclusiva (p, t, k).
- **Micro-fundido de audio** de 10–30 ms en cada corte (evita "clics").
- **Corte J/L:** cuando conviene, el audio de la siguiente frase entra 2–4 cuadros antes que la imagen (o al revés) para que el corte se sienta natural.
- **Saltos de imagen (jump cuts):** en una toma fija, cortar dentro del mismo plano produce un "salto". Se disimula:
  - alternando escala en el corte (100 % ↔ 104–108 %, el "zoom cut"), o
  - haciendo coincidir el corte con la entrada de un dibujo/título/B-roll que lleva la mirada a otro lado.
  - Evitar dos cortes muy seguidos con la misma escala.
- **Respiración del plano:** variar la escala en cortes, no en medio de una frase.
- Revisar que el **ritmo de la frase** se mantenga: si tras quitar muletillas queda atropellada, devolver 0,05–0,1 s de pausa.

## 5. En el plan y en la entrega
- En el plan: cantidad aproximada de muletillas a quitar y **las dudosas** (las que podrían ser intención) para que el usuario decida.
- En la entrega: duración antes/después de la limpieza y cualquier frase donde no fue posible limpiar sin romper la entonación.
- Verificación final: escuchar el video completo de corrido; si en algún punto "se nota el corte" o suena acelerado, corregir antes de entregar.
