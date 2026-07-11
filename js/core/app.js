window.AfterApp = (() => {
  const app = document.getElementById("app");
  const modal = document.getElementById("event-modal");
  const content = document.getElementById("modal-content");
  const U = window.AfterUtils;

  function openEvent(id) {
    const e = window.AFTER_EVENTOS.find(
      evento => evento.id === id
    );

    if (!e) return;

    content.innerHTML = `
      <div
        class="modal-image"
        style="background-image:url('${e.imagen}')"
      ></div>

      <div class="modal-body event-detail">

        <div class="event-detail-heading">
          <div>
            <span class="tag">
              ${e.categoria} · ${e.modalidad}
            </span>

            <h2>${e.titulo}</h2>
          </div>

          <strong class="event-detail-price">
            ${U.money(e.precio)}
          </strong>
        </div>

        <p class="event-detail-description">
          ${e.descripcion}
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

        ${U.progress(e)}

        <div class="event-detail-accordions">

          <article class="event-detail-accordion">
            <button
              class="event-detail-toggle"
              aria-expanded="false"
            >
              <span>Qué incluye</span>
              <b>+</b>
            </button>

            <div class="event-detail-panel">
              <ul>
                ${(e.incluye || [])
                  .map(item => `<li>${item}</li>`)
                  .join("")}
              </ul>
            </div>
          </article>

          <article class="event-detail-accordion">
            <button
              class="event-detail-toggle"
              aria-expanded="false"
            >
              <span>Antes de venir</span>
              <b>+</b>
            </button>

            <div class="event-detail-panel">
              <p>
                La reserva se confirma por WhatsApp.
                Recomendamos llegar 15 minutos antes.
              </p>
            </div>
          </article>

        </div>

        <div class="event-detail-sticky">
          <a
            class="btn btn-primary"
            ${
              U.remaining(e)
                ? `href="${U.whatsappEvent(e)}"
                   target="_blank"
                   rel="noopener"`
                : 'aria-disabled="true"'
            }
          >
            ${
              U.remaining(e)
                ? "Reservar mi lugar"
                : "Evento completo"
            }
          </a>
        </div>

      </div>
    `;

    modal.showModal();

    content
      .querySelectorAll(".event-detail-toggle")
      .forEach(button => {
        button.onclick = () => {
          const accordion = button.closest(
            ".event-detail-accordion"
          );

          const open =
            accordion.classList.toggle("is-open");

          button.setAttribute(
            "aria-expanded",
            String(open)
          );

          button.querySelector("b").textContent =
            open ? "−" : "+";
        };
      });
  }

  function bindCommon() {
    document
      .querySelectorAll(".js-detail")
      .forEach(button => {
        button.onclick = () =>
          openEvent(button.dataset.event);
      });

    document
      .querySelectorAll(".js-reserve")
      .forEach(button => {
        button.onclick = () => {
          const e = window.AFTER_EVENTOS.find(
            evento =>
              evento.id === button.dataset.event
          );

          if (e && U.remaining(e)) {
            window.open(
              U.whatsappEvent(e),
              "_blank"
            );
          }
        };
      });

    document
      .querySelectorAll(".js-go")
      .forEach(button => {
        button.onclick = () =>
          window.AfterRouter.go(
            button.dataset.route
          );
      });
  }

  function init() {
    window.AfterRouter.init(app);

    document
      .querySelectorAll(".nav-btn")
      .forEach(button => {
        button.onclick = () => {
          if (navigator.vibrate) {
            navigator.vibrate(20);
          }

          window.AfterRouter.go(
            button.dataset.route
          );
        };
      });

    document.querySelector(".modal-close").onclick =
      () => modal.close();

    modal.addEventListener("click", event => {
      if (event.target === modal) {
        modal.close();
      }
    });

    window.addEventListener("popstate", () => {
      window.AfterRouter.go(
        location.hash.slice(1) || "inicio"
      );
    });

    window.AfterRouter.go(
      location.hash.slice(1) || "inicio"
    );

    if (
      "serviceWorker" in navigator &&
      location.protocol.startsWith("http")
    ) {
      navigator.serviceWorker
        .register("./service-worker.js")
        .catch(() => {});
    }
  }

  return {
    init,
    bindCommon,
    openEvent
  };
})();

document.addEventListener(
  "DOMContentLoaded",
  window.AfterApp.init
);
