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

Entrega lo que devuelva el editor al usuario tal cual.

### 4. Correcciones

Para cada corrección del usuario, **retoma al mismo editor con `SendMessage`** (no lances uno
nuevo: perdería el contexto del carrusel). Si el editor marca una "corrección repetida", propón
al usuario agregarla como regla en el skill correspondiente.

## Otros flujos

- Reels/video → skill `guion-viral-pediatria`.
- Estrategia y temas del mes → skill `estrategia-contenido-tania`.
- Solo gancho de portada para un tema → skill `ganchos-carrusel-tania`.
