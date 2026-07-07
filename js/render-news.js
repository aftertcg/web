import { escapeHTML, friendlyError, loadJSON, qs, renderArt } from "./utils.js";

export async function renderNews() {
  const target = qs("[data-news]");
  try {
    const news = await loadJSON("data/noticias.json");
    target.innerHTML = news.map((item) => `
      <article class="news-card">
        ${renderArt(item)}
        <div class="card-body">
          <span class="badge">${escapeHTML(item.category)}</span>
          <h3>${escapeHTML(item.title)}</h3>
          <p>${escapeHTML(item.summary)}</p>
          <small class="small-note">${escapeHTML(item.date)}</small>
          <a class="text-link" href="#contacto">Leer más</a>
        </div>
      </article>
    `).join("");
  } catch {
    friendlyError(target, "las noticias");
  }
}
