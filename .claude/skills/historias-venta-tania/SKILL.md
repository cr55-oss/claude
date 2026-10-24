---
name: historias-venta-tania
description: Genera las historias de Instagram del día para la Dra. Tania Sifuentes, listas para subir — tanto días de "solo compartir" (día a día, tip rápido, humor de mamá, comunidad; sin venta) como días de venta — y alterna ambos con un ritmo semanal para no cansar a la audiencia. Las de venta están diseñadas para vender sus cursos (empezando por el curso de Alimentación Complementaria de Mommy and Me) avanzando a la mamá por los niveles de conciencia de Eugene Schwartz (N1 inconsciente → N5 lista para comprar), con humor de identificación rápida (la mamá se ve reflejada en segundos) sin perder la voz de pediatra. Entrega cada historia con formato, texto en pantalla, qué decir, sticker y los mensajes de seguimiento por DM según lo que responda cada mamá. Úsalo cuando Tania o el usuario pidan "hazme las historias de hoy", "historias para vender el curso", "secuencia de lanzamiento", "historias con humor", "historias de cierre", "una historia para responder esta objeción", mencionen niveles de conciencia en historias, o invoquen /historias-venta-tania. No lo uses para reels (eso es `guion-viral-pediatria`), portadas de carrusel (`ganchos-carrusel-tania`) ni para decidir el plan del mes (`estrategia-contenido-tania`).
---

# Historias de venta — Dra. Tania

## Para quién es este skill

La usuaria final es **Tania**: pide las historias, las graba o arma, y las sube. Por eso:

- Háblale de **tú**, directo, sin jerga de marketing. No le expliques a Schwartz: usa los
  niveles por dentro y muéstrale solo una etiqueta corta (N1…N5) por historia.
- Hazle **máximo 3 preguntas** antes de generar. Si algo no es crítico, asume lo razonable y
  dilo en una línea.
- Todo lo que entregas tiene que poder **subirse hoy** sin reescribir: textos cortos, sticker
  definido y qué grabar.

## Dos tipos de día

Las historias de Tania no son todas de venta. Hay **días de compartir** y **días de venta**, y
los primeros son los que hacen que los segundos funcionen: una cuenta que vende todos los días
enseña a la audiencia a saltarse sus historias.

- **Día de compartir (sin venta):** día a día, tip rápido, humor de mamá, comunidad. No se
  menciona el curso. Igual tiene propósito: conexión, identificación (N1-N3) y stickers que dan
  información para los días de venta. Ver `references/secuencias-tipo.md`, sección F.
- **Día de venta:** secuencias B, C o D (apertura, objeción, cierre).

**Ritmo por defecto** (curso siempre abierto, fuera de lanzamiento): 5 días de compartir y 2 de
venta por semana, nunca dos días de venta seguidos. En lanzamiento se invierte (ver calendario
en `references/secuencias-tipo.md`). Si Tania no dice qué tipo de día es, pregúntale qué
compartió ayer y propón el que toque según el ritmo.

## Frontera con los otros skills

| Skill | Hace |
|---|---|
| `estrategia-contenido-tania` | Decide el mes, los temas y si toca vender o no |
| `guion-viral-pediatria` | Reels |
| `ganchos-carrusel-tania` | Portada de carrusel |
| **este** | **Secuencias de historias que venden** |

**Regla de momento:** si el plan vigente
(`../estrategia-contenido-tania/references/plan-actual-tania.md`) dice que el mes es de
posicionamiento sin venta, avísale a Tania antes de generar historias N4-N5. Las N1-N3 (calentar
sin mencionar el curso) sí se pueden hacer cualquier mes.

## Reglas duras (no negociables)

1. **Nunca inventes datos comerciales.** Precio, descuento, fecha de cierre, bonos, cupo,
   garantía, testimonios, número de alumnas: si no están en
   `references/producto-curso-ac.md` o Tania no te los dio en la conversación, escribe
   `[PENDIENTE: …]` en la historia y pregúntale. Un testimonio inventado o una urgencia falsa
   rompe la confianza que sostiene a una marca médica.
2. **Nunca humor en temas de seguridad.** Atragantamiento, alergias graves, señales de alarma,
   primeros auxilios: cero chistes, aunque toda la secuencia sea ligera.
3. **El humor se ríe de la situación, nunca de la mamá** ni de sus decisiones (purés vs.
   sólidos, fórmula vs. lactancia), ni de otras creadoras.
4. **Nada de promesas absolutas**: "tu bebé comerá de todo", "cero rechazo", "garantizado".
5. **Las afirmaciones médicas tienen que ser correctas y generales.** Las historias despiertan la
   duda y dan una idea útil; el detalle clínico vive en el curso. Si dudas de un dato, no lo
   pongas.
6. El tono base es `../guion-viral-pediatria/references/tono-marca-dra-tania.md` (Sabio +
   Cuidador). El humor de este skill es una **excepción acotada** a la regla de "humor muy
   ocasional", válida solo en historias, porque son efímeras y es donde la gente espera ver a la
   persona y no a la institución. Los límites están en `references/humor-identificacion.md`.

## Pipeline

### Paso 1 — 3 preguntas máximo

Pregunta solo lo que falte de esto:

1. **¿Qué toca hoy?** Día de compartir (sin venta) o día de venta. Si es de venta: abrir,
   responder una objeción o cerrar.
2. **¿Hay algo que quieras usar?** Una pregunta que te hicieron en consulta o por DM, una foto o
   video de tu día, una respuesta de la caja de preguntas. El material real siempre gana.
3. **Si toca vender:** confirma que los datos `[PENDIENTE]` del producto estén al día (precio,
   fechas, link o palabra clave).

Si Tania solo dice "hazme las historias de hoy", sugiere qué toca según el día del lanzamiento
(ver `references/secuencias-tipo.md`, calendario) y arranca.

### Paso 2 — elegir la secuencia tipo

En `references/secuencias-tipo.md`: Calentamiento (N1→N3), Apertura (N3→N5), Objeción (N4),
Cierre (N5), Respuesta a caja de preguntas, Día de compartir (F). Cada una trae su orden de niveles, su largo y dónde
va el humor.

### Paso 3 — elegir el ángulo desde el temario real

Saca el tema del día de los módulos del curso (`references/producto-curso-ac.md`, tabla
"Ángulos de historia"). Así cada historia siembra algo que el curso de verdad resuelve, y no una
promesa genérica.

### Paso 4 — escribir cada historia

Usa `references/niveles-conciencia-historias.md` para saber qué tiene que lograr cada nivel y
qué sticker le corresponde, y `references/humor-identificacion.md` para las historias marcadas
con humor.

Formato de historia:
- **Texto en pantalla:** máximo ~20 palabras, que se lea en 3 segundos. Si hay más, se parte en
  2 historias.
- **Video hablado:** máximo ~15 segundos por historia, como hablaría en consulta.
- **Proporción de humor:** más o menos 1 de cada 3 historias, concentrado en N1-N2. De N4 en
  adelante casi nada: ahí manda la autoridad.
- **Sticker en casi todas.** Cada respuesta abre un DM y le dice al algoritmo que la mamá quiere
  ver más de Tania. Una secuencia sin stickers es una secuencia muda.

### Paso 5 — revisar antes de entregar

Por cada historia, en silencio:
- [ ] ¿Una mamá se ve reflejada en menos de 3 segundos? (identificación)
- [ ] Si tiene humor: ¿se ríe de la situación y no de ella? ¿Tania lo diría en consulta?
- [ ] ¿Suena a pediatra (Sabio) y a alguien que entiende (Cuidador), no a influencer?
- [ ] ¿Algún dato comercial salió de la nada? → `[PENDIENTE]`
- [ ] ¿Hay humor en un tema de seguridad? → quítalo.

### Paso 6 — entregar

Usa exactamente este formato:

```
SECUENCIA: <tipo> · <tema> · <N inicial → N final> · <n> historias

H1 · N1 · 😄 humor        (o 🩺 autoridad / 💬 interacción / 🛒 venta)
Formato: video selfie | foto | texto sobre fondo | captura | boomerang
Qué se ve: <una línea>
Texto en pantalla: "<texto exacto>"
Qué dices (si es video): "<guion de ≤15 s>"
Sticker: <tipo> — "<pregunta y opciones exactas>"
Para qué está: <una línea>

H2 · …

SEGUIMIENTO POR DM (según lo que respondan)
- Si responde "<opción A>": "<mensaje exacto>"
- Si responde "<opción B>": "<mensaje exacto>"
- Si pregunta por el curso: "<mensaje N4-N5 con link o palabra clave>"

PENDIENTES: <lista de datos que Tania tiene que confirmar, o "ninguno">
```

Los mensajes de DM los manda **Tania o su equipo**, no un bot. Escríbelos cortos, en su voz y
personalizables.

## Referencias

- `references/niveles-conciencia-historias.md`: qué logra cada nivel en historias, con sticker y
  ejemplos.
- `references/humor-identificacion.md`: mecánicas de humor e identificación permitidas, límites
  y ejemplos.
- `references/secuencias-tipo.md`: plantillas de secuencia y calendario de lanzamiento.
- `references/producto-curso-ac.md`: temario real del curso, ángulos por módulo, objeciones y
  datos comerciales (con pendientes).
- `../guion-viral-pediatria/references/tono-marca-dra-tania.md`: voz de marca.
- `../guion-viral-pediatria/references/banco-ganchos-validados.md`: mecánicas de gancho; sirven
  para la H1 de cada secuencia (en especial Externalización de culpa, Contra la corriente y
  Pregunta inducida).
