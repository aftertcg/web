window.AfterModules = window.AfterModules || {};

window.AfterModules.calendario = (() => {
  let monthOffset = 0;
  let selectedDate = null;

  const CATEGORY_DATA = {
    TCG: {
      emoji: "🎴",
      css: "calendar-tcg"
    },
    Switch: {
      emoji: "🎮",
      css: "calendar-switch"
    },
    Casual: {
      emoji: "🤝",
      css: "calendar-casual"
    },
    Especial: {
      emoji: "⭐",
      css: "calendar-special"
    }
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

  function eventsForMonth(year, month) {
    return window.AFTER_EVENTOS
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
  }

  function availablePlaces(events) {
    return events.reduce(
      (total, event) =>
        total +
        Math.max(
          0,
          Number(event.cuposTotales) -
          Number(event.reservados)
        ),
      0
    );
  }

  function chooseDefaultEvent(monthEvents) {
    const selected = monthEvents.find(
      event => event.fecha === selectedDate
    );

    if (selected) {
      return selected;
    }

    const now = new Date();

    const next = monthEvents.find(
      event =>
        new Date(`${event.fecha}T${event.hora}`) >= now
    );

    return next || monthEvents[0] || null;
  }

  function render() {
    const U = window.AfterUtils;
    const C = window.AfterComponents;

    const shownMonth = monthStart(monthOffset);
    const year = shownMonth.getFullYear();
    const month = shownMonth.getMonth();

    const monthName = new Intl.DateTimeFormat(
      "es-AR",
      {
        month: "long",
        year: "numeric"
      }
    ).format(shownMonth);

    const currentMonthName = new Intl.DateTimeFormat(
      "es-AR",
      {
        month: "long"
      }
    ).format(monthStart(0));

    const nextMonthName = new Intl.DateTimeFormat(
      "es-AR",
      {
        month: "long"
      }
    ).format(monthStart(1));

    const monthEvents = eventsForMonth(year, month);
    const selectedEvent = chooseDefaultEvent(monthEvents);

    if (selectedEvent) {
      selectedDate = selectedEvent.fecha;
    }

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
      cells += `<span class="calendar-day calendar-empty"></span>`;
    }

    for (let day = 1; day <= totalDays; day++) {
      const iso = isoDate(year, month, day);

      const dayEvents = monthEvents.filter(
        event => event.fecha === iso
      );

      const firstEvent = dayEvents[0];

      const category =
        firstEvent &&
        CATEGORY_DATA[firstEvent.categoria]
          ? CATEGORY_DATA[firstEvent.categoria]
          : null;

      const categoryClass =
        category ? category.css : "";

      const emoji =
        category ? category.emoji : "";

      cells += `
        <button
          class="
            calendar-day
            ${dayEvents.length ? "has-event" : ""}
            ${categoryClass}
            ${iso === selectedDate ? "is-selected" : ""}
            ${iso === todayIso ? "is-today" : ""}
          "
          data-date="${iso}"
          ${dayEvents.length ? "" : "disabled"}
        >
          <span class="calendar-number">
            ${day}
          </span>

          ${
            dayEvents.length
              ? `
                <span class="calendar-event-icon">
                  ${emoji}
                </span>

                ${
                  dayEvents.length > 1
                    ? `
                      <small class="calendar-event-count">
                        +${dayEvents.length - 1}
                      </small>
                    `
                    : ""
                }
              `
              : ""
          }
        </button>
      `;
    }

    document.getElementById("app").innerHTML = `
      <section>

        <div class="section-head calendar-page-heading">
          <div>
            <div class="kicker">
              Agenda de actividades
            </div>

            <h2>Calendario</h2>
          </div>

          <span class="calendar-range">
            ${currentMonthName} y ${nextMonthName}
          </span>
        </div>

        <article class="card calendar-panel">

          <div class="calendar-toolbar">

            <button
              class="calendar-arrow"
              id="calendar-prev"
              aria-label="Mes anterior"
              ${monthOffset === 0 ? "disabled" : ""}
            >
              ‹
            </button>

            <div class="calendar-month-title">
              <small>
                ${
                  monthOffset === 0
                    ? "Mes actual"
                    : "Mes siguiente"
                }
              </small>

              <h3>${monthName}</h3>
            </div>

            <button
              class="calendar-arrow"
              id="calendar-next"
              aria-label="Mes siguiente"
              ${monthOffset === 1 ? "disabled" : ""}
            >
              ›
            </button>

          </div>

          <div class="calendar-summary">

            <div>
              <strong>${monthEvents.length}</strong>
              <span>
                ${
                  monthEvents.length === 1
                    ? "evento"
                    : "eventos"
                }
              </span>
            </div>

            <div>
              <strong>
                ${availablePlaces(monthEvents)}
              </strong>
              <span>lugares disponibles</span>
            </div>

          </div>

          <div class="calendar-weekdays">
            ${["L", "M", "M", "J", "V", "S", "D"]
              .map(
                day => `<span>${day}</span>`
              )
              .join("")}
          </div>

          <div class="calendar-grid">
            ${cells}
          </div>

          <div class="calendar-legend">

            <span class="legend-tcg">
              <i></i> 🎴 TCG
            </span>

            <span class="legend-switch">
              <i></i> 🎮 Switch
            </span>

            <span class="legend-casual">
              <i></i> 🤝 Casual
            </span>

            <span class="legend-special">
              <i></i> ⭐ Especial
            </span>

          </div>

        </article>

        <div class="section-head">
          <div>
            <div class="kicker">
              ${
                selectedEvent
                  ? U.dateText(selectedEvent.fecha)
                  : "Sin actividad"
              }
            </div>

            <h2>
              ${
                selectedEvent
                  ? "Evento seleccionado"
                  : "No hay eventos"
              }
            </h2>
          </div>
        </div>

        <div id="selected-calendar-event">

          ${
            selectedEvent
              ? C.eventCard(selectedEvent)
              : `
                <article class="card calendar-no-events">

                  <div class="calendar-no-events-icon">
                    📅
                  </div>

                  <h3>
                    Todavía no hay eventos cargados
                  </h3>

                  <p>
                    Revisá el otro mes o volvé más adelante
                    para conocer las nuevas fechas.
                  </p>

                </article>
              `
          }

        </div>

      </section>
    `;

    document
      .getElementById("calendar-prev")
      .onclick = () => {
        if (monthOffset === 1) {
          monthOffset = 0;
          selectedDate = null;
          render();
        }
      };

    document
      .getElementById("calendar-next")
      .onclick = () => {
        if (monthOffset === 0) {
          monthOffset = 1;
          selectedDate = null;
          render();
        }
      };

    document
      .querySelectorAll(
        ".calendar-day.has-event"
      )
      .forEach(button => {
        button.onclick = () => {
          selectedDate = button.dataset.date;
          render();
        };
      });

    window.AfterApp.bindCommon();
  }

  return {
    render
  };
})();