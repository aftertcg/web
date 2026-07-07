import { escapeHTML, friendlyError, loadJSON, qs, renderArt, statusClass, whatsappURL } from "./utils.js";

export async function renderPreorders(config) {
  const target = qs("[data-preorders]");
  try {
    const preorders = await loadJSON("data/preventas.json");
    target.innerHTML = preorders.map((item) => {
      const message = `Hola AFTER TCG, quiero reservar o consultar por la preventa: ${item.name}.`;
      return `
        <article class="preorder-card">
          ${renderArt(item)}
          <div class="card-body">
            <span class="badge ${statusClass(item.status)}">${escapeHTML(item.status)}</span>
            <h3>${escapeHTML(item.name)}</h3>
            <div class="meta-list">
              <span><b>Fecha estimada</b> ${escapeHTML(item.estimatedDate)}</span>
              <span><b>Tipo</b> ${escapeHTML(item.type)}</span>
            </div>
            <a class="btn btn-ghost" href="${whatsappURL(config.whatsapp, message)}" target="_blank" rel="noopener">Reservar</a>
            <p class="small-note">Reserva por WhatsApp, sin compra online.</p>
          </div>
        </article>
      `;
    }).join("");
  } catch {
    friendlyError(target, "las preventas");
  }
}
