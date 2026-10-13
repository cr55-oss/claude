# Ejemplo del modelo clínico: cómo cada habla se convirtió en un efecto

El video es `exemplo.mp4` y la hoja `quadros.jpg` muestra un cuadro de cada momento abajo, en el mismo orden.
**Usa como referencia de estilo, no de tema:** el video del usuario puede hablar de cualquier cosa. Repara en qué bloques usa el ejemplo, en qué orden, cuánto tiempo dura cada uno y cómo el habla se convierte en texto corto en la pantalla, y haz lo mismo con el habla del usuario.

## 1. `titulo` (bloque propio del modelo): 0.00–2.63 s
Habla: "¿Te cepillas los dientes de la forma correcta?"

```json
{"linhas": ["Você escova", "os dentes do", "jeito certo?"], "enfase": "jeito certo?", "duvidaEm": 1.76}
```

## 2. `contagem` (bloque propio del modelo): 2.63–5.27 s
Habla: "Casi todo mundo se equivoca en tres cosas:"

```json
{"titulo": "Quase todo mundo erra em 3 coisas", "enfase": "3 coisas", "itens": [{"em": 4.29}, {"em": 4.43}, {"em": 4.57}], "marca": {"em": 4.73, "tipo": "errado"}}
```

## 3. `cronometro` (firma): 5.27–8.29 s
Habla: "Primero, se cepilla por menos de dos minutos"

```json
{"numero": "01", "titulo": "Escova por menos de 2 minutos", "enfase": "menos de 2 minutos", "meta": "2:00", "metaEm": 7.39, "inicio": 6.04, "para": {"em": 6.79, "fracao": 0.42}}
```

## 4. `anatomia` (firma): 8.29–12.12 s
Habla: "Aprieta demasiado, y eso lastima la encía."

```json
{"numero": "02", "titulo": "Aperta demais", "enfase": "demais", "desenho": "dente", "acoes": [{"em": 8.61, "acao": "escova"}, {"em": 9.31, "acao": "pressao"}, {"em": 10.76, "acao": "inflama"}], "rotulos": [{"em": 10.98, "alvo": "gengiva", "texto": "gengiva", "erro": true}], "veredito": {"em": 10.79, "tipo": "errado", "texto": "Machuca a gengiva"}}
```

## 5. `anatomia` (firma): 12.12–16.54 s
Habla: "Tercero, se olvida del hilo dental y el cepillo no llega entre los dientes"

```json
{"layout": "lado", "numero": "03", "titulo": "Esquece o fio dental", "enfase": "fio dental", "desenho": "dentes", "acoes": [{"em": 13.02, "acao": "esquecido"}, {"em": 14.44, "acao": "varre"}, {"em": 15.19, "acao": "lacunas"}], "rotulos": [{"em": 15.61, "alvo": "entre", "texto": "entre os dentes", "erro": true}], "aproximar": {"em": 15.54, "alvo": "entre", "zoom": 2.2}, "veredito": {"em": 14.98, "tipo": "errado", "texto": "A escova não chega"}}
```

## 6. `checklist` (bloque propio del modelo): 16.54–21.36 s
Habla: "Lo correcto es dos minutos, movimiento suave e hilo dental todo día."

```json
{"titulo": "O certo", "marcaEm": 16.93, "itens": [{"em": 17.19, "texto": "2 minutos", "icone": "cronometro"}, {"em": 18.46, "texto": "Movimento leve", "icone": "escova"}, {"em": 19.66, "texto": "Fio dental todo dia", "icone": "fio", "semanaEm": 20.62}]}
```

## 7. `cta` (bloque universal): 21.36–24.44 s
Habla: "Guarda este video y mándalo a quien necesita escuchar esto."

```json
{"texto": "Salva esse vídeo e manda para quem precisa ouvir isso", "enfase": "precisa ouvir isso", "botoes": [{"em": 21.4, "icone": "salvar"}, {"em": 22.24, "icone": "enviar"}], "assinaturaEm": 22.93}
```
