window.AfterComponents = (() => {
  const U = window.AfterUtils;

  function eventCard(e) {
    return `
      <article class="event-ticket card">

        <div
          class="ticket-image"
          style="background-image:url('${e.imagen}')"
        >
          <div class="ticket-date">
            <small>
              ${U.shortDate(e.fecha)}
            </small>

            <strong>
              ${e.hora}
            </strong>
          </div>

          <div class="ticket-category">
            ${e.categoria}
          </div>
        </div>

        <div class="ticket-body">

          <div class="ticket-heading">

            <div>
              <div class="kicker">
                ${e.modalidad}
              </div>

              <h3>
                ${e.titulo}
              </h3>
            </div>

            <div class="ticket-price">
              ${U.money(e.precio)}
            </div>

          </div>

          <p>
            ${e.resumen}
          </p>

          <div class="ticket-countdown">
            ⏳ ${U.countdown(e)}
          </div>

          ${U.progress(e)}

          <div class="ticket-actions">

            <button
              class="btn btn-secondary js-detail"
              data-event="${e.id}"
            >
              Ver detalles
            </button>

            <button
              class="btn btn-primary js-reserve"
              data-event="${e.id}"
              ${
                U.remaining(e) === 0
                  ? "disabled"
                  : ""
              }
            >
              ${
                U.remaining(e) === 0
                  ? "Completo"
                  : "Reservar"
              }
            </button>

          </div>

        </div>

      </article>
    `;
  }

  function hero(e) {
    return `
      <article
        class="card hero"
        style="background-image:url('${e.imagen}')"
      >

        <div class="hero-content">

          <div class="kicker">
            Próxima misión · ${e.categoria}
          </div>

          <h1>
            ${e.titulo}
          </h1>

          <p class="hero-desc">
            ${e.resumen}
          </p>

          <div class="pills">

            <span class="pill">
              📅 ${U.dateText(e.fecha)}
            </span>

            <span class="pill">
              🕒 ${e.hora}
            </span>

            <span class="pill">
              👥 ${e.cuposTotales} cupos
            </span>

          </div>

          <div class="hero-countdown">
            ⏳ ${U.countdown(e)}
          </div>

          ${U.progress(e)}

          <button
            class="btn btn-primary js-reserve"
            data-event="${e.id}"
            ${
              U.remaining(e) === 0
                ? "disabled"
                : ""
            }
          >
            ${
              U.remaining(e) === 0
                ? "Evento completo"
                : "Reservar mi lugar"
            }
          </button>

        </div>

      </article>
    `;
  }

  return {
    eventCard,
    hero
  };
})();
