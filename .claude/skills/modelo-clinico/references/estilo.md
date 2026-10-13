# El estilo Clínico

Lee antes de alterar cualquier componente, color o fuente del template. El valor de este modelo es la claridad de consultorio: parece alguien explicando con una lupa en la mano y un atlas abierto, sea el tema un diente, una cartera de cripto o una patada a gol. Casi toda "mejora" que agrega adorno empeora el resultado.

## La idea

Una lupa. En la apertura, la persona está en pantalla completa, cerca, y la frase se escribe en la base del cuadro, que se disuelve en blanco. Cuando comienza a explicar, el cuadro se cierra en un círculo en torno al rostro y el círculo se encoge y viaja: se convierte en la lupa, con aro azul, y la pantalla se convierte en el fondo blanco del consultorio. Alrededor de ella, la información aparece como en un examen: un mostrador que mide, un dibujo de atlas con rótulos, una lista de hallazgos, una conducta numerada, un trazo en papel milimetrado, un artículo. ✗ rojo en lo que está mal, ✓ azul en lo que está bien. En el cierre, la persona vuelve a la pantalla completa.

## El sistema visual (vale para cualquier tema)

### Dinámica del movimiento
- Todo entra en el instante en que se dice: palabras suben de detrás de una regla invisible, ítemes ganan punto y línea-guía, anillos se trazan, el puntero corre, números cuentan con freno, dibujos se trazan y actúan.
- Antes de ser dicho, el lugar de cada cosa ya aparece **a lápiz** (trazo gris en lugar de la palabra, círculo punteado, tallo gris): nunca una caja vacía, nunca texto legible antes de hora.
- Entra decidido y se asienta (curva `entra` en `src/anim.tsx`); nada rebota ni pulsa — solo el punto de dolor del dibujo, que pulsa porque duele, y el anillo graduado detrás de la lupa, que gira lentamente (el instrumento está encendido).
- **Los cambios se cruzan.** De pantalla completa a lupa, el cuadro se cierra en un círculo grande en torno al rostro (0,22 s) y luego se encoge y viaja hasta el lugar (0,4 s), revelando la página nueva alrededor. De una lupa a otra, el contenido antiguo sale cuando comienza a viajar y el nuevo entra por debajo de ella. De vuelta a pantalla completa, el círculo crece por encima del contenido antiguo y se abre al rectángulo. Nunca dos páginas de texto una sobre la otra.
- Terminada la entrada de una palabra, ella queda como texto simple (sin la máscara de entrada).

### Organización y jerarquía
- La persona (la lupa) es el centro de la composición; el contenido se organiza alrededor de ella, en cinco lugares: pantalla completa (texto en la niebla debajo de la barbilla), `topo` (lupa grande arriba, contenido abajo), `centro` (lupa en el medio con el mostrador alrededor), `canto` (lupa pequeña arriba a la derecha, título al lado, contenido grande abajo), `lado` (lupa media a la izquierda, título a la derecha, contenido abajo).
- Encabezado = número en un anillo ("01", "02"… cuando el habla numera) + título. Cuerpo = el examen (dibujo, mostrador, lista, trazo). Una cosa grande por vez; rótulos, detalles y etiquetas más pequeños.
- Sin título, el encabezado de una lista se convierte en un contador ("2/3" en un anillo que se llena).
- La lupa cambia de lugar cada momento (nunca el mismo lugar tres veces seguidas). Pantalla completa al inicio y al final.

### Tipografía
- Una familia sola: **Figtree** (Google Fonts), sin condensada, espaciado entre letras de −0,02 a −0,01 em.
- 800 en textos de pantalla completa, números y términos; 700 en títulos de lupa, ítemes y rótulos; 600 en leyenda y en rótulos en mayúsculas (con +0,08 em).
- Todo texto se **mide** con los anchos reales de la fuente (`src/larguras.ts`, `src/medida.ts`), se rompe en líneas equilibradas y se reduce hasta caber; nunca se desborda.
- Tamaños (cuadro 1080 × 1920): pantalla completa 56–116 px; títulos de lupa 60–88 px; número del `numero` hasta 190 px; ítemes 44–76 px; opciones 40–58 px; rótulos de atlas 34–52 px; etiquetas en mayúsculas ≥ 30 px; leyenda 44 px. Nada debajo de 30 px.

### Marco de la persona
- La persona es siempre el video completo reenmarquado (`VideoNaCaixa` del motor), nunca recortada del fondo: en pantalla completa o dentro del círculo.
- En pantalla completa, el rostro queda en la línea vertical del centro; el zoom alterna 1 ↔ 1,06 con cambio seco en los cortes.
- En la lupa, el rostro ocupa ~43% del diámetro (el zoom sale del tamaño del rostro medido por el `cortar.mjs`), cabeza en el centro, un poco de hombro; la lupa sigue el rostro cuando la persona se mueve.
- El aro: un filete azul de 3,5 px alejado 11 px del video, que acompaña la forma de la caja. Detrás de la lupa, tres anillos casi invisibles se abren cuando el círculo se forma y un anillo graduado gira lentamente. Nada de brillo, sombra o halo detrás de la persona.

### Colores, textura y sonido
- Fondo `#F3F6FA` (blanco frío); blanco puro en la niebla, en las tarjetas y rellenos.
- Tinta `#0E2445` (azul casi negro) para texto.
- **Azul clínico `#1A4E9A`** para trazos, números, énfasis, ✓ y lo que está correcto; azul-claro `#DCE6F4` para rellenos.
- Grises suaves para líneas de apoyo, tejidos y "a lápiz" (`#CCD4DF`).
- **Rojo `#CC3F36` solo para el error**: ✗, el puntero que se traba, la región que duele, el tachado, la alerta. Si todo es rojo, nada es error.
- Textura: papel milimetrado azul-claro en los trazos; rellenos claros y trazo con puntas redondeadas en los dibujos (4,5–5,5 px en los contornos, 2,5–3,5 en los detalles).
- Sonido raro y tonal: una nota grave cuando la lupa llega a un lugar nuevo (una altura por lugar), dos notas bajando en ✗, dos subiendo en ✓ (cada ✓ un poco más agudo), un acorde suave en el cierre. Nada de ruido, clic agudo, campana o "whoosh"; nada encima de cada palabra.

## Cómo aparece cada bloque

| Bloque | Pieza del Clínico |
|---|---|
| `abertura`, `titulo` | texto grande en la niebla blanca debajo de la barbilla; `titulo` puede tener el par ✓ / ✗ de la duda |
| `topicos` | líneas de atlas: tallo azul, punto y línea-guía con codo hasta cada hallazgo; ✗/✓ opcionales |
| `passos` | la conducta: anillos numerados conectados, el paso actual lleno de azul |
| `numero` | el mostrador alrededor de la lupa se llena mientras el número cuenta |
| `comparacao` | dos columnas de examen con sellos; el veredicto da ✓ a un lado y ✗ al otro |
| `grafico` | trazo azul en papel milimetrado; torta = anillo dividido; sin números, curva con lupa de detalle y "ilustrativo" |
| `destaque` | sello del examen (✗ alerta / anillo clave) + frase grande subrayada |
| `definicao` | artículo de atlas: término subrayado, punto y línea-guía hasta el significado |
| `frase` | anotación en la niebla, con tachado rojo palabra por palabra |
| `pergunta` | ficha de consulta: anillo "?" y opciones con círculo de marcar |
| `cta` | botón de trazo que se dibuja + firma de expediente |
| `cronometro` (firma) | el aro de la lupa se convierte en instrumento: mide tiempo, nivel o meta; se traba en rojo o cierra en azul |
| `anatomia` (firma) | tabla de atlas: cerebro, cuerpo, columna, dientes; acciones, rótulos y veredicto |
| `contagem` | pequeñas lupas numeradas que se cierran en la contención |
| `checklist` | la conducta con ícones que se mueven y ✓ |

## Lo que puede cambiar por video

- Textos, tiempos, bloques, dibujos, acciones, rótulos y los lugares de la lupa (es el trabajo del plano).
- `marca` (nombre y área).
- El recorte (9:16 o 3:4), elegido por el `cortar.mjs`. En 3:4, la base del cuadro se convierte en el fondo blanco del consultorio.
- `lupa.zoom` / `lupa.ancoraY`, si el rostro queda grande o pequeño demás en el círculo.
- `sfx: false`, si el usuario no quiere sonidos.

## Lo que no cambiar sin que el usuario pida

- Colores, fuente, grosores de trazo y tamaños de texto (en `src/tema.ts`). Si el usuario pide el color de su marca, cambia **solo** `azul` (y, si es necesario, `azulClaro`, una versión muy clara de él); el rojo del error, la tinta y el fondo mantienen el estilo. Un verde-petróleo (`#0F6B6B`) o un azul-marino funcionan; colores cálidos (naranja, rosa) pelean con el rojo del ✗.
- Las posiciones y tamaños de la lupa (en `src/layout.ts`), la altura de la leyenda, la niebla y el cambio en círculo.
- La regla del rojo solo en el error.
- No agregues emojis, stickers, barras de progreso, vibración, flashes, transiciones entre cortes, sombras, brillos, fotos de banco o imágenes de personas reales. En salud, nada de antes-y-después de paciente ni promesa de resultado.

## Si necesitas algo que el modelo no tiene

- **Un dibujo nuevo** (ojo, pulmón, pata de perro, una moneda, un travesaño de gol…): crea `src/desenhos/<Nome>.tsx` siguiendo `Cerebro.tsx` o `Dente.tsx`: un componente que recibe `t`, `de`, `acoes` y `id` y dibuja en una caja propia (en unidades del dibujo), con el contorno en `Traco` (de `src/anim.tsx`) que se traza desde `de`, rellenos claros de `tema.ts`, y cada acción leída de la lista `acoes` por nombre y animada con `prog(t, em, dur)`. Exporta la caja útil (`CAIXA_…`) y los blancos (`ALVOS_…`: punto `x`, `y` y la dirección predeterminada de la línea-guía `dx`, `dy`, en px de la pantalla), registra en `src/desenhos/biblioteca.tsx` y agrega el nombre en `Desenho` y las acciones en `Acao` (`src/plano.ts`). Rojo solo en la acción que muestra el problema. Verifica con `stills.mjs` y corre `npx tsc --noEmit`.
- **Un ícono nuevo para el `checklist`**: agrega el trazo en `IconeDoItem` (`src/componentes/Icones.tsx`, caja 100 × 100, con un movimiento pequeño que tenga que ver con el ítem) y el nombre en `IconeItem`.
- **Un bloque nuevo**: sigue la gramática arriba — lugar de la lupa viniendo de `src/layout.ts` (`areasDoLayout` da el encabezado y el cuerpo), encabezado con `Cabecalho`, texto hablado con `TextoFalado` + `encaixar`/`encaixarTitulo` (`src/medida.ts`) y `temposDoTexto`, sellos con `Selo`, rótulos con `Rotulo`, colores de `tema.ts` — y consulta la skill de Remotion para las reglas de animación.
