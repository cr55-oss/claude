---
name: ganchos-carrusel-tania
description: Genera opciones de gancho para la PORTADA (slide 1) de un carrusel de Instagram de la Dra. Tania Sifuentes, usando el banco de ganchos validado de `guion-viral-pediatria` adaptado a texto estático. No arma el resto del carrusel — solo el texto que detiene el scroll en la primera slide; el usuario construye el resto (copy interior, diseño) en sus propios proyectos. Úsalo cuando el usuario pegue un tema + palabras clave de carrusel y pida "dame ganchos para este carrusel", "ayúdame con la portada", "gancho para el carrusel de [tema]", o invoque /ganchos-carrusel-tania. No lo uses para reels/video (eso es `guion-viral-pediatria`, que sí entrega estructura y guion completo) ni para decidir el tema del carrusel (eso es `estrategia-contenido-tania`).
---

# Ganchos de portada de carrusel — Dra. Tania

## Propósito y frontera con los otros dos skills

- `estrategia-contenido-tania` decide **de qué tema** es el carrusel y con qué palabras clave —
  entrega eso y nada más.
- Este skill toma ese tema + palabras clave y genera **solo el gancho de la portada** (slide 1,
  el texto que detiene el scroll).
- `guion-viral-pediatria` es para **reels/video**: entrega estructura completa (gancho + tensión +
  payoff + CTA) con voz y ritmo hablado. No se invoca para carruseles.

**Este skill NO genera el resto de las slides, ni el copy interior, ni el diseño.** Eso lo arma
Tania en sus propios proyectos — mantiene la regla ya acordada de que el carrusel completo es
suyo, esto solo resuelve el punto donde más se pierde retención: la portada.

## Paso 1 — detectar el dolor del papá/mamá primero

Antes de tocar el banco de ganchos, identifica el dolor o duda específica detrás del tema (no una
versión genérica de "los papás se preocupan por X"). Si el usuario ya pegó notas/investigación
junto con el tema, úsalas; si no, pregúntale o infiere del tema+palabras clave del plan.

## Paso 2 — calibra el nivel de conciencia según el día

- **Carrusel de viernes** (reflexión/Alcance, N1-2): gancho de verdad universal o emocional de
  maternidad/crianza, sin especificidad clínica todavía — no necesita venir de un dato médico.
- **Carrusel entre semana** (Autoridad/Seguridad, N2-3): gancho más específico — mito, dato,
  contraintuitivo.

Ver `../estrategia-contenido-tania/SKILL.md` (sección de carruseles) si hace falta repasar la
lógica completa de este patrón.

## Paso 3 — recorre el banco de ganchos, pero filtra por lo que funciona en texto estático

El banco completo vive en
`../guion-viral-pediatria/references/banco-ganchos-validados.md`. Recórrelo, pero una portada de
carrusel es **texto estático** (sin voz, sin prop en movimiento) — algunas mecánicas no aplican
bien ahí:

- **Descartar o adaptar con cuidado:** toda la categoría "Props visuales y físicos" (Sorpresa,
  Señalar, Objeto mágico, Transformación, Visual) — dependen de movimiento/cámara. "Después de
  esto" (#39) y mecánicas que dependen de énfasis vocal pierden fuerza sin audio.
- **Las que sí funcionan muy bien en portada** (frase corta, alto contraste visual): Bache/bucle
  abierto (#3), Una sola cosa (#29), Contra la corriente (#14), Afirmación tajante (#18), Negativo
  (#4, revisar checkpoint), Prohibido (#28, revisar checkpoint), Regla de tres/dos (#10/#13, si la
  portada anuncia una lista de slides), Externalización de culpa (la mecánica más valiosa del
  banco para este nicho), Conexiones discordantes (#5), Pregunta inducida (#9), Sabías que (#20).

## Paso 4 — formato de portada: más corto que un gancho hablado

Una portada se lee en menos de un segundo de scroll — es más corta que un gancho de reel.
- Máximo ~12-14 palabras, o una frase partida en título + subtítulo (2 líneas cortas).
- No debe depender del tono de voz para funcionar — no hay audio, todo el peso está en la palabra
  y el contraste visual del texto.

## Paso 5 — checklist Sabio + Cuidador

Antes de entregar, verifica que cada opción suene a la vez con autoridad clínica (Sabio) y calidez
sin generar pánico (Cuidador) — ver
`../guion-viral-pediatria/references/tono-marca-dra-tania.md`.

## Paso 6 — checkpoint de tono cuando el gancho roza miedo/urgencia

Misma regla que en `guion-viral-pediatria`: si la mecánica elegida (Negativo, Prohibido, Ofensivo)
produce un gancho con filo de miedo o urgencia, presenta **Versión A** (más cercana al viral) y
**Versión B** (suavizada) — nunca decidas solo cuál usar.

## Entregable

3-5 opciones de gancho de portada para el tema dado. Cada una con:
- El texto exacto del gancho (título + subtítulo si aplica).
- La mecánica del banco que usa.
- Una frase de por qué encaja con el dolor detectado en el Paso 1.

Nada más — ni estructura de slides, ni copy interior, ni diseño.

## Referencias

- `../guion-viral-pediatria/references/banco-ganchos-validados.md` — banco completo de 48
  mecánicas de gancho.
- `../guion-viral-pediatria/references/tono-marca-dra-tania.md` — arquetipo Sabio+Cuidador y
  reglas de tono.
- `../estrategia-contenido-tania/references/plan-actual-tania.md` — de aquí salen los temas +
  palabras clave de carrusel ya acordados con el usuario.
