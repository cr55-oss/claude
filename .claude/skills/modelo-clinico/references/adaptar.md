# Cómo aplicar este modelo a CUALQUIER video

**Este modelo es un estilo, no un tema.** El video de ejemplo fue grabado sobre un tema solo para mostrar el estilo. El video del usuario puede hablar de cualquier cosa: cripto, salud, receta, ventas, una historia personal, una opinión. Tu trabajo es **traducir lo que dice él al lenguaje visual de este modelo**:
- la forma de animar;
- la organización y la jerarquía de la información;
- las fuentes y los colores;
- la forma como el marco de la persona se mueve.

La pregunta nunca es "¿este video va con el modelo?". La pregunta es "¿cómo este modelo muestra esta idea?".

## La regla que no se quiebra

Nunca entregues un video con solo subtítulos, apertura y cierre. La pantalla cambia cada 1,5 a 2,5 segundos con algo ligado a lo que está siendo dicho: un item que entra, un número que cuenta, un dibujo que se completa, un cambio de layout.

El `render.mjs` corre `node scripts/conferir.mjs` antes de renderizar y **rechaza** el plan cuando:
- menos de ~70% del video tiene momento en la pantalla;
- hay un trecho de más de ~3,5 s solo con la persona y los subtítulos;
- hay pocos momentos, o pocos tipos diferentes de momento;
- un momento se queda parado demasiado tiempo;
- la firma del modelo no aparece.

Cuando él rechace, él dice el trecho hablado que quedó vacío. Elige un bloque para ese trecho y corre de nuevo. **No uses `--forcar` para escapar de la conferencia.**

## Paso 0: estudia el ejemplo del modelo (2 minutos, antes del mapa)

La skill trae el ejemplo del modelo en `references/exemplo/`:
- **`quadros.jpg`:** un cuadro de cada momento del ejemplo, con el nombre del bloque y lo que se dice abajo. **Abre y mira.** Es la forma más precisa de entender el estilo: dónde queda la persona, cómo el texto aparece, el tamaño de cada cosa, el color de énfasis.
- **`plano-comentado.md`:** cada momento del ejemplo con lo que se dice y el JSON exacto que generó el efecto. Muestra cómo una frase se convierte en un bloque y cómo el texto de la pantalla se acorta.
- **`exemplo.mp4`:** el video entero. Si necesitas ver un instante entre dos momentos, extrae el cuadro con ffmpeg.

El ejemplo es de otro tema: copia el **estilo** (cuáles bloques, en qué orden, el ritmo, la jerarquía), nunca el tema. La conferencia exige al menos 2 efectos propios del modelo, además de la firma y de los bloques universales. Los efectos marcados como "propio" y "FIRMA" en la hoja son los que dan la cara del modelo: busca en lo que dice el usuario dónde cabe cada uno.

## Paso A: el mapa editorial (antes de escribir el plan)

1. Lee lo que se dice completo en `work/palavras.json`, después del corte. Divide en **golpes**: cada idea, normalmente una frase o media frase, de 2 a 5 s.

2. Dale a cada golpe una **forma de información**:

| En lo que se dice | Forma | Bloque universal (existe en todos los modelos) |
|---|---|---|
| promesa, pregunta inicial, tema del video | apertura | `abertura` |
| enumeración: "tres errores", "primero… después…", items separados por coma | lista | `topicos` |
| secuencia, proceso, camino, etapas en el tiempo, "cómo hacer" | pasos | `passos` |
| número, precio, porcentaje, fecha, cantidad, tiempo | número | `numero` |
| dos lados: A x B, antes x después, equivocado x correcto, mito x verdad, quién gana x quién pierde | comparación | `comparacao` |
| algo que sube, cae, crece, la mayoría contra pocos, proporción, evolución | gráfico | `grafico` |
| alerta, riesgo, error, palabra clave fuerte | destacado | `destaque` |
| término técnico explicado ("bull market, un ciclo de alza") | definición | `definicao` |
| frase de efecto, opinión fuerte, conclusión | frase | `frase` |
| pregunta hecha a quién ve | pregunta | `pergunta` |
| llamada final: guardar, seguir, comentar, link, "toca en saber más" | cierre | `cta` |

   **Una frase puede tener más de una forma.** "Hay gente que pierde porque compra por impulso, elige moneda sin criterio y asume riesgo que no entiende" es un `destaque` ("hay gente que pierde") seguido de `topicos` (los tres motivos). Prefiere la forma más rica: tres motivos dichos en secuencia son `topicos`, no tres `frase`.

3. Elige, para cada golpe, el **bloque de este modelo**. La tabla "Bloques de este modelo" en el SKILL.md dice cómo cada forma aparece en este estilo.
   - **Usa la firma del modelo** (el bloque que le da la cara) **al menos una vez**, aunque el tema sea otro. La sección "La firma en cualquier tema" del SKILL.md muestra cómo.
   - La firma normalmente sirve como metáfora. Ejemplo: un embudo sirve para cualquier "muchos comienzan, pocos llegan".

4. Escribe el mapa en `work/mapa.md`, una línea por golpe: tiempo, trecho hablado, forma, bloque elegido y lo que aparece en la pantalla. Este mapa va, resumido, en tu respuesta final.

## Paso B: del mapa al plan

- **Tiempo.**
  - Cada momento comienza en la primera palabra del golpe y va hasta el golpe siguiente; momentos vecinos pueden tocarse.
  - Dentro del momento, cada item entra en el `em` de la palabra que lo nombra, sacado de `work/palavras.json`. Nada aparece antes de ser dicho.
- **Texto de pantalla.**
  - Corto y con las palabras de lo que se dice propio: título hasta ~40 caracteres, item de 2 a 6 palabras.
  - Una idea grande por vez. El resto queda más pequeño (jerarquía).
  - Puede resumir ("compra por impulso" → "Impulso"), pero no puede cambiar el sentido.
- **Fidelidad.**
  - No inventes número, nombre, precio, tasa ni hecho.
  - Gráfico sin números dichos usa la forma cualitativa (`tendencia`) con `ilustrativo: true`.
  - Si un bloque pide un dato que lo que se dice no tiene, usa otro bloque. No llenes con adivinanza.
- **Ritmo.**
  - No repitas el mismo bloque tres veces seguidas.
  - Sigue la gramática de layout del modelo: la persona cambia de lugar en las fronteras de los golpes.
  - Momento con más de ~4 s necesita items entrando por dentro de él.
- **Solo persona y subtítulos:** máximo ~3 s, y solo en respiros (una transición, un "mira solo").

## Paso C: conferir antes de renderizar

```bash
node scripts/conferir.mjs --mapa
```

Corrige hasta que aparezca **APROBADO**. Después corre `node scripts/stills.mjs --momentos` y mira los cuadros: ¿el texto cabe? ¿Nada cubre la cara? ¿La pantalla cambia de verdad?

## Ejemplo (video sobre cripto en un modelo de otro tema)

Lo que se dice: "El Bitcoin rompió los 83 mil dólares y reabrió la conversación sobre el nuevo bull market, un ciclo de alza. Pero el mercado subiendo no significa dinero en el bolsillo para la mayoría. Incluso en la alza, hay gente que pierde porque compra por impulso, elige moneda sin criterio y asume riesgo que no entiende. ¿Cómo evaluar los proyectos? Grabé una clase gratuita explicando cómo yo analizo el mercado, los riesgos y la elección de los activos, sin promesa de ganancia. Toca en Saber Más."

| Golpe | Forma | Lo que entra en la pantalla |
|---|---|---|
| "Bitcoin rompió los 83 mil dólares" | `numero` | US$ 83.000 contando, rótulo "Bitcoin" |
| "reabrió… bull market, un ciclo de alza" | `definicao` | "Bull market" → "ciclo de alza" |
| "mercado subiendo no significa dinero en el bolsillo para la mayoría" | `grafico` (tendencia sube, ilustrativo) o `comparacao` | línea subiendo × bolsillo vacío; o "mercado sube" × "tu saldo" |
| "hay gente que pierde" | `destaque` (alerta) | "Hay gente que pierde" |
| "compra por impulso, elige sin criterio, asume riesgo que no entiende" | `topicos` | Impulso · Sin criterio · Riesgo sin entender, cada uno en su palabra |
| "¿cómo evaluar los proyectos?" | `pergunta` | la pregunta se monta |
| "analizo el mercado, los riesgos y la elección de los activos" | `passos` | Mercado → Riesgos → Activos |
| "sin promesa de ganancia" | `frase` con riesgo | "promesa de ganancia" tachada |
| "Toca en Saber Más" | `cta` (link) | el botón |

En un modelo de **embudo**, la firma entra en los tres motivos: "muchos entran en la alza → compran por impulso → sin criterio → pocos salen en la ganancia", sin números y marcado como ilustrativo.

En un modelo de **cocina** (receta), los mismos tres motivos se convierten en ingredientes que caen en la olla ("receta de la pérdida").

## Dónde el mapa normalmente falla

- **Todo se convirtió en `frase`.** Busca listas, números y comparaciones escondidos en lo que se dice: casi todo video tiene.
- **Firma dejada de lado porque "el tema es otro".** Ella es el estilo. Úsala como metáfora.
- **Texto demasiado largo en la tarjeta.** Acorta con las palabras de lo que se dice.
- **Items entrando todos juntos.** Cada uno entra en su propia palabra.
