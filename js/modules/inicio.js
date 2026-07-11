window.AfterModules = window.AfterModules || {};

window.AfterModules.inicio = (() => {
  function cleanup() {
    // Se conserva para que el router pueda limpiar el módulo.
  }

  function getLocalStatus(nextEvent) {
    const eventos = window.AFTER_EVENTOS;
    const ahora = new Date();

    const eventoActivo = eventos.find(evento => {
      const inicio = new Date(
        `${evento.fecha}T${evento.hora}:00`
      );

      const apertura = new Date(
        inicio.getTime() - 30 * 60 * 1000
      );

      const cierre = new Date(
        inicio.getTime() + 4 * 60 * 60 * 1000
      );

      return ahora >= apertura && ahora <= cierre;
    });

    if (eventoActivo) {
      return {
        abierto: true,
        titulo: "Abierto ahora",
        detalle: eventoActivo.titulo
      };
    }

    return {
      abierto: false,
      titulo: "Próxima actividad",
      detalle: nextEvent
        ? `${window.AfterUtils.shortDate(nextEvent.fecha)} · ${nextEvent.hora}`
        : "Próximamente"
    };
  }

  function render() {
    const C = window.AFTER_CONFIG;
    const U = window.AfterUtils;
    const proximos = U.upcoming();
    const next = proximos[0] || null;
    const status = getLocalStatus(next);

    document.getElementById("app").innerHTML = `
      <section class="home-v3">

        <article class="home-v3-hero">

          <img
            src="assets/local/local-base.jpg"
            alt="After TCG, espacio de juegos y eventos en Almagro"
            class="home-v3-background"
          >

          <div class="home-v3-overlay"></div>
          <div class="home-v3-glow"></div>

          <div class="home-v3-top">

            <span class="home-v3-location">
              📍 Almagro, CABA
            </span>

            <div class="home-v3-status ${status.abierto ? "is-open" : "is-next"}">
              <span class="home-v3-status-dot"></span>

              <div>
                <strong>${status.titulo}</strong>
                <small>${status.detalle}</small>
              </div>
            </div>

          </div>

          <div class="home-v3-content">

            <div class="kicker">
              Bienvenido a After TCG
            </div>

            <h1>
              Jugá.<br>
              Compartí.<br>
              Viví el hobby.
            </h1>

            <p>
              Eventos TCG, Nintendo Switch, comunidad,
              comida y buenos momentos.
            </p>

            <div class="home-v3-tags">
              <span>🎴 TCG</span>
              <span>🎮 Switch</span>
              <span>🏆 Torneos</span>
              <span>🌭 Snacks</span>
            </div>

          </div>

          ${
            next
              ? `
                <article class="home-v3-next-event">

                  <button
                    class="home-v3-next-main js-detail"
                    data-event="${next.id}"
                  >
                    <div class="home-v3-next-date">
                      <small>
                        ${U.shortDate(next.fecha)}
                      </small>

                      <strong>${next.hora}</strong>
                    </div>

                    <div class="home-v3-next-info">
                      <span>Próximo evento</span>
                      <strong>${next.titulo}</strong>

                      <small class="${U.availabilityClass(next)}">
                        ${U.availability(next)}
                      </small>
                    </div>

                    <div class="home-v3-next-arrow">
                      ›
                    </div>
                  </button>

                  <button
                    class="home-v3-reserve js-reserve"
                    data-event="${next.id}"
                    ${U.remaining(next) === 0 ? "disabled" : ""}
                  >
                    ${
                      U.remaining(next) === 0
                        ? "Completo"
                        : "Reservar lugar"
                    }
                  </button>

                </article>
              `
              : ""
          }

        </article>


        <div class="home-v3-explore">

          <div class="home-v3-explore-heading">
            <div>
              <div class="kicker">
                Explorá After
              </div>

              <h2>¿Qué querés ver?</h2>
            </div>

            <span>Elegí una sección</span>
          </div>

          <div class="home-v3-nav-grid">

            <button
              class="home-v3-nav-card home-v3-events js-go"
              data-route="eventos"
            >
              <span class="home-v3-nav-icon">🎟️</span>

              <div>
                <strong>Eventos</strong>
                <small>Reservá tu lugar</small>
              </div>

              <b>›</b>
            </button>

            <button
              class="home-v3-nav-card home-v3-calendar js-go"
              data-route="calendario"
            >
              <span class="home-v3-nav-icon">📅</span>

              <div>
                <strong>Agenda</strong>
                <small>Consultá las fechas</small>
              </div>

              <b>›</b>
            </button>

            <button
              class="home-v3-nav-card home-v3-community js-go"
              data-route="comunidad"
            >
              <span class="home-v3-nav-icon">🏆</span>

              <div>
                <strong>Comunidad</strong>
                <small>Rankings y momentos</small>
              </div>

              <b>›</b>
            </button>

            <button
              class="home-v3-nav-card home-v3-visit js-go"
              data-route="contacto"
            >
              <span class="home-v3-nav-icon">📍</span>

              <div>
                <strong>Visítanos</strong>
                <small>Conocé el local</small>
              </div>

              <b>›</b>
            </button>

          </div>

        </div>

      </section>
    `;

    window.AfterApp.bindCommon();
  }

  return {
    render,
    cleanup
  };
})();