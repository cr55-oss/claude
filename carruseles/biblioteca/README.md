# Biblioteca de carruseles

Aquí vive el criterio acumulado: carruseles de referencia (de otras cuentas) y carruseles propios
de Tania ya publicados. El `editor-carruseles` la consulta antes de diseñar cada arco para usar
**estructuras validadas**, y el `revisor-carruseles` la usa para detectar si se están reciclando
frases de otro carrusel (error fatal "mezclar carruseles").

## Carpetas

- `referencias/` — carruseles de otras cuentas que el usuario guardó porque funcionaron o le
  gustaron.
- `propios/` — carruseles de Tania ya publicados. Son los más valiosos: tienen métricas reales de
  la cuenta.

## Un archivo por carrusel

Nombre: `AAAA-MM-DD-tema-corto.md` (fecha en que se guardó o se publicó). Copiar el formato de
`_plantilla.md`.

## Cómo se usa

- **Para buscar estructuras:** filtrar por `tipo`, `rama` y `gancho`; preferir los que tengan
  mejor `conv` (seguidores por 1,000 views).
- **Se roba la estructura, nunca las frases.**
- Cuando un carrusel propio tenga métricas, actualizar también
  `.claude/skills/adaptar-carrusel-tania/references/datos-conversion.md` si cambia alguna lección.
