---
name: adaptar-carrusel-tania
description: Adapta un carrusel de Instagram de referencia (de otra cuenta) al tono de marca de la Dra. Tania Sifuentes — primero analiza por qué funcionó (la portada/slide 1 y la estructura slide por slide), luego reescribe el texto completo del carrusel en la voz de Tania, itera con la retroalimentación del usuario hasta la versión final y sugiere en qué plantilla de Canva va. Entrega SOLO texto (el diseño lo arma el usuario en Canva). Úsalo cuando el usuario mande capturas de un carrusel (con o sin link de Instagram) y pida "adapta este carrusel", "analiza por qué funcionó", "pásalo al tono de Tania", o invoque /adaptar-carrusel-tania. No lo uses para reels/video (eso es `guion-viral-pediatria`), ni cuando solo se pide el gancho de portada para un tema sin carrusel de referencia (eso es `ganchos-carrusel-tania`), ni para decidir de qué tema hacer carruseles (eso es `estrategia-contenido-tania`).
---

# Adaptar carrusel de referencia → tono de la Dra. Tania

## Propósito y frontera con los otros skills

Este skill reproduce el proceso que el usuario ya usa a mano: **analizar por qué funcionó el
carrusel → adaptarlo con el tono de Tania → iterar hasta la versión final → elegir plantilla.**
El objetivo es que la primera adaptación salga bien sin tener que ir a otra IA a pedir una
segunda versión.

- `estrategia-contenido-tania` decide **de qué temas** hacer carruseles en el mes.
- `ganchos-carrusel-tania` genera solo ganchos de portada para un **tema** (sin referencia).
- **Este skill** parte de un **carrusel de referencia concreto** y entrega el texto completo,
  slide por slide.
- `guion-viral-pediatria` es solo para reels/video.

**Entrega solo texto.** El diseño se arma en las plantillas de Canva del usuario.

## Entrada esperada

```
[capturas de las slides]
link: https://www.instagram.com/p/...      ← para registro, no se puede leer el carrusel desde ahí
por qué me gustó: ...                       ← opcional
```

- El texto se lee **de las capturas**. El link no sirve para leer el contenido (vidIQ y los
  links de Instagram no exponen carruseles) — se guarda solo como referencia/origen.
- Si faltan slides (se nota un salto en la numeración o en el hilo), pregunta antes de adaptar.
- Si viene "por qué me gustó", eso manda: es lo que hay que conservar sí o sí.

## Paso 1 — Análisis: por qué funcionó (breve)

Antes de reescribir nada, entrega un análisis **corto** (no más de ~12 líneas). El análisis es
una hipótesis: no vemos las métricas del post, así que no afirmes que "fue viral" si no hay dato.

1. **Transcripción** — texto de cada slide, numerado, tal cual (sirve para que el usuario
   confirme que se leyó bien).
2. **Slide 1 (portada)** — qué mecánica de gancho usa, nombrada con el banco
   (`../guion-viral-pediatria/references/banco-ganchos-validados.md`), y por qué detiene el
   scroll (contraste, dolor concreto, promesa, curiosidad).
3. **Estructura** — qué tipo de carrusel es (lista/checklist, mito vs. evidencia, paso a paso,
   antes/después, reflexión/historia, pregunta→respuesta) y el arco slide por slide en una línea
   cada uno: qué trabajo hace esa slide (enganchar, validar, explicar, dar acción, cerrar).
4. **Mecanismos de retención** — qué hace que pases a la siguiente slide (bucle abierto,
   numeración, "la #3 es la más importante", cliffhanger visual).
5. **Cierre/CTA** — qué pide al final y si encaja con Tania.
6. **Pilar y día** — ¿es Autoridad/Seguridad (entre semana, N2-3) o reflexión de maternidad
   (viernes, Alcance N1-2)? Ver `../estrategia-contenido-tania/SKILL.md`, sección Carruseles.

## Paso 2 — Adaptación

Para no gastar una ida y vuelta, entrega la adaptación **en la misma respuesta** que el análisis
(salvo que el usuario pida solo el análisis).

### Qué se conserva y qué se cambia

- **Se conserva:** la mecánica de la portada, la estructura/arco, el número aproximado de slides
  y los mecanismos de retención — eso es lo que funcionó.
- **Se cambia:** todas las frases. Nunca copiar frases textuales del original (es contenido de
  otra cuenta, y además suena a otra persona). El contenido médico se reescribe desde lo que
  Tania recomendaría, no desde lo que dice la otra cuenta.
- **Si el original contradice la evidencia** o lo que Tania recomendaría, no lo adaptes en
  silencio: dilo en una línea y propone el ángulo correcto (a veces el mejor carrusel es el
  "mito vs. evidencia" del carrusel de referencia).

### Tono

Seguir `../guion-viral-pediatria/references/tono-marca-dra-tania.md`. Lo crítico en carrusel:
- Checklist Sabio + Cuidador: ¿la portada o la slide 2 valida lo que siente la mamá? ¿El
  contenido da una respuesta con autoridad real, no solo consuelo?
- Frases cortas, una idea por slide, nada de palabras prohibidas (truco, hack, secreto,
  milagroso, mamá perfecta…).
- Siempre responder ¿qué pasa? ¿por qué? ¿qué hago?
- Cierre con tranquilidad, nunca con miedo. CTA de la lista de CTAs naturales — Sabio ("guarda
  este carrusel") o Cuidador ("compártelo con otra mamá") según qué nota pesó más.

### Portada

Aplicar las reglas de portada de `../ganchos-carrusel-tania/SKILL.md` (pasos 3-6): máximo
~12-14 palabras o título + subtítulo, mecánicas que funcionan en texto estático, y si la
mecánica roza el miedo/urgencia, entregar **Versión A** (más cercana al original) y **Versión B**
(suavizada) — el usuario decide.

### Largo por slide

- Portada: ≤14 palabras.
- Slides interiores: idealmente ≤35 palabras; si una slide necesita más, partirla en dos.
- Si el original tiene slides muy cargadas de texto, no copiar esa densidad.

### Reglas que no se rompen

- **Nunca inventar experiencias personales de Tania** ("el otro día en consulta…", "cuando mi
  hija…"). Si la estructura pide una anécdota, deja un marcador:
  `[TANIA: anécdota personal sobre ___]`. Esto pesa sobre todo en carruseles de reflexión de
  viernes, donde lo que vende es su voz real.
- **Nunca inventar datos, cifras ni citas** de estudios. Si un dato hace falta, escríbelo como
  marcador `[VERIFICAR: dato sobre ___]` o usa una afirmación general que Tania pueda sostener.
- Cualquier recomendación médica concreta (dosis, edades, temperaturas, cuándo ir a urgencias)
  se lista al final en "Puntos para que Tania verifique".

## Paso 3 — Iteración con el usuario

El usuario va a retroalimentar ("la slide 3 suena fría", "cambia el gancho", "más corto").

- Aplica **solo** el cambio pedido; no reescribas slides que no se mencionaron.
- Devuelve el carrusel completo actualizado para que siempre haya una versión copiable.
- Si el mismo tipo de corrección aparece 2+ veces (en este carrusel o en anteriores de la
  conversación), señálalo al final en una línea: *"Esto ya lo corregiste antes — ¿lo agrego
  como regla al skill?"* Así el skill aprende el criterio del usuario en lugar de repetir el
  error.

## Paso 4 — Plantilla

Cuando el usuario apruebe la versión final, sugiere en qué plantilla de Canva va según el tipo
de carrusel y el número de slides — pero el usuario decide. *(Pendiente: lista de plantillas con
nombre, número de slides y para qué tipo de carrusel sirve cada una. Mientras no exista, pregunta
en qué plantilla va.)*

## Formato del entregable

```
## Análisis (por qué funcionó)
- Transcripción: S1 "..." / S2 "..." / ...
- Portada: mecánica #__ (nombre) — por qué detiene el scroll
- Estructura: tipo + arco en una línea por slide
- Retención: ...
- Pilar/día: ...

## Carrusel adaptado
S1 (portada): ...
   [Versión B si aplica]
S2: ...
...
S_n (cierre + CTA): ...

## Puntos para que Tania verifique
- ...

## Plantilla sugerida
- ... (o pregunta)
```

## Referencias

- `../guion-viral-pediatria/references/tono-marca-dra-tania.md` — tono, arquetipo, palabras
  permitidas/prohibidas, CTAs.
- `../guion-viral-pediatria/references/banco-ganchos-validados.md` — mecánicas de gancho.
- `../ganchos-carrusel-tania/SKILL.md` — reglas de portada en texto estático.
- `../estrategia-contenido-tania/SKILL.md` — patrón viernes reflexión / entre semana autoridad.
