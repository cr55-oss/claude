# Ganchos visuales y acciones físicas

Tania a veces usa acciones como gancho o como apoyo: echar hielo a la bañera, sacar objetos de debajo de la mesa, mostrar algo a cámara. Si la edición no las detecta, se tapan con texto o se cortan mal y se pierde el mejor momento. **Esto se analiza en cada video; el tratamiento se decide viendo el material, no por receta.**

## 1. Detección (Fase 1)
| Señal | Cómo | Indica |
|---|---|---|
| Movimiento | diferencia entre cuadros consecutivos cada ~0,1 s, **fuera del área del rostro** | gesto grande: lanzar, sacar, mostrar |
| Sonido que no es voz | picos/onsets entre palabras de Whisper, energía alta en 2–8 kHz | impacto: hielo, agua, golpe, objeto |
| Huecos de voz con movimiento | intervalos sin palabras + movimiento alto | acción muda (candidata a abrir el video o a cámara lenta) |
| Cambio de toma | detector de escena de ffmpeg (`scdet`) | corte o cambio de plano |

**Confirmación visual obligatoria:** extrae un cuadro cada 0,2 s en los primeros 6 s y alrededor (±1 s) de cada pico. Míralos y describe: objeto, gesto, **cuadro cumbre** (impacto, primer momento en que el objeto se ve completo), zona de pantalla, y si Tania habla encima.

Registro en `work/eventos.json`:
`{ tipo: "impacto"|"revelacion"|"demostracion", objeto, inicio, cumbre, fin, zona: {x,y,w,h}, palabrasEncima: [...] }`

## 2. Preguntas que te haces (Fase 2–4)
- ¿La acción es más fuerte que la primera frase? → ¿debe abrir el video?
- ¿Habla encima de la acción? → la voz manda: sin cámara lenta, sin reordenar.
- ¿En qué palabra cae la cumbre? → ahí va el ★ y, si conviene, el remate del texto.
- ¿Dónde ocurre en pantalla? → los gráficos se mueven al área libre.
- ¿Se oye bien el sonido de la acción? → reforzar o no.
- ¿Fue intencional? Si dudas, pregúntalo en la Fase 3.

## 3. Criterios de tratamiento (punto de partida, no regla)
**Impacto** (hielo a la bañera, golpe):
- Primer cuadro ya en movimiento; nada muerto antes.
- Tensión antes de la cumbre con sonido: casi silencio + riser grave sutil.
- ★ acercamiento seco en el cuadro cumbre.
- El sonido de la acción se escucha: real aislado o SFX reforzado (`ice cubes dropping in water`, `ice splash`), en el hueco de voz más cercano o por debajo de la voz si habla encima.
- Si **no** habla durante la acción: se puede abrir el video con ella (cold open) y/o cámara lenta al 50 % ~0,4 s en la cumbre.
- Texto **después** de la cumbre, fuera de la zona de acción; una ✗ o ✓ dibujada a mano puede caer sobre el objeto.

**Revelación** (saca un objeto de debajo de la mesa):
- Whoosh grave al subir el objeto; ★ acercamiento al objeto en la cumbre.
- Círculo o flecha **dibujados a mano** señalando el objeto + rótulo a mano con su nombre.
- El nombre del objeto en ocre en el subtítulo.

**Demostración** (muestra cómo se hace algo):
- Sin acercamientos bruscos; nada tapa las manos.
- Dibujos guía (flechas, pasos numerados) en la zona libre.

## 4. Lo fijo
- La zona de la acción no se cubre mientras ocurre.
- El texto responde a la acción; no la anticipa.
- Toda acción detectada se reporta en el plan con la propuesta de tratamiento para que el usuario la apruebe.
