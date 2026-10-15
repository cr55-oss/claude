# Sistema de contenido — Dra. Tania Sifuentes

Repositorio de skills y agentes para producir contenido de Instagram de la Dra. Tania Sifuentes
(pediatra y neonatóloga). Negocio: asesorías online de sueño y alimentación complementaria.

## Carruseles: el agente principal decide, el editor escribe

Cuando el usuario mande un carrusel de referencia (capturas, normalmente con link), el agente
principal **no escribe el carrusel**: lo clasifica, arma el brief y delega en el subagente
`editor-carruseles`.

### 1. Clasificar (para quién va)

- **Maternidad** — la columna vertebral es una vivencia, emoción o identidad de mamá.
- **Médico** — la columna vertebral es información clínica (síntomas, cuidados, prevención,
  desarrollo, sueño o alimentación como técnica).
- **Venta** — el objetivo es vender las asesorías (sueño / alimentación complementaria).
- Si es híbrido (miedo emocional + solución médica), va como **maternidad**.

Di la clasificación en una línea; si no es clara, pregunta.

### 2. Completar el brief

Necesitas: **tipo**, **objetivo** (alcance / comunidad / captura / venta — uno solo) y **etapa de
la mamá** (embarazo / recién nacido / 4-12 meses / toddler). Si el mensaje no los trae,
pregúntalos **todos en un solo mensaje** antes de delegar.

Formato que el usuario puede mandar para evitar la pregunta:

```
[capturas]
link: ...
objetivo: comunidad
etapa: 4-12 meses
por qué me gustó: ...   (opcional)
```

### 3. Delegar en `editor-carruseles`

El subagente **no ve las imágenes**. Pásale en el prompt:
- tipo, objetivo y etapa;
- la transcripción del texto de cada slide (numerada) y una descripción visual breve;
- el link y las notas del usuario.

### 4. Revisión del agente (`revisor-carruseles`)

Antes de mostrarle el carrusel al usuario, pásale al subagente `revisor-carruseles` el brief, la
transcripción del original y el carrusel del editor. Lanza un revisor **nuevo** cada vez: su
valor es mirar sin el sesgo de quien escribió.

Muéstrale al usuario **en un solo mensaje**:

```
📋 CARRUSEL (versión N)        ← lo del editor, tal cual
🔍 REVISIÓN DEL AGENTE         ← lo del revisor, tal cual
👉 ¿Aplico todo, solo algunos (ej. "1 y 3"), o tienes otros cambios?
```

### 5. El usuario decide → el editor corrige

- Con la respuesta del usuario (observaciones aceptadas + sus propios cambios), **retoma al mismo
  editor con `SendMessage`** — no lances uno nuevo: perdería el contexto del carrusel. Pásale
  también las observaciones rechazadas, para que no las aplique.
- Vuelve a lanzar el revisor solo si cambió el gancho, el cierre o la estructura (puede romperse
  el anillo). Para cambios menores, muestra la nueva versión con una línea de qué cambió.
- Si el editor marca una "corrección repetida", propón al usuario agregarla como regla en el
  skill correspondiente.
- Cuando el usuario apruebe, entrega la versión final limpia (solo slides + caption + diseño).

### 6. Registrar en el Sheet

Al aprobar la versión final, actualiza la fila de ese carrusel en el Sheet: Estado = "Adaptado"
y la versión final en la columna "Versión final Tania". Cuando el usuario pase las métricas de
Tania después de publicar, llena "Resultado Tania" y cambia Estado a "Publicado".

## Biblioteca: el Google Sheet "Biblioteca carruseles"

Es **la única lista** de carruseles (referencias y propios). Vive en el Drive del usuario:
https://docs.google.com/spreadsheets/d/1O1vIfHdAsNxPzPEc77jyucCwQaA0lj94HewRIbE_lqU/edit

Se lee y escribe con `scripts/sheet.py` (`check`, `read`, `append <fila.json>`,
`update <n> <fila.json>`), que usa la cuenta de servicio de la variable `GOOGLE_SA_JSON`. El
conector de Google Drive **no** sirve para esto: no puede agregar filas. Si falta la variable,
dilo y entrega la fila como texto para que el usuario la pegue; nunca digas que se guardó si no
se guardó. Los archivos JSON temporales de filas van en el scratchpad, no en el repo.

**Columnas (en orden):** Fecha · Link · Cuenta · Seguidores cuenta · Categoría · Likes ·
Comentarios · Reposts · Índice viral (likes/seguidores %) · Estado · Por qué me gustó · Texto
transcrito · Resultado Tania (seg/1k views) · Versión final Tania. Si la fila 1 aún no tiene
"Versión final Tania", agrégala con `update 1` la primera vez.

- **Categoría:** Sentimental (= maternidad) · Médico · Venta.
- **Estado:** Guardado → En proceso → Adaptado → Publicado.
- **Índice viral:** likes ÷ seguidores × 100, con 2 decimales. Si falta un dato, déjalo vacío.

### Al recibir un carrusel: primero preguntar

Cuando el usuario mande capturas + link, **antes de nada pregunta: "¿Lo adaptamos o solo lo
guardamos?"** (salvo que ya lo haya dicho en el mensaje). En los dos casos:

1. Clasifica la categoría (dila en una línea; si no es clara, pregunta).
2. Lee de las capturas: cuenta, seguidores, likes, comentarios y reposts (si una captura de
   métricas no viene, pídela una vez; si no la hay, deja vacío — nunca inventes números).
3. Transcribe el texto de cada slide (S1: … / S2: …) para la columna "Texto transcrito": así
   después se puede trabajar sin volver a mandar capturas.
4. Agrega la fila con Estado "Guardado" (si es "solo guardar", termina aquí y confirma con el
   número de fila) o "En proceso" (si es "adaptar", sigue con el flujo de carruseles).

### "Trabajemos en este"

Cuando el usuario pida trabajar uno guardado ("el de cabeza plana", "el de @cuenta", "el último
sentimental"), lee el Sheet, encuentra la fila (si hay varias candidatas, muéstralas y pregunta),
cámbiala a "En proceso" y arranca el flujo de carruseles usando el texto transcrito.

### Ejemplos para el editor

El editor no lee el Sheet. Al delegar, pásale además 1-3 carruseles **de la misma categoría**
del Sheet con mejor "Resultado Tania" (o mejor índice viral si no hay resultados), con su texto,
como estructuras validadas — recordándole que se roba la estructura, nunca las frases.

## Otros flujos

- Reels/video → skill `guion-viral-pediatria`.
- Estrategia y temas del mes → skill `estrategia-contenido-tania`.
- Solo gancho de portada para un tema → skill `ganchos-carrusel-tania`.
