# Plantilla de desglose — `biblioteca/reels/<id>.md`

Copia esta estructura tal cual. Los datos que no conseguiste van como `null`, nunca estimados.

```markdown
---
id: ig-abc123
url: https://www.instagram.com/reel/ABC123/
plataforma: instagram
creador: "@handle"
idioma: es
publicado: 2026-10-01
analizado: 2026-10-12
fuente: vidiq            # vidiq | supadata | modo-ligero
visual: si               # no = sin línea de tiempo visual (no se vio el video)
vistas: 812000
likes: 41000
comentarios: 900
compartidos: null
duracion_s: 42
seguidores: 63000
mediana_creador: 95000
outlier: 8.5
engagement: 0.051
sospechoso: false
pasa_filtro: si          # si | no (motivo en el cuerpo)
pilar: Seguridad
nivel_conciencia: N2
estructura: Charlie
tema_plan: 9             # número de fila del plan vigente, o null
tipo_gancho: miedo específico
---

# @handle — <tema en pocas palabras>

**Lección:** <una línea>

## Números
| Vistas | Likes | Coment. | Compart. | Seguidores | Mediana creador | Outlier | Engagement |
|---|---|---|---|---|---|---|---|

**Filtro de Tania:** ✅/❌ vistas · ✅/❌ seguidores · ✅/❌ duración/formato — <nota>

## Gancho
- **Frase (0-3 s):** "<texto exacto>"
- **Palabras / segundos:** N / N s
- **Tipo:** …
- **Arranca de:** dolor del papá/mamá | dato clínico
- **Por qué funciona:** …
- **Palabras de poder:** …
- **Plantilla reutilizable:** "…"

## Formato
- **Estilo:** …
- **Ritmo:** N cortes/s
- **Por qué encaja:** …

## Ángulo
- **Tema:** …
- **Lo que cree la mayoría:** …
- **Lo que dice el reel:** …
- **Payoff revelado en:** N s (N % del video)

## Clasificación Tania
- **Pilar:** … · **Nivel:** N… · **Estructura recomendada:** … — <por qué>
- **Tema del plan vigente:** fila N / ninguno

## Línea de tiempo visual
| Seg. | Qué se ve | Texto en pantalla | Qué hace por la retención |
|---|---|---|---|

## Scroll stoppers
1. **N s** — …

## Transcripción
| Seg. | Texto |
|---|---|
```

## Fila para `biblioteca/INDICE.md`

```
| 2026-10-12 | [ig-abc123](reels/ig-abc123.md) | 🔍 Analizado | Telegram | Tania | cólicos, mira el gancho | @handle | 8.5x | Seguridad | Charlie | <lección en una línea> |
```
