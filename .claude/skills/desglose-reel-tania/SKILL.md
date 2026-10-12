---
name: desglose-reel-tania
description: Desglosa uno o varios reels/TikToks (links pegados desde Telegram, Instagram o compartidos desde el celular) en un análisis completo — métricas reales y outlier score vs. la mediana del creador, transcripción, gancho y por qué funciona, formato, ángulo, línea de tiempo visual escena por escena y "scroll stoppers" — clasificado con el marco de la Dra. Tania (pilar Seguridad/Autoridad/Alcance, nivel de conciencia, estructura recomendada Rodrigo/Charlie/Ana/Autoridad/Alcance), y lo guarda en la biblioteca del repo (`biblioteca/`) para encontrar patrones con el tiempo. Úsalo cuando el usuario pegue uno o más links de reels y diga "desglosa", "analiza este reel", "por qué funcionó", "guárdalo en la biblioteca", cuando invoque /desglose-reel-tania, o cuando pida "qué patrones ves en la biblioteca". NO escribe el guion de Tania: eso es `guion-viral-pediatria`, al que se le pasa el desglose ya hecho.
---

# Desglose de reels → biblioteca

Adaptado del kit `manthanpatelll/instagram-research-tool` al flujo de la Dra. Tania: sin
scripts, sin descargar videos, sin iPhone. Las fuentes son vidIQ (principal) y Supadata
(respaldo); el análisis lo haces tú; el resultado queda versionado en git.

## Frontera con los otros skills

| Skill | Responde |
|---|---|
| `estrategia-contenido-tania` | Qué publicar y cuándo (pilares, calendario) |
| **`desglose-reel-tania`** (este) | **Por qué funcionó este reel y qué se puede aprender de él** |
| `guion-viral-pediatria` | Cómo se escribe el guion de Tania a partir de un candidato |

Este skill termina en el desglose guardado. Nunca escribas la "versión de Tania" aquí: si el
usuario la quiere, pasa el desglose a `guion-viral-pediatria`, que tiene su propio punto de
control (el usuario confirma la base antes de reestructurar).

## Cómo llegan los links (inbox)

Tania usa iPhone y el equipo usa Android; los dos usan Telegram. El inbox es **un grupo o canal
de Telegram** (por ejemplo "Reels para analizar") donde cualquiera suelta links mientras
scrollea. Cuando se sientan a trabajar, copian todos los links y los pegan juntos en un solo
mensaje. También vale compartir un link directo a la app de Claude.

Al recibir el mensaje:
1. Extrae todas las URLs de Instagram (`/reel/`, `/p/`), TikTok (`/@user/video/<id>`) y YouTube
   Shorts. Ignora texto alrededor y duplicados.
2. Id de cada reel: `ig-<shortcode en minúsculas>`, `tt-<id del video>`, `yt-<id en minúsculas>`.
3. Si `biblioteca/reels/<id>.md` ya existe, **no lo vuelvas a analizar** (cuesta créditos):
   avisa "ya estaba en la biblioteca" y muestra su resumen.
4. Links cortos de TikTok (`vm.tiktok.com`, `tiktok.com/t/`) no los acepta vidIQ: pide el link
   completo.

## Costo (dilo antes de gastar)

| Paso | Herramienta | Créditos vidIQ |
|---|---|---|
| Ver el reel escena por escena | `vidiq_watch_shortform_content` | 10 |
| Seguidores del creador | `vidiq_ig_profile` | 5 |
| Mediana del creador (últimos ~12 reels) | `vidiq_ig_profile_reels` | 5 |

**~20 créditos por reel de un creador nuevo, ~10 si el creador ya está en `biblioteca/INDICE.md`
con datos de menos de 30 días** (reutiliza seguidores y mediana de ahí). El usuario se queda sin
créditos con facilidad, así que:
- Consulta `vidiq_balance` (gratis) antes de un lote de más de 3 reels y di en una línea:
  "Son N reels, ~X créditos; te quedan Y."
- Si el saldo no alcanza, ofrece el **modo ligero**: solo `vidiq_watch_shortform_content`, sin
  outlier score (queda `null`).
- Si vidIQ falla o no tiene créditos, usa Supadata (`supadata_metadata` para números,
  `supadata_transcript` para el texto) y marca el desglose como `visual: no` — sin el video no
  hay línea de tiempo visual, y no la inventes. Si Supadata tampoco está conectado, dilo en una
  línea y pide al usuario que lo autorice en la configuración de conectores de claude.ai.

## Proceso por reel

Lanza los `vidiq_watch_shortform_content` de todo el lote en paralelo (es asíncrono: devuelve un
`mcpJobId`; consulta `vidiq_job_poll` o `vidiq_jobs_list` hasta que esté `completed`). Mientras
tanto, pide perfil y reels de los creadores nuevos.

En el `prompt` de `vidiq_watch_shortform_content` pide, en markdown: transcripción con
marcas de tiempo, texto en pantalla, cada cambio de plano con su segundo, qué se ve, tono y
ritmo de voz, y el segundo exacto en que se revela el dato/payoff.

### 1. Números (nunca inventes)
- Vistas, likes, comentarios, compartidos, duración, fecha de publicación.
- Seguidores del creador.
- **Outlier score** = vistas del reel ÷ mediana de vistas de los últimos reels del creador
  (excluye el propio reel y los fijados). Redondea a 1 decimal.
- Engagement = (likes + comentarios) ÷ vistas.
- **Sospechoso** si tiene más de 20K vistas y menos de 1,5 likes por cada 1.000 vistas: probable
  alcance comprado o inflado. Márcalo y no lo uses como referencia de formato.
- Un dato que no conseguiste queda `null` y lo dices.

### 2. Filtro de Tania (el triple filtro de `guion-viral-pediatria`)
Indica si pasa o no, sin descartar el desglose:
- ≥ 500.000 vistas en el video
- < 100.000 seguidores en la cuenta (si no, "alcance de cuenta grande, no outlier real")
- ≥ 30 s y con el consejo dentro del clip (no B-roll con texto que manda al caption)

### 3. Análisis
- **Gancho:** la frase exacta de 0-3 s, número de palabras, segundos que tarda, tipo (miedo
  específico, mito, comparación social, pregunta, contraintuitivo, lista…), por qué funciona,
  palabras de poder, y una **plantilla reutilizable** con huecos (`"Si tu bebé ___, no ___"`).
  Di si el gancho arranca del **dolor del papá/mamá** o del **dato clínico** (regla de
  `guion-viral-pediatria`: el bueno es el dolor).
- **Formato:** estilo (a cámara, Q&A, voz en off, pantalla dividida, demo…), ritmo en cortes
  por segundo, y por qué ese formato encaja con la idea.
- **Ángulo:** tema, la postura concreta, qué cree la mayoría, qué dice el reel en cambio.
- **Payoff:** en qué segundo y % del video se revela. Temprano (3-8 s) es el problema típico que
  la Estructura Rodrigo corrige.
- **Línea de tiempo visual:** tabla por plano — segundo, qué se ve, texto en pantalla, qué hace
  ese plano por la retención.
- **Scroll stoppers:** los 2-5 momentos con más probabilidad de frenar el pulgar, con segundo.
- **Clasificación Tania:** pilar (Seguridad / Autoridad / Alcance), nivel de conciencia (N1-N5,
  ver `estrategia-contenido-tania`), estructura recomendada (Rodrigo / Charlie / Ana / Autoridad
  / Alcance) con una frase de por qué, y si encaja con algún tema del plan vigente
  (`estrategia-contenido-tania/references/plan-actual-tania.md`, di el número de fila).
- **Lección en una línea:** qué se lleva Tania de este reel, aunque no se adapte.

No copies líneas, chistes ni historias del creador como "idea para Tania". Se estudia el
mecanismo; las palabras de Tania se escriben en `guion-viral-pediatria`.

## Guardar en la biblioteca

1. Escribe `biblioteca/reels/<id>.md` con la plantilla de `references/plantilla-desglose.md`.
2. Agrega una fila a `biblioteca/INDICE.md` (la más reciente arriba).
3. **Haz commit y push.** Esta sesión corre en un contenedor temporal: lo que no se sube a git
   se pierde. Mensaje: `Biblioteca: desglose de <id> (@creador)` o, para lotes,
   `Biblioteca: N desgloses`.

## Respuesta en el chat

Por reel, un bloque corto: números + outlier, ¿pasa el filtro?, gancho + plantilla, pilar /
nivel / estructura, lección en una línea. El detalle completo queda en el archivo. Al final:
"¿Quieres que pase alguno a `guion-viral-pediatria`?"

## Modo patrones

Cuando el usuario pida patrones ("qué ves en la biblioteca", "qué ganchos se repiten"), lee
`biblioteca/INDICE.md` y los desgloses, y responde con datos de la propia biblioteca: tipos de
gancho más frecuentes entre los outliers ≥ 3x, formatos que dominan por pilar, segundo típico
del payoff, temas del plan vigente que ya tienen referencia y cuáles no. Con menos de 10
desgloses, dilo: es muestra chica y los patrones son tentativos.
