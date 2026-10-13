---
name: modelo-clinico
description: "Edita cualquier video de una persona hablando a la cámara en el estilo Clínico: un consultorio limpio (blanco, azul clínico, rojo solo en el error) en que la persona se convierte en una lupa, un círculo con aro azul que viaja por la pantalla, y el habla se convierte en un examen que se dibuja al momento: mostrador que gira en torno a ella, tabla de atlas con rótulos (cerebro, cuerpo, columna, dientes), hallazgos con ✓ y ✗, conducta numerada, trazo en papel milimetrado. Sirve para cualquier tema (el ejemplo es de dentista, pero funciona con cripto, finanzas, deporte, ventas, carrera, relaciones, clases): la IA traduce el habla a los bloques del estilo. Usa siempre que el usuario pida editar \"con el modelo Clínico\", \"estilo lupa\", \"estilo consultorio\" o \"con dibujo de atlas\", y cuando quiera una edición lista para Reels, TikTok o Shorts en este visual. Entrega un MP4 vertical 1080×1920."
---

# Modelo Clínico

El video se convierte en un examen hecho en vivo. La persona abre en pantalla completa, con la frase escribiéndose en la base del cuadro, que se disuelve en blanco; cuando comienza a explicar, el cuadro se cierra en un círculo en torno al rostro y se convierte en una **lupa** con aro azul que viaja por la pantalla. Alrededor de ella, lo que se dice aparece como en un consultorio: un mostrador que mide, un dibujo de atlas con rótulos, una lista de hallazgos, una conducta numerada. Los scripts hacen la parte mecánica (medir, transcribir, cortar, enmarcar, verificar, renderizar); tú haces la parte de editor (elegir las tomas, traducir el habla en bloques, verificar los cuadros).

**Este modelo es un estilo, no un tema.** El ejemplo se hizo con salud bucal, pero el video del usuario puede ser sobre cualquier cosa. Sigue `references/adaptar.md` para traducir el habla en bloques de este estilo. Una edición solo con subtítulos, apertura y cierre es un error: el `render.mjs` la rechaza.

## El estilo (lo que define este modelo, con cualquier contenido)

- **Dinámica del movimiento:** todo entra en el instante en que se dice: palabras suben de detrás de una regla, ítemes ganan punto y línea-guía, anillos se trazan, el puntero corre, números cuentan con freno, dibujos se trazan y actúan (una región se enciende, la columna se tuerce). Antes de ser dicho, el lugar de cada cosa aparece **a lápiz** (trazo gris). Entra decidido y se asienta, sin rebote. Los cambios se cruzan: el cuadro se cierra en un círculo en torno al rostro y se encoge revelando la página nueva; de una lupa a otra, el contenido antiguo sale cuando comienza a viajar y el nuevo entra por debajo de ella; de vuelta, el círculo crece por encima y se abre para la pantalla completa.
- **Organización y jerarquía:** la lupa es el centro de la composición y cambia de lugar cada momento (pantalla completa, arriba, centro, esquina, lado). Alrededor de ella, un encabezado (número en un anillo "01", "02"… y el título) y el cuerpo del examen (dibujo, mostrador, lista, trazo). Una cosa grande por vez; rótulos, detalles y la etiqueta "ilustrativo" más pequeños. Error con ✗ rojo, acierto con ✓ azul.
- **Tipografía:** una familia sola, Figtree (sin condensada): 800 en la pantalla completa, números y términos; 700 en los títulos de la lupa, ítemes y rótulos; 600 en la leyenda. Pantalla completa de 56 a 116 px, títulos de la lupa de 60 a 88 px, ítemes de 44 a 76 px, rótulos de atlas ≥ 34 px. Todo texto se mide y se reduce para caber, en líneas equilibradas; nunca se desborda.
- **Marco de la persona:** pantalla completa con el rostro en la línea del centro (texto en la niebla blanca debajo de la barbilla) o la lupa: un círculo de 368 a 600 px con aro azul fino, cabeza completa, que sigue el rostro cuando la persona se mueve. Detrás de ella, anillos finos y un anillo graduado que gira lentamente. Nada de recortar a la persona del fondo, nada de brillo detrás de ella.
- **Colores, textura y sonido:** fondo blanco frío, tinta azul casi negra, **azul clínico** para trazos, números y lo que está correcto, **rojo solo para el error**. Papel milimetrado azul-claro en los trazos, trazo de atlas con puntas redondeadas. Sonido raro y tonal: una nota grave cuando la lupa llega a un lugar nuevo, dos notas bajando en ✗, dos subiendo en ✓, un acorde en el cierre.

## Antes de empezar

1. **Ambiente.**
   - Este modelo corre **en la computadora** del usuario: Claude Code, la app de Claude con acceso a la terminal, o el Codex (en la app de ChatGPT o en la terminal).
   - Necesita Node 18+, unos 3,5 GB libres e internet la primera vez (Whisper y modelo de transcripción, 1,6 GB, descargados una sola vez; navegador de render, 100 MB; el proyecto, ~1 GB). En Mac, la transcripción compila Whisper con las herramientas de Xcode (`xcode-select --install`).
   - Si no puedes correr comandos en la computadora del usuario (ChatGPT o Claude en el navegador, sin terminal), **detente y explica eso**. No entregues una versión simplificada (solo subtítulos, cortes hechos por otro camino).
2. **Carga la skill de Remotion** (`remotion-best-practices`). Si no está instalada, pídele al usuario que corra `npx skills add remotion-dev/skills`. El proyecto ya viene listo: no necesita `remotion-create` ni del Studio (los cuadros de `stills.mjs` son la vista previa). El pedido de edición ya es el pedido para renderizar.
3. Confirma la ruta del video. Pregunta una vez **nombre y área** de quién habla (ej.: "Dra. Ana Ribeiro" / "Fisioterapeuta", "Carla" / "Educación financiera"): van en la firma del cierre, como en un expediente. Sin respuesta, continúa sin firma.

- **Idioma:** el video del usuario está en español por defecto. La transcripción (`preparar.mjs` ya usa `--idioma es`), los subtítulos y cada texto en pantalla (rótulos, títulos, tarjetas, cierre) van en el idioma del video. Si el usuario habla otro idioma, pasa `--idioma <código>` a `preparar.mjs`. Este modelo trae sus rótulos fijos ya traducidos al español; si en los `stills` ves algún texto fijo que no corresponde al idioma del video, tradúcelo en `src/` antes del render.

## Flujo

Corre todo desde dentro de la carpeta del proyecto creada en el paso 1.

### 1. Crear el proyecto

Copia `assets/template/` de esta skill a una carpeta nueva, por ejemplo `edicao-<nome-do-video>/`, y corre `npm install` dentro de ella.

Crea esa carpeta **fuera de carpetas sincronizadas con la nube** (iCloud en Documentos/Escritorio, OneDrive, Dropbox, Google Drive). Ellas vacían archivos locales y Node se traba leyendo `node_modules`. `~/Movies` en Mac o `C:\Videos` en Windows funcionan bien.

### 2. Analizar

```bash
node scripts/preparar.mjs "/caminho/do/video.mp4"
```

Mide el video, transcribe cada trecho de habla por separado (con tiempo por palabra) y guarda la propuesta en `work/cortes.json`: **un ítem por trecho de habla**, con las frases y el segundo en que cada una comienza. Opciones: `--idioma es` (predeterminada `pt`), `--modelo small` para máquinas débiles.

### 3. Elegir las tomas

Lee la lista como un editor. En `work/cortes.json`, marca `"manter": false` en:

- **intentos abandonados y repetidos**: la misma frase comenzada varias veces. Queda el último intento completo;
- **errores, toses, "espera, voy de nuevo"**, y el "listo, gracias" después del fin.

Cuando solo parte de un ítem funciona, divídelo en dos usando el tiempo de inicio de las frases (`frases[].em`): el primero termina 0,05 s antes de la frase que sale, el segundo comienza en ella, y marca la que sale. Una advertencia `[conferir: pouca fala para a duração]` indica trecho largo con poco habla: suele esconder repeticiones.

**Ítemes marcados `[sem transcrição: ouça antes de tirar]`** pueden ser habla que la transcripción perdió (un "Un:" corto, por ejemplo): ellos vienen con `"manter": true` y solo salen si confirmas que no hay habla. Sin poder escuchar, mide el volumen (`ffmpeg -ss <de> -t <duração> -i video.mp4 -af volumedetect -f null -`): cerca de −60 dB es silencio; cerca de −20 dB es habla y queda.

**Dos versiones completas con contenido diferente** (dos finales con llamadas diferentes) no son toma repetida: pregunta al usuario cuál queda. Sin poder preguntar, quédate con la última y di en la entrega cuál quedó y por qué.

Las pausas cortas (hasta ~0,5 s) son respiración y quedan. Solo las pausas largas salen.

### 4. Medir el rostro y cortar

Abre `work/medir-1.jpg`, `-2` y `-3` (inicio, medio y fin de la grabación, con una cuadrícula de 0,05 en 0,05) y lee, en fracciones (0 = izquierda/arriba, 1 = derecha/base):

- el **centro del rostro** (entre los ojos y la punta de la nariz) → `--rosto-x` y `--rosto-y`;
- la **punta de la barbilla** → `--queixo-y`.

Usa la posición más común; si la persona se mueve mucho, quédate en el medio del movimiento. Entonces:

```bash
node scripts/cortar.mjs --rosto-x 0.49 --rosto-y 0.30 --queixo-y 0.41
```

El script corta, elige el recorte y calcula `rosto`, `zona` y los puntos de corte en el plano. Video horizontal (y vertical con la persona muy baja o muy cerca de la cámara) se convierte en recorte 3:4: la persona queda en la parte de arriba y la base se convierte en el fondo blanco del consultorio; el modelo funciona igual. Al final, sigue el rostro por el video: la lupa acompaña cuando la persona se mueve y, si el centro leído en la cuadrícula se equivocó, rehace el recorte con el rostro en el centro. Lee los avisos que imprime.

### 5. Verificar el encuadre

```bash
node scripts/stills.mjs --guias
```

Genera tres cuadros con guías: la cruz azul cae en el rostro (solo en pantalla completa); la caja azul punteada es dónde el texto entra en pantalla completa (debajo de la barbilla, en la niebla blanca); el contorno verde es la persona (en pantalla completa, el cuadro todo; en la lupa, el círculo); la caja naranja es el encabezado; la lila, el cuerpo del examen; la amarilla, la leyenda, arriba de la línea roja (interfaz de la aplicación). Si la cruz no cae en el rostro, rehaz el paso 4 con medidas corregidas.

En la lupa, el rostro ocupa unos 43% del círculo (el zoom sale del tamaño del rostro medido en el paso 4). Si la cabeza sale cortada o muy pequeña, ajusta `"lupa": { "zoom": …, "ancoraY": … }` en el plano (ve `references/plano.md`) y verifica con `node scripts/stills.mjs --guias 5 10`.

### 6. Mapa editorial

Lee `references/adaptar.md` y haz el mapa del habla en `work/mapa.md`: una línea por golpe (2 a 5 s, una idea), con el tiempo, el trecho hablado, la forma (lista, número, comparación, tendencia…), el bloque **de este modelo** (tabla abajo), el lugar de la lupa y lo que aparece en la pantalla. La firma (`cronometro` o `anatomia`) entra **al menos una vez**, como metáfora si el tema es otro (ve "La firma en cualquier tema").

Piensa también en la **viaje de la lupa**: cada momento en un lugar diferente al anterior (pantalla completa, arriba, centro, esquina, lado), pantalla completa al inicio y al final, y ningún trecho de pantalla completa con menos de ~1,8 s entre dos momentos de lupa.

### 7. Planear los momentos

Lee `references/plano.md` (los campos de cada bloque, límites de texto y reglas de tiempo) y rellena `src/plano.json`: `marca`, `momentos`, `semLegenda` y `correcoes`. Cada ítem, acción, rótulo y sello tiene su `em`, sacado de `work/palavras.json`. Todo lo que aparece en la pantalla viene del habla.

Después:
- `node scripts/conferir.mjs --mapa`: corrige hasta salir **APROBADO** (nunca uses `--forcar`);
- `node scripts/legendas.mjs`: lista las líneas de leyenda (las que aparecen fuera de los momentos) y marca palabra sola; corrige lo que sea.

### 8. Verificar los cuadros

```bash
node scripts/stills.mjs --momentos
```

Genera, para cada momento, un cuadro antes, uno en el medio, uno poco después de cada sub-paso (todo campo `em` o terminado en `Em`) y uno después del fin. Mira cada imagen reducida a ~540 px de ancho y verifica: ¿el texto cabe y está entero? ¿La información está organizada, con una cosa grande por vez? ¿Algo entra cada 1,5–2,5 s? ¿La lupa no cubre texto y muestra la cabeza completa? ¿El rótulo apunta la parte correcta? ¿El ✗/✓ concuerda con el habla? Para ver un instante específico (el medio de un cambio): `node scripts/stills.mjs 12.7 18.4`. Corrige y repite hasta estar limpio.

### 9. Renderizar y entregar

```bash
node scripts/render.mjs "out/<nome-do-video>-clinico.mp4"
```

Verifica el plano de nuevo antes de renderizar y normaliza el audio. Entrega:
- la ruta del archivo;
- la duración y cuánto se cortó;
- el **mapa resumido** (qué bloque entró en cada trecho y dónde estaba la lupa);
- lo que es **ilustrativo** (mostrador o curva sin números) y las metáforas usadas (por ejemplo, el cerebro para "impulso" y "criterio");
- lo que el usuario debe verificar (una toma en duda, una palabra que la transcripción puede haber errado, una versión elegida en lugar suyo).

## Bloques de este modelo

| Forma de la información | `tipo` en el plano | Cómo aparece en este estilo |
|---|---|---|
| apertura | `abertura` | Pantalla completa. La frase sube palabra por palabra en la niebla blanca debajo de la barbilla, grande; el `destaque` en azul. |
| lista | `topicos` | Lupa en la esquina. Líneas de atlas: un tallo azul baja y cada hallazgo gana punto y línea-guía con codo en la palabra de él; ✗/✓ opcionales. Sin título, un contador "2/3" al lado de la lupa. |
| pasos | `passos` | Lupa al lado. La conducta: anillos numerados conectados por un trazo que avanza; el paso actual se llena de azul. |
| número | `numero` | Lupa en el centro. El mostrador se monta alrededor de ella y el anillo se llena mientras el número cuenta (porcentaje se llena hasta el valor); el rótulo arriba. |
| comparación | `comparacao` | Lupa arriba. Dos columnas de examen con sellos; en el veredicto, ✓ azul y subrayado para un lado, ✗ rojo para el otro. |
| gráfico | `grafico` | Lupa en la esquina. Trazo azul en papel milimetrado (línea, barras, torta en anillo). Sin números: la curva de la tendencia con una lupa de detalle al fin y la etiqueta "ilustrativo". |
| destaque | `destaque` | Pantalla completa. Sello del examen (✗ rojo en la alerta, anillo azul en la palabra-clave) y la frase grande subrayada. |
| definición | `definicao` | Lupa arriba. Artículo de atlas: el término subrayado, un punto y la línea-guía bajando hasta el significado en azul. |
| frase | `frase` | Pantalla completa. Anotación en la niebla; el trecho negado tachado en rojo, palabra por palabra. |
| pregunta | `pergunta` | Pantalla completa. Ficha de consulta: anillo con "?", la pregunta y las opciones con el círculo de marcar. |
| cierre | `cta` | Pantalla completa. La llamada, el botón de trazo (guardar, seguir, comentar, enlace) y la firma de expediente. |
| **firma** | `cronometro` | Lupa en el centro. El aro se convierte en un mostrador que mide tiempo, nivel o cualquier meta: el puntero corre y se traba en rojo antes de la meta, o cierra la vuelta en azul. |
| **firma** | `anatomia` | Lupa en la esquina o al lado. Tabla de atlas (cerebro, cuerpo, columna, dientes) que se traza; regiones se encienden en el habla, rótulos con línea-guía, lupa de detalle y veredicto ✓/✗. |
| conteo | `contagem` | Lupa arriba. Pequeñas lupas numeradas que se cierran en la contención ("tres cosas"). |
| conducta | `checklist` | Pantalla completa (o lupa). "Lo correcto": líneas con ícono que se mueve y ✓. |
| apertura en líneas | `titulo` | Pantalla completa, líneas elegidas a mano y el par ✓ / ✗ de la duda. |

Cualquier forma de información tiene un bloque aquí. Habla sin números usa la versión ilustrativa (`tendencia` en el gráfico, meta en palabras en el mostrador).

## La firma en cualquier tema

La firma del Clínico es **"examinar la idea"**: la lupa va al lugar y el habla se convierte en un instrumento que mide (el mostrador: algo que llega o no llega a una meta) o una tabla de atlas (lo que está pasando por dentro: en la cabeza, en el cuerpo, en la base). Las tablas funcionan como metáfora: el **cerebro** sirve para decisión, impulso, emoción, hábito y enfoque; el **cuerpo**, para esfuerzo, acción y dónde algo pesa; la **columna**, para la base que se tuerce y se alinea.

1. **Finanzas / cripto.** "Pero el mercado subiendo no significa dinero en el bolsillo… hay gente que pierde porque compra por impulso, elige moneda sin criterio y asume riesgo que no entiende."
   - `cronometro`: título "Mercado subiendo", `meta` "En el bolsillo", el puntero corre en "mercado" y se traba en "no" (`para`), `ilustrativo: true`, veredicto ✗ "No significa dinero".
   - `anatomia` con `desenho: "cerebro"`: "Incluso en la alza, hay gente que pierde"; la amígdala se enciende en rojo en "impulso" (rótulo "Impulso"), la frontal en "criterio" ("Sin criterio"), la temporal en "riesgo" ("Riesgo que no entiende").
2. **Deporte.** "Antes de que la bola llegue, mira dónde está el portero… rastrero, que bola baja es más difícil de defender."
   - `cronometro`: "Antes de que la bola llegue, mira el portero", `meta` "Bola llega", el puntero corre del "Antes" y cierra la vuelta (✓), `ilustrativo: true`.
   - `anatomia` con `desenho: "corpo"` (el portero): "Rastrero"; los pies se encienden en azul (`acende`, blanco `pe`) con el rótulo "Bola baja" y el veredicto ✓ "Más difícil de defender".
3. **Relaciones (muy lejana).** "La mayoría de las peleas comienzan en el cansancio, no en el tema. Espera veinte minutos antes de responder."
   - `anatomia` con `desenho: "cerebro"`: "La mayoría de las peleas comienzan en el cansancio"; la amígdala se enciende en rojo en "cansancio" (rótulo "Cansancio") y la frontal gana el rótulo "No en el tema".
   - `cronometro`: "Espera 20 minutos", `meta` "20 min", sin `para`: el puntero cierra la vuelta en azul y gana ✓.

## Fidelidad

- Todo en la pantalla viene del habla. Puede resumir con sus palabras ("compra por impulso" → "Impulso"), sin cambiar el sentido.
- No inventes número, nombre, precio, plazo, porcentaje, diagnóstico ni recomendación que la persona no dijo.
- Sin número dicho, usa las formas ilustrativas (`tendencia`, meta en palabras con `ilustrativo: true`); la etiqueta "ilustrativo" aparece sola.
- Los dibujos son esquemáticos y, fuera de la salud, metáforas; di eso en la entrega. En videos de salud: nada de promesa de resultado ni de diagnóstico.

## Cuando algo sale mal

- **`conferir.mjs` rechazó**: lee el trecho que apunta y elige un bloque para él (`references/adaptar.md`, paso A). Trecho largo en un solo bloque: divídelo en dos o agrega ítemes con `em`. Faltó la firma: usa el `cronometro` (cualquier meta, tiempo o evento) o el `anatomia` como metáfora.
- **Comandos se traban sin mensaje**: el proyecto está en una carpeta sincronizada con la nube. Mueve y corre `npm install` de nuevo.
- **Un habla desapareció del video**: el trecho se marcó para salir en `work/cortes.json`. Marca `"manter": true` y corre el `cortar.mjs` de nuevo con `--manter-plano` (los momentos, la marca y las correcciones continúan).
- **La transcripción erró un nombre, término o número**: usa `correcoes` en el plano.
- **Falla al compilar Whisper en Mac**: faltan las herramientas de Xcode (`xcode-select --install`).
- **Rostro cortado o pequeño en la lupa**: ajusta `lupa.zoom` (y, si es necesario, `lupa.ancoraY`) en el plano.
- **Rótulo fuera del lugar o encima de otro**: verifica el `alvo` (lista en `references/plano.md`) y usa blancos de lados diferentes; el nombre se voltea solo al otro lado y se rompe en dos líneas cuando no cabe.
- **Texto demasiado pequeño**: el bloque reduce el texto para caber; pasó del límite de `references/plano.md`. Acorta con las palabras del habla.
- **Aviso de ampliación al cortar**: la grabación tiene poca resolución para el recorte; el video saldrá menos nítido. Avisa al usuario.
