#!/usr/bin/env node
// Bandeja de Telegram para la biblioteca de reels de la Dra. Tania.
// Sin dependencias: usa curl (respeta el proxy del entorno) y lee el token de TELEGRAM_BOT_TOKEN.
//
//   node scripts/telegram.mjs pull [--file updates.json]   -> JSON con los links nuevos y las marcas "adaptar"
//   node scripts/telegram.mjs ack <ultimo_update_id>        -> confirma a Telegram que ya se guardaron
//   node scripts/telegram.mjs send --text-file <archivo> [--chat <id>]
//
// Orden seguro: pull -> guardar en biblioteca -> commit + push -> ack.
// Telegram guarda los mensajes no confirmados 24 h; si algo falla antes del ack, la próxima corrida los vuelve a leer.

import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

const USAGE = `Uso:
  node scripts/telegram.mjs pull [--file updates.json]
  node scripts/telegram.mjs ack <ultimo_update_id>
  node scripts/telegram.mjs send --text-file <archivo> [--chat <id>]

Variables: TELEGRAM_BOT_TOKEN (obligatoria), TELEGRAM_CHAT_ID (opcional, ids separados por coma:
solo se leen y se escriben esos chats).`;

const ADAPTAR = /(?<!\p{L})(adaptar|adapta|me gusta|este s[ií]|gui[oó]n)(?!\p{L})|✅|👍/iu;

function die(msg, code = 2) {
  console.error(msg);
  process.exit(code);
}

function token() {
  const t = process.env.TELEGRAM_BOT_TOKEN;
  if (!t) die("Falta TELEGRAM_BOT_TOKEN. Guárdalo en la configuración del entorno (no en el chat) y abre una sesión nueva.");
  return t;
}

function allowedChats() {
  const raw = process.env.TELEGRAM_CHAT_ID;
  return raw ? new Set(raw.split(",").map((s) => s.trim()).filter(Boolean)) : null;
}

// El token va por stdin (curl -K -) para que no aparezca en la lista de procesos.
function api(method, params = {}) {
  const config = [
    `url = "https://api.telegram.org/bot${token()}/${method}"`,
    `header = "Content-Type: application/json"`,
    `data = ${JSON.stringify(JSON.stringify(params))}`,
  ].join("\n");
  let out;
  try {
    out = execFileSync("curl", ["-sS", "--max-time", "60", "-K", "-"], { input: config, encoding: "utf8" });
  } catch (e) {
    die(`No se pudo conectar con Telegram (${(e.stderr || e.message).trim()}). Si dice 403, falta permitir api.telegram.org en la red del entorno.`);
  }
  let res;
  try {
    res = JSON.parse(out);
  } catch {
    die(`Respuesta inesperada de Telegram: ${out.slice(0, 200)}`);
  }
  if (!res.ok) die(`Telegram respondió error ${res.error_code}: ${res.description}`);
  return res.result;
}

// Reels de Instagram, TikTok y YouTube Shorts -> { id, url }. Mismos ids que usa la biblioteca.
export function parseReelUrls(text) {
  if (!text) return [];
  const found = [];
  for (const m of text.matchAll(/https?:\/\/[^\s<>"')\]]+/gi)) {
    let u;
    try {
      u = new URL(m[0]);
    } catch {
      continue;
    }
    const host = u.hostname.replace(/^(www\.|m\.)/, "").toLowerCase();
    const parts = u.pathname.split("/").filter(Boolean);
    let reel = null;
    if (host === "instagram.com") {
      const i = parts.findIndex((p) => ["reel", "reels", "p", "tv"].includes(p));
      if (i >= 0 && parts[i + 1]) reel = { id: `ig-${parts[i + 1].toLowerCase()}`, url: `https://www.instagram.com/reel/${parts[i + 1]}/` };
    } else if (host === "tiktok.com") {
      const i = parts.indexOf("video");
      if (i >= 0 && /^\d+$/.test(parts[i + 1] || "")) reel = { id: `tt-${parts[i + 1]}`, url: `https://www.tiktok.com/${parts[0]}/video/${parts[i + 1]}` };
      else if (parts[0] === "t" && parts[1]) reel = { id: `tt-corto-${parts[1].toLowerCase()}`, url: u.origin + u.pathname, corto: true };
    } else if (host === "vm.tiktok.com" || host === "vt.tiktok.com") {
      if (parts[0]) reel = { id: `tt-corto-${parts[0].toLowerCase()}`, url: `https://${host}/${parts[0]}/`, corto: true };
    } else if (host === "youtube.com" && parts[0] === "shorts" && parts[1]) {
      reel = { id: `yt-${parts[1].toLowerCase()}`, url: `https://www.youtube.com/shorts/${parts[1]}` };
    }
    if (reel && !found.some((r) => r.id === reel.id)) found.push(reel);
  }
  return found;
}

function textOf(msg) {
  return [msg?.text, msg?.caption].filter(Boolean).join("\n");
}

export function summarize(updates, allowed) {
  const links = [];
  const adaptar = [];
  const chats = new Set();
  let last = null;
  for (const up of updates) {
    last = Math.max(last ?? 0, up.update_id);
    const msg = up.message || up.channel_post || up.edited_message || up.edited_channel_post;
    if (!msg) continue;
    const chatId = String(msg.chat?.id);
    if (allowed && !allowed.has(chatId)) continue;
    chats.add(chatId);
    const text = textOf(msg);
    const own = parseReelUrls(text);
    const from = msg.from ? [msg.from.first_name, msg.from.last_name].filter(Boolean).join(" ") : msg.author_signature || msg.chat?.title || null;
    const date = new Date(msg.date * 1000).toISOString().slice(0, 10);
    const note = text.replace(/https?:\/\/\S+/g, "").replace(/\s+/g, " ").trim() || null;
    const marked = ADAPTAR.test(note || "");

    for (const r of own) links.push({ ...r, de: from, fecha: date, nota: note, chat_id: chatId, message_id: msg.message_id });

    // "Adaptar": el mensaje trae link + la palabra, o responde a un mensaje que tenía link.
    if (marked) {
      const targets = own.length ? own : parseReelUrls(textOf(msg.reply_to_message));
      for (const r of targets) adaptar.push({ ...r, pedido_por: from, fecha: date, nota: note, chat_id: chatId, message_id: msg.message_id });
    }
  }
  return { ultimo_update_id: last, chats: [...chats], links, adaptar };
}

function flag(args, name) {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
}

function main() {
  const [cmd, ...args] = process.argv.slice(2);
  if (!cmd || cmd === "--help" || cmd === "-h") {
    console.log(USAGE);
    process.exit(cmd ? 0 : 2);
  }
  if (cmd === "pull") {
    const file = flag(args, "--file");
    const updates = file
      ? JSON.parse(readFileSync(file, "utf8")).result ?? JSON.parse(readFileSync(file, "utf8"))
      : api("getUpdates", { timeout: 0, allowed_updates: ["message", "channel_post", "edited_message", "edited_channel_post"] });
    console.log(JSON.stringify(summarize(updates, allowedChats()), null, 2));
  } else if (cmd === "ack") {
    const id = Number(args[0]);
    if (!Number.isInteger(id)) die("ack necesita el ultimo_update_id que devolvió pull.");
    api("getUpdates", { offset: id + 1, limit: 1, timeout: 0 });
    console.log(`Confirmado hasta el update ${id}.`);
  } else if (cmd === "send") {
    const file = flag(args, "--text-file");
    if (!file) die("send necesita --text-file <archivo>.");
    const allowed = allowedChats();
    const chat = flag(args, "--chat") ?? (allowed ? [...allowed][0] : undefined);
    if (!chat) die("Falta el chat: pasa --chat <id> o define TELEGRAM_CHAT_ID.");
    if (allowed && !allowed.has(String(chat))) die(`El chat ${chat} no está en TELEGRAM_CHAT_ID.`);
    const text = readFileSync(file, "utf8").trim();
    // Telegram corta a 4096 caracteres: parte por párrafos.
    const chunks = [];
    let cur = "";
    for (const para of text.split(/\n{2,}/)) {
      if ((cur + "\n\n" + para).length > 3900 && cur) {
        chunks.push(cur);
        cur = para;
      } else cur = cur ? cur + "\n\n" + para : para;
    }
    if (cur) chunks.push(cur);
    for (const c of chunks) api("sendMessage", { chat_id: chat, text: c.slice(0, 4096), disable_web_page_preview: true });
    console.log(`Enviado en ${chunks.length} mensaje(s).`);
  } else {
    die(USAGE);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) main();
