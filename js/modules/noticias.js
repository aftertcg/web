window.AfterModules = window.AfterModules || {};

window.AfterModules.noticias = (() => {
  let abierta = null;

  const tipoClase = tipo =>
    `news-type-${String(tipo).toLowerCase()}`;

  const fechaTexto = fecha =>
    new Intl.DateTimeFormat("es-AR", {
      day: "numeric",
      month: "short",
      year: "numeric"
    }).format(new Date(`${fecha}T12:00:00`));

  function render() {
    const C = window.AFTER_CONFIG;

    if (window.AFTER_NEWS_TARGET) {
      abierta = window.AFTER_NEWS_TARGET;
      window.AFTER_NEWS_TARGET = null;
    }

    const noticias = (window.AFTER_NOTICIAS || [])
      .filter(noticia => noticia.activa)
      .sort(
        (a, b) =>
          new Date(`${b.fecha}T12:00:00`) -
          new Date(`${a.fecha}T12:00:00`)
      )
      .slice(0, 5);

    document.getElementById("app").innerHTML = `
      <section class="news-page">

        <div class="news-page-header">
          <div>
            <div class="kicker">Lo nuevo en After</div>
            <h1>Noticias</h1>
            <p>
              Preventas, reingresos, anuncios y novedades
              del espacio.
            </p>
          </div>

          <span class="news-page-count">
            ${noticias.length}
          </span>
        </div>

        <div class="news-stack">

          ${noticias.map((noticia, index) => `
            <article
              class="
                news-stack-card
                ${tipoClase(noticia.tipo)}
                ${abierta === noticia.id ? "is-open" : ""}
              "
              data-news-card="${noticia.id}"
              style="--stack-index:${index}"
            >

              <button
                class="news-stack-summary"
                data-news-toggle="${noticia.id}"
                aria-expanded="${abierta === noticia.id}"
              >
                <div
                  class="news-stack-image"
                  style="background-image:url('${noticia.imagen}')"
                ></div>

                <div class="news-stack-shade"></div>

                <div class="news-stack-top">
                  <span class="news-stack-type">
                    ${noticia.tipo}
                  </span>

                  <span class="news-stack-date">
                    ${fechaTexto(noticia.fecha)}
                  </span>
                </div>

                <div class="news-stack-title">
                  <h2>${noticia.titulo}</h2>
                  <p>${noticia.resumen}</p>

                  <span class="news-stack-action">
                    ${
                      abierta === noticia.id
                        ? "Cerrar noticia ↑"
                        : "Ver noticia ↓"
                    }
                  </span>
                </div>
              </button>

              <div class="news-stack-detail">
                <p>${noticia.texto}</p>

                ${
                  noticia.whatsapp
                    ? `
                      <a
                        class="btn btn-primary"
                        href="https://wa.me/${C.whatsapp}?text=${encodeURIComponent(
                          `Hola After TCG, quería consultar por: ${noticia.titulo}.`
                        )}"
                        target="_blank"
                        rel="noopener"
                      >
                        Consultar por WhatsApp
                      </a>
                    `
                    : ""
                }
              </div>

            </article>
          `).join("")}

        </div>

        ${
          noticias.length === 0
            ? `
              <article class="card empty-state">
                No hay noticias publicadas por el momento.
              </article>
            `
            : ""
        }

      </section>
    `;

    document
      .querySelectorAll("[data-news-toggle]")
      .forEach(button => {
        button.onclick = () => {
          const id = button.dataset.newsToggle;

          abierta = abierta === id ? null : id;
          render();
        };
      });
  }

  return { render };
})();