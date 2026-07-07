import { escapeHTML, formatDateLabel, friendlyError, loadJSON, qs, whatsappURL } from "./utils.js";

const filters = ["Todos", "TCG", "Switch", "Casual", "Competitivo"];

export async function renderEvents(config) {
  const target = qs("[data-events]");
  const filterTarget = qs("[data-event-filters]");

  try {
    const events = await loadJSON("data/eventos.json");
    let active = "Todos";

    const drawFilters = () => {
      filterTarget.innerHTML = filters.map((filter) => `
        <button class="filter-btn ${filter === active ? "is-active" : ""}" type="button" data-filter="${filter}">
          ${filter}
        </button>
      `).join("");
    };

    const drawEvents = () => {
      const visible = active === "Todos" ? events : events.filter((event) => event.tags.includes(active));
      target.innerHTML = visible.map((event) => {
        const date = formatDateLabel(event.date);
        const message = `Hola AFTER TCG, quiero inscribirme o consultar por el evento: ${event.title} del ${event.date}.`;
        return `
          <article class="event-card">
            <div class="date-box">
              <span>${escapeHTML(date.weekday)}</span>
              <strong>${escapeHTML(date.day)}</strong>
              <span>${escapeHTML(date.month)}</span>
            </div>
            <div class="event-content">
              <span class="badge">${escapeHTML(event.type)}</span>
              <h3>${escapeHTML(event.title)}</h3>
              <div class="event-meta">
                <span>${escapeHTML(event.time)}</span>
                <span>${escapeHTML(event.game)}</span>
                <span>${escapeHTML(event.seats)}</span>
                <span>${escapeHTML(event.entry)}</span>
                <span>${escapeHTML(event.prizes)}</span>
              </div>
            </div>
            <a class="btn btn-ghost" href="${whatsappURL(config.whatsapp, message)}" target="_blank" rel="noopener">Inscribirme</a>
          </article>
        `;
      }).join("");
    };

    drawFilters();
    drawEvents();

    filterTarget.addEventListener("click", (event) => {
      const button = event.target.closest("[data-filter]");
      if (!button) return;
      active = button.dataset.filter;
      drawFilters();
      drawEvents();
    });
  } catch {
    friendlyError(target, "los eventos");
  }
}
