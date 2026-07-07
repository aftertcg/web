const cache = new Map();

export async function loadJSON(path) {
  if (cache.has(path)) return cache.get(path);

  try {
    const response = await fetch(path, { cache: "no-store" });
    if (!response.ok) throw new Error(`No se pudo cargar ${path}`);
    const data = await response.json();
    cache.set(path, data);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

export function qsa(selector, parent = document) {
  return [...parent.querySelectorAll(selector)];
}

export function friendlyError(target, label) {
  if (!target) return;
  target.innerHTML = `<div class="error-box">No pudimos cargar ${label}. Revisá el archivo JSON y volvé a intentar.</div>`;
}

export function escapeHTML(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function whatsappURL(phone, message) {
  const cleanPhone = String(phone || "").replace(/\D/g, "");
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

export function statusClass(status = "") {
  const normalized = status.toLowerCase();
  if (normalized.includes("agotado")) return "danger";
  if (normalized.includes("disponible")) return "success";
  if (normalized.includes("últimas") || normalized.includes("ultimas")) return "";
  return "muted";
}

export function artStyle(seed = "after") {
  let hash = 0;
  for (const char of seed) hash = (hash * 31 + char.charCodeAt(0)) % 360;
  const hue = 34 + (hash % 18);
  const cool = 205 + (hash % 24);
  return `background:
    radial-gradient(circle at 24% 20%, hsla(${hue}, 78%, 56%, .42), transparent 22%),
    radial-gradient(circle at 78% 58%, hsla(${cool}, 32%, 30%, .58), transparent 34%),
    linear-gradient(135deg, #191714, #080808 66%);`;
}

export function renderArt(item, className = "placeholder-art") {
  const alt = escapeHTML(item.alt || item.name || item.title || "Imagen decorativa de AFTER TCG");
  return `<div class="${className}" role="img" aria-label="${alt}" style="${artStyle(item.title || item.name || alt)}"></div>`;
}

export function formatDateLabel(dateString) {
  const date = new Date(`${dateString}T12:00:00`);
  const day = date.toLocaleDateString("es-AR", { day: "2-digit" });
  const month = date.toLocaleDateString("es-AR", { month: "short" }).replace(".", "");
  const weekday = date.toLocaleDateString("es-AR", { weekday: "short" }).replace(".", "");
  return { day, month, weekday };
}
