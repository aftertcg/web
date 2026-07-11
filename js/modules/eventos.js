window.AfterModules = window.AfterModules || {};

window.AfterModules.eventos = (() => {
  let vista = "eventos";
  let filtro = "Todos";
  let monthOffset = 0;

  const FILTROS = [
    { nombre: "Todos", emoji: "✨", clase: "filter-all" },
    { nombre: "TCG", emoji: "🎴", clase: "filter-tcg" },
    { nombre: "Switch", emoji: "🎮", clase: "filter-switch" },
    { nombre: "Casual", emoji: "🤝", clase: "filter-casual" },
    { nombre: "Especial", emoji: "⭐", clase: "filter-special" }
  ];

  const CATEGORY_CLASS = {
    TCG: "day-tcg",
    Switch: "day-switch",
    Casual: "day-casual",
    Especial: "day-special"
  };

  function monthStart(offset = 0) {
    const now = new Date();

    return new Date(
      now.getFullYear(),
      now.getMonth() + offset,
      1
    );
  }

  function isoDate(year, month, day) {
    return (
      `${year}-` +
      `${String(month + 1).padStart(2, "0")}-` +
      `${String(day).padStart(2, "0")}`
    );
  }

  function openDayEvents(events) {
    if (!events.length) return;

    if (events.length === 1) {
      window.AfterApp.openEvent(events[0].id);
      return;
    }

    const modal = document.getElementById("event-modal");
    const content = document.getElementById("modal-content");
    const U = window.AfterUtils;

    content.innerHTML = `
      <div class="multi-event-modal">
        <div class="kicker">
          ${U.dateText(events[0].fecha)}
        </div>

        <h2>${events.length} eventos este día</h2>

        <div class="multi-event-list">
          ${events.map(event => `
            <button
              class="multi-event-option"
              data-open-event="${event.id}"
            >
              <div class="multi-event-time">${event.hora}</div>

              <div class="multi-event-info">
                <strong>${event.titulo}</strong>
                <span>
                  ${event.categoria} ·
                  ${U.availability(event)}
                </span>
              </div>

              <div class="multi-event-arrow">›</div>
            </button>
          `).join("")}
        </div>
      </div>
    `;

    modal.showModal();

    document
      .querySelectorAll("[data-open-event]")
      .forEach(button => {
        button.onclick = () => {
          modal.close();

          setTimeout(() => {
            window.AfterApp.openEvent(
              button.dataset.openEvent
            );
          }, 100);
        };
      });
  }

  function moduleTabs() {
    return `
      <div class="events-view-switch">

        <button
          class="${vista === "eventos" ? "active" : ""}"
          data-events-view="eventos"
        >
          <span>🎟️</span>
          Eventos
        </button>

        <button
          class="${vista === "calendario" ? "active" : ""}"
          data-events-view="calendario"
        >
          <span>📅</span>
          Calendario
        </button>

      </div>
    `;
  }

  function bindTabs() {
    document
      .querySelectorAll("[data-events-view]")
      .forEach(button => {
        button.onclick = () => {
          vista = button.dataset.eventsView;
          render();
        };
      });
  }

  function renderEventList() {
    const C = window.AfterComponents;
    const E = window.AFTER_EVENTOS;

    const visible =
      filtro === "Todos"
        ? E
        : E.filter(evento => evento.categoria === filtro);

    document.getElementById("app").innerHTML = `
      <section>

        <div class="section-head event-page-head">
          <div>
            <div class="kicker">
              Elegí tu próxima actividad
            </div>
            <h2>Eventos</h2>
          </div>

          <span class="event-count-label">
            ${visible.length}
            ${visible.length === 1 ? "evento" : "eventos"}
          </span>
        </div>

        ${moduleTabs()}

        <div class="compact-filter-grid">
          ${FILTROS.map(item => `
            <button
              class="
                compact-filter
                ${item.clase}
                ${item.nombre === filtro ? "active" : ""}
              "
              data-filter="${item.nombre}"
            >
              <span class="compact-filter-icon">
                ${item.emoji}
              </span>

              <span class="compact-filter-label">
                ${item.nombre}
              </span>
            </button>
          `).join("")}
        </div>

        <div class="event-list spaced">
          ${
            visible.length
              ? visible.map(C.eventCard).join("")
              : `
                <div class="empty-state">
                  No hay eventos en esta categoría.
                </div>
              `
          }
        </div>

      </section>
    `;

    bindTabs();
    window.AfterApp.bindCommon();

    document
      .querySelectorAll("[data-filter]")
      .forEach(button => {
        button.onclick = () => {
          filtro = button.dataset.filter;
          renderEventList();
        };
      });
  }

  function renderCalendar() {
    const E = window.AFTER_EVENTOS;
    const shownMonth = monthStart(monthOffset);
    const year = shownMonth.getFullYear();
    const month = shownMonth.getMonth();

    const monthEvents = E
      .filter(event => {
        const date = new Date(`${event.fecha}T12:00:00`);

        return (
          date.getFullYear() === year &&
          date.getMonth() === month
        );
      })
      .sort(
        (a, b) =>
          new Date(`${a.fecha}T${a.hora}`) -
          new Date(`${b.fecha}T${b.hora}`)
      );

    const monthName = new Intl.DateTimeFormat(
      "es-AR",
      { month: "long", year: "numeric" }
    ).format(shownMonth);

    const firstWeekday =
      (new Date(year, month, 1).getDay() + 6) % 7;

    const totalDays =
      new Date(year, month + 1, 0).getDate();

    const today = new Date();

    const todayIso = isoDate(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    let cells = "";

    for (let i = 0; i < firstWeekday; i++) {
      cells += `<span class="agenda-day is-empty"></span>`;
    }

    for (let day = 1; day <= totalDays; day++) {
      const iso = isoDate(year, month, day);

      const dayEvents = monthEvents.filter(
        event => event.fecha === iso
      );

      const categoryClass =
        dayEvents[0]
          ? CATEGORY_CLASS[dayEvents[0].categoria] || ""
          : "";

      cells += `
        <button
          class="
            agenda-day
            ${dayEvents.length ? "has-event" : ""}
            ${categoryClass}
            ${iso === todayIso ? "is-today" : ""}
          "
          data-day="${iso}"
          ${dayEvents.length ? "" : "disabled"}
        >
          <span class="agenda-day-number">${day}</span>

          ${
            dayEvents.length
              ? `<span class="agenda-day-dot"></span>`
              : ""
          }

          ${
            dayEvents.length > 1
              ? `
                <small class="agenda-day-count">
                  ${dayEvents.length}
                </small>
              `
              : ""
          }
        </button>
      `;
    }

    const availablePlaces = monthEvents.reduce(
      (total, event) =>
        total +
        Math.max(
          0,
          Number(event.cuposTotales) -
          Number(event.reservados)
        ),
      0
    );

    document.getElementById("app").innerHTML = `
      <section class="calendar-screen">

        <div class="calendar-header">
          <div>
            <div class="kicker">
              Próximas actividades
            </div>
            <h1>Calendario</h1>
          </div>

          <div class="calendar-month-summary">
            <strong>${monthEvents.length}</strong>
            <span>
              ${monthEvents.length === 1 ? "evento" : "eventos"}
            </span>
          </div>
        </div>

        ${moduleTabs()}

        <article class="agenda-card">

          <div class="agenda-toolbar">

            <button
              class="agenda-arrow"
              id="calendar-prev"
              ${monthOffset === 0 ? "disabled" : ""}
            >
              ‹
            </button>

            <div class="agenda-month">
              <small>
                ${
                  monthOffset === 0
                    ? "Mes actual"
                    : "Mes siguiente"
                }
              </small>

              <h2>${monthName}</h2>
            </div>

            <button
              class="agenda-arrow"
              id="calendar-next"
              ${monthOffset === 1 ? "disabled" : ""}
            >
              ›
            </button>

          </div>

          <div class="agenda-stats">
            <span>
              <b>${monthEvents.length}</b> fechas
            </span>

            <span>
              <b>${availablePlaces}</b> lugares
            </span>
          </div>

          <div class="agenda-weekdays">
            ${["L", "M", "M", "J", "V", "S", "D"]
              .map(day => `<span>${day}</span>`)
              .join("")}
          </div>

          <div class="agenda-grid">
            ${cells}
          </div>

          <div class="agenda-legend">
            <span class="legend-tcg"><i></i> TCG</span>
            <span class="legend-switch"><i></i> Switch</span>
            <span class="legend-casual"><i></i> Casual</span>
            <span class="legend-special"><i></i> Especial</span>
          </div>

          <p class="agenda-hint">
            Tocá un día marcado para ver sus eventos.
          </p>

        </article>

      </section>
    `;

    bindTabs();

    document.getElementById("calendar-prev").onclick = () => {
      if (monthOffset === 1) {
        monthOffset = 0;
        renderCalendar();
      }
    };

    document.getElementById("calendar-next").onclick = () => {
      if (monthOffset === 0) {
        monthOffset = 1;
        renderCalendar();
      }
    };

    document
      .querySelectorAll(".agenda-day.has-event")
      .forEach(button => {
        button.onclick = () => {
          openDayEvents(
            monthEvents.filter(
              event => event.fecha === button.dataset.day
            )
          );
        };
      });
  }

  function render() {
    if (vista === "calendario") {
      renderCalendar();
    } else {
      renderEventList();
    }
  }

  return { render };
})();