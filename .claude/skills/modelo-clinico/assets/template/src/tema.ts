import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";
import { larguraPalavra, larguraTexto, type Peso, quebrarLinhas } from "./medida";

// Figtree: sans humanista, aberta e legível no celular. Uma família só, em pesos diferentes.
// Os arquivos vêm junto do projeto (public/fontes, licença OFL): o render não depende do Google
// Fonts, então funciona também em ambientes sem acesso a ele (sessões na nuvem, máquinas offline).
const LATIN = "U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD";
const LATIN_EXT = "U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF";
for (const peso of ["400", "500", "600", "700", "800"]) {
  for (const [subset, unicodeRange] of [["latin", LATIN], ["latin-ext", LATIN_EXT]]) {
    loadFont({ family: "Figtree", url: staticFile(`fontes/figtree-${subset}-${peso}-normal.woff2`), weight: peso, format: "woff2", unicodeRange });
  }
}
export const sans = "Figtree";

// Consultório: branco, um azul clínico profundo, cinzas suaves. O vermelho só aparece no que está errado.
export const cor = {
  // fundo da área de exame (branco levemente frio) e branco puro dos cartões e da névoa
  fundo: "#F3F6FA",
  branco: "#FFFFFF",
  // texto principal (azul quase preto) e o azul clínico dos traços, números e acertos
  tinta: "#0E2445",
  azul: "#1A4E9A",
  // azul diluído: preenchimentos dos desenhos (dentina, polpa) e anéis de fundo
  azulClaro: "#DCE6F4",
  azulVeu: "rgba(26,78,154,0.07)",
  // cinzas: texto secundário, linhas de apoio, tecidos neutros (gengiva, osso)
  cinza: "#6E7B8F",
  cinzaLinha: "#AEB8C6",
  cinzaClaro: "#DDE3EA",
  tecido: "#E8ECF2",
  // "a lápis": o lugar de algo que ainda vai ser dito
  lapis: "#CCD4DF",
  // o erro: marca ✗, gengiva machucada, o que a escova não alcança
  vermelho: "#CC3F36",
  vermelhoVeu: "#F7DCD8",
};

// Espessuras de traço (px no quadro 1080×1920), pensadas para a tela do celular
export const traco = { forte: 5, medio: 3.5, fino: 2.5 };

// Corpo dos rótulos de atlas dentro dos desenhos (legível no celular)
export const ROTULO = 52;

// Legenda (quando aparece) e limite da interface do aplicativo
export const LEGENDA_Y = 1452;
export const LIMITE_APP = 1560;
export const MARGEM = 70;

// Área padrão do texto em tela cheia (abaixo do queixo). O plano pode mover com `zona`.
export const zona = { esquerda: 70, direita: 70, topo: 960, altura: 470 };

// Medidas de texto com as larguras reais da Figtree (medida.ts): o corpo que cabe e o número de linhas.
// `peso` padrão 700 (títulos da lupa, listas); a abertura usa 800.
export const caber = (texto: string, largura: number, maximo: number, minimo = 0, peso: Peso = 800) => {
  for (let s = maximo; s > minimo; s -= 2) if (larguraTexto(texto, s, peso, -0.02) <= largura) return s;
  return minimo;
};

// Quantas linhas um texto ocupa numa largura, quebrando nas palavras
export const linhasDoTexto = (texto: string, largura: number, tamanho: number, peso: Peso = 700) => {
  const palavras = texto.split(/\s+/).filter(Boolean);
  if (palavras.some((w) => larguraPalavra(w, tamanho, peso, -0.015) > largura)) return 99;
  return quebrarLinhas(texto, largura, tamanho, peso, -0.015).length;
};

// Maior corpo (entre `minimo` e `maximo`) em que o texto cabe em `maxLinhas` linhas
export const ajustarTitulo = (texto: string, largura: number, maxLinhas: number, maximo: number, minimo: number, peso: Peso = 700) => {
  for (let s = maximo; s > minimo; s -= 2) if (linhasDoTexto(texto, largura, s, peso) <= maxLinhas) return s;
  return minimo;
};
