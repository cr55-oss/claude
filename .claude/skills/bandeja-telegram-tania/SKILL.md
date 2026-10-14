---
name: bandeja-telegram-tania
description: Procesa la bandeja de Telegram de la Dra. Tania — guarda en la biblioteca (`biblioteca/INDICE.md`) cada reel que Tania o el equipo mandan al grupo, sin gastar créditos, y cuando alguien marca un reel con "adaptar" / "me gusta" / "este sí" / ✅ / 👍 (respondiendo al mensaje del link o junto al link), hace el desglose con `desglose-reel-tania` y el guion con `guion-viral-pediatria`, y lo manda de vuelta al grupo. Úsalo cuando corra la rutina diaria de Telegram, cuando el usuario diga "revisa Telegram", "procesa la bandeja", "qué mandamos al grupo", "qué hay pendiente en la biblioteca", o invoque /bandeja-telegram-tania.
---

# Bandeja de Telegram → biblioteca → guion

## La regla de fondo

Lo que Tania y el equipo mandan al grupo **ya está filtrado por ellos**: lo eligieron porque lo
quieren adaptar. Aquí no se vuelve a filtrar ni se descarta nada. El trabajo es:

1. **Guardar todo** en la biblioteca, gratis (sin vidIQ).
2. **Analizar y adaptar solo cuando lo piden** con "adaptar" o equivalente.

Los criterios de outlier (vistas, seguidores, outlier score) aplican solo al radar de vidIQ,
no a lo que mandan ellos.

## Requisitos

- `TELEGRAM_BOT_TOKEN` en la configuración del entorno. `TELEGRAM_CHAT_ID` (el id del grupo) es
  muy recomendable: sin él, el bot acepta links de cualquier chat donde lo agreguen.
- `api.telegram.org` permitido en la red del entorno.
- Si falta algo, `scripts/telegram.mjs` imprime una línea con el arreglo y sale con código 2:
  repite esa línea al usuario y detente. No inventes links.

## Proceso (cada corrida)

### 1. Leer
```bash
node scripts/telegram.mjs pull > /tmp/bandeja.json
```
Devuelve `links` (todos los reels mandados), `adaptar` (los marcados para adaptar) y
`ultimo_update_id`. Si no hay nada, termina sin mandar mensajes al grupo.

### 2. Guardar en la biblioteca (0 créditos)
Por cada link que no esté ya en `biblioteca/INDICE.md` (busca el id), agrega una fila con estado
**📥 Guardado**: fecha, id con link, quién lo mandó, la nota que escribieron junto al link y
`Telegram` como origen. Si el id ya existe, no dupliques la fila.

Links cortos de TikTok (`tt-corto-…`): guárdalos igual, pero en la nota pon "link corto: pedir
el link completo para poder analizarlo" (vidIQ no los acepta).

### 3. Adaptar lo marcado
Por cada reel en `adaptar` que no esté ya en ✍️ Guion o 🎬 Grabado (si no estaba en el índice,
agrégalo primero):
1. Revisa el saldo con `vidiq_balance`. Si no alcanza para ~20 créditos por reel, analiza los
   que se pueda (el más antiguo primero), deja el resto en 📥 con la nota "pendiente por
   créditos" y dilo en el mensaje al grupo.
2. Haz el desglose con el skill `desglose-reel-tania` (guarda `biblioteca/reels/<id>.md`).
   Estado → **🔍 Analizado**.
3. Escribe el guion con el skill `guion-viral-pediatria`:
   - La marca "adaptar" **cuenta como la confirmación del punto de control** del paso 2 de ese
     skill: ellos ya eligieron la base. No preguntes.
   - **Objetivo:** el del plan vigente (`estrategia-contenido-tania/references/plan-actual-tania.md`).
     Si la nota dice "venta", usa venta.
   - **Estructura:** la recomendada en el desglose.
   - Si el skill necesita algo que solo Tania puede dar (una anécdota real, un dato de su
     consulta), escribe el guion con el hueco marcado `[TANIA: …]` en vez de inventarlo.
   - Guarda el guion en `biblioteca/guiones/<id>.md`. Estado → **✍️ Guion listo**.
4. Arma el mensaje para el grupo (ver abajo).

### 4. Subir y confirmar (en este orden)
1. `git add biblioteca && git commit -m "Bandeja: N guardados, M adaptados" && git push`
2. Solo si el push salió bien: `node scripts/telegram.mjs ack <ultimo_update_id>`. Si confirmas
   antes y el push falla, esos links se pierden; Telegram los guarda 24 h sin confirmar.
3. Manda el mensaje: `node scripts/telegram.mjs send --text-file /tmp/mensaje.txt`.

## Mensajes al grupo

Texto plano, corto y en el tono del equipo (es para Tania y el equipo, no para su audiencia).
Solo manda mensaje si pasó algo.

**Solo se guardaron links:**
```
📚 Guardé 3 reels en la biblioteca (ya van 27 sin adaptar).
Para adaptar uno, respondan a su mensaje con "adaptar".
```

**Hubo adaptaciones:** un mensaje por guion con el título, la estructura y el pilar, el guion
completo y los huecos `[TANIA: …]` que faltan llenar. Al final: "Cuando lo graben, escriban
'grabado' respondiendo a este mensaje."

**Respuestas "grabado":** si un mensaje responde a un guion con "grabado" o 🎬, el estado pasa a
**🎬 Grabado** (busca el id en el texto del guion citado).

## Pila sin adaptar

Si hay más de 20 reels en 📥 Guardado, en el mensaje del lunes agrega una sugerencia de 3, sin
gastar créditos: los que mejor encajan con filas pendientes del plan vigente, usando solo la
nota y el tema que escribieron al mandarlos. Es solo una sugerencia; ellos deciden con
"adaptar".

## Radar de vidIQ (aquí sí hay criterios)

Lo que trae el radar no lo eligió nadie del equipo, así que solo entra a la biblioteca lo que
pasa el filtro. Corre en la rutina de lunes y jueves.

**Búsquedas:** 4 por corrida (5 créditos cada una, ~40 créditos por semana), con
`vidiq_instagram_tiktok_outlier_search`. Toma las palabras clave de las filas ⬜ Pendiente del
plan vigente; rota los temas entre corridas y alterna `embeddingType` entre `concept` y `hook`.

**Parámetros:**
- `audienceQuery`: `Culture/Region: Latin America, Spanish-speaking; Global: true; Demographics: mothers and fathers 22-40 with babies and toddlers, first-time parents;`
- `descriptionLanguage`: `["es", "en"]` (el inglés trae mejores estructuras; se adapta después)
- `datePostedAfter`: hace 30 días
- `viewsMin`: 500000 · `followersMax`: 100000 · `durationMin`: 30 · `outlierScoreMin`: 3
- `excludeContentIds`: todos los shortcodes/ids que ya estén en `biblioteca/INDICE.md`
- `resultsPerPlatform`: 5

**Descarta además:** B-roll con texto que manda al caption, contenido sin experto ni evidencia
(solo emocional), y reels con alcance sospechoso (más de 20K vistas y menos de 1,5 likes por
cada 1.000 vistas).

**Lo que pasa:** fila nueva en el índice con estado 📥 Guardado, origen `Radar vidIQ`, y los
datos que ya trae la búsqueda (creador, outlier, vistas). En la nota: tema + estructura
recomendada en una frase. **No** hagas `vidiq_watch_shortform_content` en el radar: el análisis
completo se hace solo si alguien pide adaptar.

**Mensaje al grupo:** los 3 a 5 mejores, un renglón cada uno (link, outlier, tema, estructura
recomendada), y al final: "Respondan 'adaptar' al que les guste." Si nada pasó el filtro, dilo
en una línea.
