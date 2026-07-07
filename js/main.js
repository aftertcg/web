import { escapeHTML, loadJSON, qs, qsa, whatsappURL } from "./utils.js";

let config = {};

function formatEventDate(dateString) {
  const date = new Date(`${dateString}T12:00:00`);
  return {
    day: date.toLocaleDateString("es-AR", { day: "2-digit" }),
    month: date.toLocaleDateString("es-AR", { month: "short" }).replace(".", ""),
    weekday: date.toLocaleDateString("es-AR", { weekday: "short" }).replace(".", "")
  };
}

function setupHeader() {
  const header = qs("[data-header]");
  const nav = qs("[data-nav]");
  const toggle = qs("[data-menu-toggle]");

  const sync = () => header.classList.toggle("is-scrolled", window.scrollY > 12);
  sync();
  window.addEventListener("scroll", sync, { passive: true });

  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  qsa(".main-nav a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function bindSocialLinks() {
  qsa("[data-whatsapp]").forEach((link) => {
    link.href = whatsappURL(config.whatsapp, link.dataset.whatsapp);
    link.target = "_blank";
    link.rel = "noopener";
  });

  qsa("[data-instagram]").forEach((link) => {
    link.href = `https://instagram.com/${config.instagram}`;
    link.target = "_blank";
    link.rel = "noopener";
  });
}

function renderFooter() {
  qs("[data-footer-info]").innerHTML = `
    <div class="footer-mini-card">
      <span>Dirección</span>
      <strong>${escapeHTML(config.address)}</strong>
    </div>
    <div class="footer-mini-card">
      <span>Redes</span>
      <strong>@${escapeHTML(config.instagram)}</strong>
      <small>+${escapeHTML(config.whatsapp)}</small>
    </div>
    <div class="footer-hours">
      <span>Horarios</span>
      <div>
        ${config.hours.map((hour) => `<p><strong>${escapeHTML(hour.day)}</strong><small>${escapeHTML(hour.time)}</small></p>`).join("")}
      </div>
    </div>
  `;
}

async function renderWeekEvents() {
  const events = await loadJSON("data/eventos.json");
  qs("[data-week-events]").innerHTML = events.slice(0, 3).map((event, index) => {
    const date = formatEventDate(event.date);
    const message = `Hola AFTER TCG, quiero inscribirme o consultar por: ${event.title}.`;

    return `
      <article class="week-event-card">
        <div class="event-meta">
          <span>${escapeHTML(date.weekday)} ${escapeHTML(date.day)} ${escapeHTML(date.month)} · ${escapeHTML(event.time)}</span>
          <em>${escapeHTML(event.type)}</em>
        </div>
        <div class="event-copy">
          <h3>${escapeHTML(event.title)}</h3>
          <p>${escapeHTML(event.game)} · ${escapeHTML(event.seats)}</p>
          <div class="event-actions">
            <a class="btn btn-primary" href="${whatsappURL(config.whatsapp, message)}" target="_blank" rel="noopener">Me anoto</a>
            <button class="btn btn-quiet" type="button" data-toggle-week-event="${index}">+ info</button>
          </div>
          <div class="event-more" data-week-event-more="${index}" hidden>
            <span>${escapeHTML(event.entry)}</span>
            <span>${escapeHTML(event.prizes)}</span>
          </div>
        </div>
      </article>
    `;
  }).join("");

  qsa("[data-toggle-week-event]").forEach((button) => {
    button.addEventListener("click", () => {
      const more = qs(`[data-week-event-more="${button.dataset.toggleWeekEvent}"]`);
      more.hidden = !more.hidden;
    });
  });
}

async function renderPreorders() {
  const preorders = await loadJSON("data/preventas.json");
  qs("[data-preorders-row]").innerHTML = preorders.slice(0, 4).map((item) => {
    const message = `Hola AFTER TCG, quiero consultar por el próximo ingreso: ${item.name}.`;
    return `
      <article class="mini-product">
        <span class="tag muted">Próximamente</span>
        <h3>${escapeHTML(item.name)}</h3>
        <p>${escapeHTML(item.estimatedDate)}</p>
        <a href="${whatsappURL(config.whatsapp, message)}" target="_blank" rel="noopener">Consultar</a>
      </article>
    `;
  }).join("");
}

async function renderPodium() {
  const ranking = await loadJSON("data/ranking.json");
  const icons = ["♛", "🏆", "★"];
  qs("[data-podium]").innerHTML = ranking.players.slice(0, 3).map((player, index) => `
    <article class="podium-card place-${index + 1}">
      <span class="podium-icon">${icons[index]}</span>
      <span class="podium-rank">#${escapeHTML(player.position)}</span>
      <strong>${escapeHTML(player.name)}</strong>
      <small>${escapeHTML(player.points)} pts</small>
    </article>
  `).join("");
}

async function init() {
  setupHeader();

  try {
    config = await loadJSON("data/config.json");
    renderFooter();
    bindSocialLinks();
    await Promise.all([renderWeekEvents(), renderPreorders(), renderPodium()]);
  } catch (error) {
    console.error(error);
    qs("main").insertAdjacentHTML("afterbegin", `<div class="shell error-box">No pudimos cargar algunos datos. Revisá los JSON de la carpeta data.</div>`);
  }
}

init();
