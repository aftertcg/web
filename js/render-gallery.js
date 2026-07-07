import { escapeHTML, friendlyError, loadJSON, qs, renderArt } from "./utils.js";

export async function renderGallery() {
  const target = qs("[data-gallery]");
  try {
    const gallery = await loadJSON("data/galeria.json");
    target.innerHTML = gallery.map((item) => `
      <article class="gallery-card">
        ${renderArt(item)}
        <div class="card-body">
          <span class="badge">${escapeHTML(item.category)}</span>
          <h3>${escapeHTML(item.title)}</h3>
        </div>
      </article>
    `).join("");
  } catch {
    friendlyError(target, "la galería");
  }
}
