# Plan de edición — "No le des un baño de agua fría para la fiebre"

**Cuenta:** @dra.tania.pediatra · **Formato:** Reel vertical 1080×1920, 30 fps · **Duración:** ~1:28 (se conserva completo)
**Estilo:** "Trazo a mano cálido" — ver maqueta: https://claude.ai/artifact/8y5gtXG1bKhK7n7sUFh9p7
**Archivo crudo:** `202610051046.mp4` (Drive → `Reels-Tania/crudos/`)

> Los tiempos de este plan salen de la transcripción por bloques de ~5 s. **Antes de editar, transcribir con Whisper (palabra por palabra) y re-sincronizar cada evento a la palabra exacta** que lo dispara (columna "Disparo"). Si el encuadre real no deja espacio sobre la cabeza en algún tramo, usar acercamiento en lugar de dibujo.

---

## 1. Reglas globales (aplican a todo el video)

### 1.1 Corte y voz
- **Velocidad natural de la voz. Nunca acelerar.**
- Quitar solo: silencios > 0,5 s, tomas fallidas, respiraciones ruidosas. Pausas cortas (≤ 0,4 s) se quedan.
- Sin firma ni nombre en pantalla.

### 1.2 Imagen (corrección de color antes de cualquier gráfico)
1. Balance de blancos neutro (piel natural, sin tinte verde/magenta).
2. Exposición: rostro bien iluminado; levantar sombras del rostro sin lavar negros.
3. Contraste medio, negros levemente lavados; tono general **cálido suave** (+temperatura ligera).
4. Piel: saturación natural, nunca naranja.
5. **Grano** sutil (3–5 %) y **viñeta** suave en todo el video.

### 1.3 Encuadre
- **A-roll base** = escala 100 %.
- **Acercamiento (punch-in) seco** a 112–118 % centrado en el rostro, solo en las frases marcadas ★. Corte seco, sin animación de zoom.
- **Respiración del plano:** entre acercamientos, variar sutilmente 100 % ↔ 104 % cada 4–6 s para que el plano nunca se sienta congelado.

### 1.4 Zonas de pantalla (no negociables)
| Zona | Área (px, sobre 1080×1920) | Uso |
|---|---|---|
| Franja segura superior | y 0–220 | Nada importante (UI de Instagram) |
| **Zona de contenido** | sobre la cabeza de Tania, ~y 220–760 (ajustar al encuadre real) | Dibujos, ventanas de B-roll, títulos apilados |
| Rostro | nunca cubierto | — |
| **Subtítulos** | centrados, altura del pecho, ~y 1150–1300 | 1–2 palabras |
| Franja segura inferior | y 1500–1920 + columna derecha 960–1080 | Nada (caption y botones de IG) |

### 1.5 Tipografía
- **Subtítulos:** Montserrat 800, ~64 px, blanco `#FFFFFF`, **sin contorno ni caja**, sombra suave (0 2px 10px rgba(0,0,0,.45)). 1–2 palabras por pantalla, entra y sale en **corte seco** sincronizado a la palabra.
- **Acento:** la palabra clave del subtítulo en ocre `#E8955A` (máx. 1 por frase, no en todas).
- **Títulos apilados:** líneas pesadas Montserrat 900 MAYÚSCULAS (~120 px) + líneas ligeras Montserrat 300 minúsculas (~56 px). Una palabra pesada en ocre. Entran línea por línea: subir 14 px + aparecer en 180–220 ms, `ease-out`, **sin rebote**. Mientras hay título apilado, **no hay subtítulo**.
- **Letra a mano** (pensamientos y rótulos de dibujos): Caveat 600, blanco o ocre.

### 1.6 Ilustraciones "trazo a mano"
- Línea blanca crema `#FFFAF2`, grosor 6–8 px (a 1080 px), puntas redondeadas, sombra suave para separarla del fondo; acento ocre `#E8955A`.
- **Se dibujan solas** (stroke draw-on) en 0,5–1,2 s, `ease-in-out`.
- **"Vibración" de dibujo a mano:** desplazamiento de ruido sutil (≈2–3 px) que cambia ~8 veces por segundo.
- Cada trazo aparece **en la palabra que lo nombra**, nunca antes. Salen con fade de 250 ms cuando cambia la idea.
- **Prohibido:** stickers, emojis, brillantina, íconos de plantilla, flechas genéricas.

### 1.7 Sistema de puntuación (cada efecto tiene UNA función)
| Recurso | Significa | Dónde |
|---|---|---|
| Acercamiento seco ★ | "esto es importante" | Frases clave |
| **Blanco y negro** | momento íntimo / mamá | Solo en "como mamá también lo he sentido" |
| **Silencio musical 0,5 s** | remate | Antes de las 2 frases clave |
| **Destello cálido (light leak)** | cambio de bloque | 2 veces en todo el video |
| ✓ ocre / ✗ ocre | correcto / incorrecto | Lista final y baño frío |

### 1.8 Audio
**Voz (cadena):** reducción de ruido ligera → filtro paso-alto 80 Hz → corte de lo turbio 200–400 Hz si hace falta → presencia +2/+3 dB en 3–5 kHz → de-esser → compresión 3:1 suave → limitador.
**Master:** −14 LUFS integrado, pico máximo −1 dBTP.
**Música:** piano/ambient cálido con arco emocional (ver tabla de escenas). Mientras Tania habla, la música queda ~20–24 dB por debajo de la voz (mínimo 7 LU de diferencia); *ducking* de 6–12 dB, transiciones de 300–500 ms; sube levemente en pausas.
**SFX (firma sonora):** roce de lápiz/papel al dibujar; "pop" grave apagado al entrar títulos; whoosh grave suave en destellos; latido sordo (escena 3). Máx. 1 SFX cada ~3 s. Nada caricaturesco.

---

## 2. Escena por escena

Leyenda: **A** = toma de Tania · **Zona** = espacio sobre la cabeza · **Sub** = subtítulos · ★ = acercamiento

### Escena 1 — Gancho · 0:00–0:04
**Dice:** "No le des un baño de agua fría para la fiebre hasta que veas [esto]."
- **A:** 100 %. ★ en "hasta que veas".
- **Zona:** título apilado (sin subtítulos):
  ```
  NO le des un
  BAÑO de agua FRÍA     ← "FRÍA" en ocre
  para la fiebre
  ```
  Entra palabra por palabra con la voz.
- **Audio:** sin música; solo una nota/pad grave sostenido muy bajo (tensión). "Pop" grave al completar el título.
- **Objetivo:** frenar el scroll con la promesa completa en pantalla en < 3 s.
- ⚠️ Verificar con Whisper la palabra final ("esto"); la transcripción la corta.

### Escena 2 — La escena que toda mamá vivió · 0:04–0:09
**Dice:** "Lo cargas, le tocas la frente y está ardiendo."
- **A:** 100 %.
- **Zona:** 0:04–0:06,5 → **ventana de B-roll** (esquinas redondeadas 28 px, borde fino crema) con *mamá tocando la frente de su bebé*. 0:06,5–0:09 → la ventana sale y se **dibuja el termómetro**; el mercurio sube en ocre en "ardiendo", con 3 ondas de calor. Rótulo a mano: *ardiendo* (ocre). **Sin números en el termómetro.**
- **Sub:** lo cargas · le tocas · la frente · y está · **ardiendo** (ocre).
- **Audio:** entra el piano cálido, muy suave. Roce de lápiz en el termómetro.

### Escena 3 — El pánico · 0:09–0:14
**Dice:** "El corazón se te acelera inmediatamente y lo primero que piensas es: 'Tengo que bajarle la fiebre ya.'"
- **A:** 100 % → 104 %.
- **Zona:** se dibuja una **línea de latido** (electrocardiograma a mano) que se acelera. En "tengo que bajarle la fiebre ya" aparece esa frase **escrita a mano** (Caveat, blanco) = el pensamiento de la mamá; "YA" en ocre.
- **Sub:** el corazón · se te acelera · … (mientras aparece la frase a mano, sin subtítulo).
- **Audio:** dos latidos sordos (SFX) bajo la voz.

### Escena 4 — Autoridad + mamá · 0:14–0:18
**Dice:** "Ese es el miedo más común que veo en la consulta. Y créeme, como mamá también lo he sentido."
- **A:** 100 % en "en la consulta" → **★ + BLANCO Y NEGRO** en "como mamá también lo he sentido" (único B/N del video). Vuelve a color en la siguiente frase.
- **Zona:** en "consulta" se dibuja un **estetoscopio** pequeño. En el tramo B/N la zona queda **vacía** (el acercamiento la elimina): el momento es de Tania.
- **Sub:** el miedo · más común · en la **consulta** · … · como **mamá** · también · lo he sentido.
- **Audio:** la música baja aún más en el B/N (casi solo voz).

### Escena 5 — El error · 0:18–0:24
**Dice:** "Es por eso que tantos papás corren inmediatamente al baño pensando que tienen que bañarlo con agua fría,"
- **A:** 100 %.
- **Zona:** 0:18–0:21 → **ventana de B-roll**: *tina/bañera llenándose, mano probando el agua*. 0:21–0:24 → se **dibuja una tina** con gotas y un cubo de hielo; rótulo a mano *agua fría*.
- **Sub:** tantos papás · corren · al baño · con agua **fría**.
- **Audio:** la música gira a **tensión ligera**. Whoosh grave al entrar la ventana.

### Escena 6 — El giro (anticipación) · 0:24–0:31
**Dice:** "pero lo que está pasando dentro del cuerpo de tu bebé es muy distinto a lo que tú te imaginas, y entenderlo va a hacer que cambie todo lo que hagas después."
- **A:** 100 % → 104 % lento.
- **Zona:** la tina sale. Se dibuja el **contorno de un bebé** (simple, de frente) con un **"?"** grande en ocre en el pecho.
- **Sub:** lo que está pasando · **dentro** · de su cuerpo · es muy distinto · … · cambia **todo**.
- **Audio:** *riser* muy sutil que crece hacia la escena 7.

### Escena 7 — ★ FRASE CLAVE 1 · 0:31–0:35
**Dice:** "La fiebre no es el enemigo de tu hijo, es el cuerpo intentando defenderse."
- **A:** **★ acercamiento seco** en "la fiebre".
- **Antes:** **silencio musical de 0,5 s** justo antes de "la fiebre".
- **Zona:** título apilado (sin subtítulos):
  ```
  la
  FIEBRE          ← ocre
  no es el
  ENEMIGO
  ```
  + subrayado a mano en ocre bajo "ENEMIGO". En "es el cuerpo intentando defenderse" el título sale y se dibuja un **escudo** a mano.
- **Audio:** tras el silencio, entra un **acorde que resuelve** (mayor). "Pop" grave al completar el título.

### Escena 8 — Llega el virus · 0:35–0:40
**Dice:** "Cuando llega un virus a enfermar a tu hijo, su cuerpo empieza a liberar sustancias…"
- **A:** 100 % (vuelve de ★ con corte seco). **Destello cálido #1** al entrar a esta escena (cambio de bloque: "cómo funciona").
- **Zona:** se dibuja el **virus** (círculo con espículas) a la izquierda; rótulo *virus*. En "liberar sustancias" brotan **puntitos ocre** que se mueven hacia la derecha.
- **Sub:** cuando llega · un **virus** · su cuerpo · libera · sustancias.
- **Audio:** pulso ligero y curioso en la música. Lápiz en cada trazo.

### Escena 9 — La señal al cerebro · 0:40–0:48
**Dice:** "…que le envían la señal al cerebro de que es momento de empezar a defenderse, y entonces de manera natural el cuerpo…"
- **A:** 100 % → 104 %.
- **Zona:** los puntitos siguen una **flecha a mano** hasta un **cerebro** dibujado a la derecha; en "la señal" salen **ondas** ocre del cerebro. Rótulo *cerebro*.
- **Sub:** la **señal** · al cerebro · es momento · de **defenderse** · de manera · natural.

### Escena 10 — La fiebre trabajando · 0:48–0:53
**Dice:** "…sube su temperatura y eso va a hacer que los bichos se debiliten y sus defensas empiecen a trabajar mejor."
- **A:** 100 %.
- **Zona:** vuelve el **termómetro** (mismo dibujo de la escena 2): el mercurio sube en "sube su temperatura". Los **virus** se encogen y se desvanecen en "se debiliten"; aparecen **3 círculos de defensas** con ✓ ocre en "defensas… trabajar mejor".
- **Sub:** sube su **temperatura** · los bichos · se **debilitan** · sus defensas · trabajan **mejor**.
- ⚠️ Confirmar con Whisper "temperatura" (falta en la transcripción).

### Escena 11 — Por qué el baño frío empeora · 0:53–1:08
**Dice:** "Y el baño con agua fría no va a detener lo que está pasando dentro de su cuerpo, simplemente lo va a hacer que se sienta peor, que esté temblando, que esté incómodo, mientras que lo demás sigue sucediendo dentro de su cuerpo y su temperatura va a volver a subir."
- **A:** 100 % → ★ en "se sienta peor".
- **Zona (3 tiempos):**
  1. "el baño con agua fría no va a detener…" → vuelve la **tina** dibujada y se tacha con **✗ ocre**.
  2. "temblando… incómodo" → **contorno del bebé** con líneas de temblor a los lados.
  3. "su temperatura va a volver a subir" → **gráfica a mano** (sin números): línea que baja (baño) y **vuelve a subir**; la subida en ocre. Etiqueta pequeña *ilustrativo*.
- **Sub:** no va a **detener** · … · se siente **peor** · temblando · incómodo · … · vuelve a **subir**.
- **Audio:** vuelve la **tensión** ligera. SFX lápiz en ✗ y en la gráfica.

### Escena 12 — Lo que SÍ ayuda · 1:08–1:16
**Dice:** "¿Qué es lo que sí te va a ayudar? Vístelo con ropa ligera, mantenlo bien hidratado, observa cómo se comporta."
- **A:** 100 %. **Destello cálido #2** en "¿qué es lo que sí…" (cambio a la solución).
- **Zona:** título apilado breve (sin subtítulos): `¿qué SÍ` / `te va a ayudar?` ("SÍ" en ocre). Luego **lista dibujada**, un ítem por frase, cada uno con ícono a mano + ✓ ocre:
  1. dibujo de **camiseta ligera** — *ropa ligera*
  2. dibujo de **vaso de agua** — *hidratado*
  3. dibujo de **ojo** — *observa cómo se comporta*
- **Sub:** ropa **ligera** · bien **hidratado** · observa · cómo se **comporta**.
- **Audio:** la música **resuelve** a cálida (alivio). Un "tic" de lápiz por cada ✓.

### Escena 13 — ★ FRASE CLAVE 2 · 1:16–1:24
**Dice:** "El número en el termómetro no es lo que importa. Cómo se comporta tu hijo es lo que nos va a decir si realmente necesita ayuda de manera urgente."
- **A:** **★ acercamiento seco** en "el número".
- **Antes:** **silencio musical de 0,5 s**.
- **Zona:** el termómetro aparece pequeño y se **difumina/tacha** en "no es lo que importa". Título apilado:
  ```
  el NÚMERO
  no importa
  CÓMO SE COMPORTA     ← ocre
  sí
  ```
- **Sub:** (oculto durante el título) → si realmente · necesita ayuda · **urgente**.
- **Audio:** acorde cálido tras el silencio.

### Escena 14 — Cierre / CTA · 1:24–1:28
**Dice:** "Guarda este video para la próxima vez que toques la frente de tu bebé y entres en pánico."
- **A:** 100 %, plano estable (sin efectos: cierre limpio).
- **Zona:** se dibuja el **ícono de guardar** de Instagram (marcador) en ocre + texto a mano *guárdalo*.
- **Sub:** **guarda** · este video · la próxima vez · toques su frente · y entres · en pánico.
- **Audio:** la música **sube** para cerrar y termina en la última palabra. Sin outro de marca.
- **Loop:** el final ("…entres en pánico") conecta con el inicio ("No le des un baño…"): cortar seco al terminar la palabra para que el loop sea natural.

---

## 3. Recursos a conseguir

### 3.1 B-roll (solo 2 tomas; todo lo demás es dibujo)
| Escena | Búsqueda (Artlist / Pexels) | Duración |
|---|---|---|
| 2 | `mother touching baby forehead fever`, `mom checking baby temperature hand` | 2,5 s |
| 5 | `bathtub filling water`, `hand testing bath water temperature` | 3 s |
Criterio: luz cálida, sin caras de bebés llorando de forma dramática, look coherente con el color de Tania.

### 3.2 Música (Artlist/Epidemic)
Buscar: `emotional piano warm`, `soft ambient hopeful`, `gentle piano tension`. Ideal: **una pista con sección tensa y sección que resuelve**, o dos pistas del mismo autor/álbum (tensión + calidez) para cruzarlas. Tempo lento-medio, sin voces.

### 3.3 SFX
`pencil scratch paper` (varios cortos), `soft low whoosh`, `muted pop low`, `heartbeat soft`, `pencil tick`.

### 3.4 Ilustraciones a dibujar (SVG, mismo trazo)
termómetro · ondas de calor · línea de latido · estetoscopio · tina + gotas + hielo · contorno de bebé · "?" · escudo · virus · puntitos/sustancias · flecha · cerebro + ondas · círculos de defensas · ✓ · ✗ · gráfica baja-sube · camiseta · vaso de agua · ojo · ícono guardar.

---

## 4. Mapa del arco musical

| Tiempo | Escena | Música |
|---|---|---|
| 0:00–0:04 | Gancho | Pad grave, casi silencio |
| 0:04–0:18 | Escena + pánico + mamá | Piano cálido suave (baja más en el B/N) |
| 0:18–0:31 | El error + giro | Tensión ligera + riser |
| 0:31 | ★ Frase clave 1 | **Silencio 0,5 s → acorde que resuelve** |
| 0:35–0:53 | Cómo funciona | Pulso ligero, curioso |
| 0:53–1:08 | Baño frío empeora | Tensión ligera |
| 1:08–1:16 | Qué sí hacer | Resolución cálida |
| 1:16 | ★ Frase clave 2 | **Silencio 0,5 s → acorde cálido** |
| 1:24–1:28 | CTA | Sube y cierra en la última palabra |

---

## 5. Control de calidad antes de entregar
- [ ] Voz a velocidad natural; sin silencios largos; sin tomas repetidas.
- [ ] Color corregido; piel natural; grano y viñeta sutiles.
- [ ] Nada importante en las franjas seguras de Instagram; el rostro nunca cubierto.
- [ ] Cada dibujo aparece en la palabra que lo nombra (verificado con Whisper).
- [ ] Ningún número médico inventado (termómetro y gráfica sin cifras).
- [ ] Un solo B/N; dos destellos; dos silencios musicales.
- [ ] Subtítulos 1–2 palabras, sin contorno; ocre solo en palabras clave.
- [ ] −14 LUFS, pico ≤ −1 dBTP; la música nunca compite con la voz (revisar en celular con y sin audífonos).
- [ ] Ver el video completo en el celular antes de publicar.
