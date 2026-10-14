// Busca B-roll en Pexels (y Pixabay si hay clave), baja miniaturas y cuadros de muestra
// para que Claude los mire y elija, y descarga el clip elegido.
//
// Requisitos: Node 18+ y la variable PEXELS_API_KEY (gratis en pexels.com/api).
// Opcional: PIXABAY_API_KEY (gratis en pixabay.com/api/docs).
//
// Buscar:    node buscar-broll.mjs buscar --slot escena2 --q "mother touching baby forehead" [--n 8] [--out work/broll]
// Descargar: node buscar-broll.mjs bajar --slot escena2 --id pexels-123456 [--out work/broll]
//
// Resultado de "buscar": <out>/<slot>/candidatos.json + una carpeta por candidato con
// miniatura y cuadros de muestra (JPG) para revisarlos visualmente.
import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const cmd = args[0];
const opt = (name, def) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] && !args[i + 1].startsWith("--") ? args[i + 1] : def;
};
const slot = opt("slot");
const out = path.resolve(opt("out", "work/broll"), slot ?? "");
if (!cmd || !slot) {
  console.error('Uso: node buscar-broll.mjs buscar --slot <nombre> --q "<búsqueda en inglés>" [--n 8]\n     node buscar-broll.mjs bajar --slot <nombre> --id <id>');
  process.exit(1);
}

const bajarArchivo = async (url, destino, headers = {}) => {
  const r = await fetch(url, { headers });
  if (!r.ok) throw new Error(`HTTP ${r.status} al bajar ${url}`);
  writeFileSync(destino, Buffer.from(await r.arrayBuffer()));
};

async function pexels(q, n) {
  const key = process.env.PEXELS_API_KEY;
  if (!key) { console.warn("Sin PEXELS_API_KEY: se omite Pexels."); return []; }
  const u = `https://api.pexels.com/videos/search?query=${encodeURIComponent(q)}&per_page=${n}&size=medium`;
  const r = await fetch(u, { headers: { Authorization: key } });
  if (!r.ok) throw new Error(`Pexels respondió ${r.status}`);
  const d = await r.json();
  return d.videos.map((v) => {
    const archivos = v.video_files
      .filter((f) => f.file_type === "video/mp4")
      .sort((a, b) => (b.height ?? 0) - (a.height ?? 0));
    const mejor = archivos.find((f) => Math.min(f.width, f.height) >= 1080) ?? archivos[0];
    return {
      id: `pexels-${v.id}`,
      fuente: "Pexels",
      pagina: v.url,
      autor: v.user?.name,
      ancho: v.width, alto: v.height, duracion: v.duration,
      vertical: v.height > v.width,
      miniatura: v.image,
      cuadros: (v.video_pictures ?? []).map((p) => p.picture).filter((_, i, a) => i % Math.ceil(a.length / 4 || 1) === 0).slice(0, 4),
      descarga: mejor?.link,
      descargaCalidad: mejor ? `${mejor.width}x${mejor.height}` : null,
      licencia: "Pexels License (uso comercial permitido, sin atribución obligatoria)",
    };
  });
}

async function pixabay(q, n) {
  const key = process.env.PIXABAY_API_KEY;
  if (!key) return [];
  const u = `https://pixabay.com/api/videos/?key=${key}&q=${encodeURIComponent(q)}&per_page=${Math.max(3, n)}&safesearch=true`;
  const r = await fetch(u);
  if (!r.ok) throw new Error(`Pixabay respondió ${r.status}`);
  const d = await r.json();
  return d.hits.map((h) => {
    const v = h.videos.large?.url ? h.videos.large : h.videos.medium;
    return {
      id: `pixabay-${h.id}`,
      fuente: "Pixabay",
      pagina: h.pageURL,
      autor: h.user,
      ancho: v.width, alto: v.height, duracion: h.duration,
      vertical: v.height > v.width,
      miniatura: v.thumbnail,
      cuadros: [],
      descarga: v.url,
      descargaCalidad: `${v.width}x${v.height}`,
      licencia: "Pixabay Content License (uso comercial permitido)",
    };
  });
}

if (cmd === "buscar") {
  const q = opt("q");
  const n = Number(opt("n", 8));
  if (!q) { console.error("Falta --q"); process.exit(1); }
  mkdirSync(out, { recursive: true });
  const candidatos = [...(await pexels(q, n)), ...(await pixabay(q, Math.ceil(n / 2)))];
  for (const c of candidatos) {
    const dir = path.join(out, c.id);
    mkdirSync(dir, { recursive: true });
    const imgs = [c.miniatura, ...c.cuadros].filter(Boolean);
    c.imagenesLocales = [];
    for (const [i, url] of imgs.entries()) {
      const f = path.join(dir, `${i === 0 ? "miniatura" : `cuadro-${i}`}.jpg`);
      try { await bajarArchivo(url, f); c.imagenesLocales.push(path.relative(process.cwd(), f)); } catch (e) { console.warn(`  no se pudo bajar ${url}: ${e.message}`); }
    }
  }
  writeFileSync(path.join(out, "candidatos.json"), JSON.stringify({ slot, busqueda: q, candidatos }, null, 2));
  console.log(`${candidatos.length} candidatos para "${q}" → ${path.relative(process.cwd(), out)}/`);
  for (const c of candidatos) console.log(`  ${c.id}  ${c.fuente}  ${c.ancho}x${c.alto}  ${c.duracion}s${c.vertical ? "  vertical" : ""}  ${c.pagina}`);
  console.log("Mira las imágenes de cada carpeta y elige con los criterios de references/recursos.md.");
} else if (cmd === "bajar") {
  const id = opt("id");
  const lista = path.join(out, "candidatos.json");
  if (!id || !existsSync(lista)) { console.error("Falta --id o no existe candidatos.json (corre 'buscar' primero)."); process.exit(1); }
  const c = JSON.parse(readFileSync(lista, "utf8")).candidatos.find((x) => x.id === id);
  if (!c?.descarga) { console.error(`No encontré ${id} en ${lista}`); process.exit(1); }
  const destino = path.join(out, `${slot}-${id}.mp4`);
  await bajarArchivo(c.descarga, destino);
  writeFileSync(path.join(out, `${slot}-${id}.creditos.txt`), `${c.fuente} · ${c.autor ?? ""} · ${c.pagina}\n${c.licencia}\n`);
  console.log(`Descargado: ${path.relative(process.cwd(), destino)} (${c.descargaCalidad})`);
} else {
  console.error(`Comando desconocido: ${cmd}`);
  process.exit(1);
}
