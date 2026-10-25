# Fotos del Google Drive de Tania

El agente elige las fotos de las historias desde el Drive que Tania conecta a su Claude. Para
que elija bien, el Drive tiene que estar **ordenado**: el agente encuentra las fotos por carpeta
y por nombre de archivo, y no siempre puede ver la imagen.

## Estructura recomendada (Tania la arma una vez)

```
Historias Tania/
├── 01-consultorio/        bata, escritorio, revisando (SIN pacientes identificables)
├── 02-hospital/           pasillos, UCIN por fuera, guardia (autoridad discreta)
├── 03-casa-mama/          cocina, sala, momentos de mamá
├── 04-hija/               solo las que Tania aprobó publicar (manos, espalda, como ella decida)
├── 05-comida-ac/          platos, cortes por edad, silla, babero, desastres de comida
├── 06-lifestyle/          café, trayecto, congreso, lectura (natural, sin lujo)
├── 07-antes-ahora/        fotos con el AÑO en el nombre (residente, embarazo, primeriza…)
├── 08-capturas-curso/     temario completo y lecciones por módulo
├── 09-testimonios/        mensajes de mamás o alumnas CON permiso, sin nombre ni foto
└── registro-historias     (documento opcional: qué se subió cada día y las vistas)
```

## Nombres de archivo

Formato: `lugar_accion_emocion_año.jpg`. Ejemplos:
- `consultorio_escribiendo_concentrada_2026.jpg`
- `cocina_hija-tira-brocoli_risa_2026.jpg`
- `residencia_guardia_cansada_2016.jpg`
- `curso_m3_arcadas-vs-atragantamiento.png`

Si los nombres son genéricos (`IMG_4532.jpg`), el agente solo puede elegir por carpeta: lo
avisa y le pide a Tania que revise la foto.

## Cómo elige el agente

1. Por cada historia, define qué tiene que mostrar (lugar, acción, emoción) según el formato
   y el bloque (gancho, humor, valor, prueba, CTA).
2. Busca primero en la subcarpeta que corresponde y después por palabras del nombre.
3. **Si puede ver la imagen**, revisa:
   - luz y nitidez (sin foto oscura ni movida);
   - espacio libre para el texto (arriba o abajo);
   - **que no haya pacientes, expedientes ni pantallas con datos**;
   - que la emoción encaje con el bloque (humor ≠ foto seria; reflexión ≠ foto de fiesta).
4. **Si no puede verla**, elige por carpeta y nombre y marca: `(revísala antes de subir)`.
5. Entrega por historia: **nombre + link + por qué** y **1 alternativa**.
6. **No repite** la misma foto dentro de la serie. Si existe el `registro-historias`, evita las
   fotos usadas en los últimos 7 días.
7. Si no hay foto adecuada: propone **grabar** (video corto) o usar **fondo liso** con texto.
   Nunca fuerza una foto que no encaja.

## Qué formatos salen del Drive y cuáles se graban el día

| Del Drive (foto) | Se graba ese día (video) |
|---|---|
| Foto con texto, paparazzi, ambiente u objeto, layout, antes/ahora, capturas, testimonios | Selfie hablando, POV con lente 0.5 (cortar, servir, armar el plato), vlog caminando, b-roll, espejo |

Regla: **al menos 2-3 videos por serie**. El agente le dice a Tania exactamente qué grabar
("POV cortando un plátano en bastones, 10 segundos, desde arriba").

## Registro (opcional pero recomendado)

Si Tania crea el documento `registro-historias` en la carpeta, el agente puede proponer al final
de cada serie una línea para anotar: fecha · modo · fotos usadas · vistas de la historia 1 ·
vistas de la última · respuestas o palabras clave recibidas. Escribir en el Drive **solo con su
confirmación**.
