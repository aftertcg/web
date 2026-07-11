window.AfterModules = window.AfterModules || {};

window.AfterModules.inicio = (() => {
  let slideActual = 0;
  let timer = null;
  let touchInicio = 0;
  let touchFin = 0;

  function cleanup() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  function obtenerEstadoLocal(proximoEvento) {
    const ahora = new Date();

    const eventoActivo = window.AFTER_EVENTOS.find(evento => {
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
        clase: "is-open",
        titulo: "Abierto ahora",
        detalle: eventoActivo.titulo
      };
    }

    return {
      clase: "is-next",
      titulo: "Próxima actividad",
      detalle: proximoEvento
        ? `${window.AfterUtils.shortDate(proximoEvento.fecha)} · ${proximoEvento.hora}`
        : "Próximamente"
    };
  }

  function crearSlides(proximoEvento) {
    const U = window.AfterUtils;

    return [
      {
        tipo: "presentacion",
        imagen: "assets/local/local-base.jpg",
        etiqueta: "After TCG · Almagro",
        titulo: "Jugá. Compartí. Viví el hobby.",
        texto:
          "TCG, Nintendo Switch, comida y comunidad en un mismo espacio.",
        boton: "Ver próximos eventos",
        ruta: "eventos"
      },

      {
        tipo: "evento",
        imagen: proximoEvento
          ? proximoEvento.imagen
          : "assets/eventos/torneo-standard.jpg",
        etiqueta: "Próximo evento",
        titulo: proximoEvento
          ? proximoEvento.titulo
          : "Próximamente",
        texto: proximoEvento
          ? `${U.shortDate(proximoEvento.fecha)} · ${proximoEvento.hora} · ${U.availability(proximoEvento)}`
          : "Muy pronto publicaremos una nueva actividad.",
        boton: proximoEvento && U.remaining(proximoEvento) > 0
          ? "Reservar lugar"
          : "Ver agenda",
        evento: proximoEvento ? proximoEvento.id : null,
        reservar:
          Boolean(
            proximoEvento &&
            U.remaining(proximoEvento) > 0
          )
      },

      {
        tipo: "comunidad",
        imagen: "assets/eventos/encuentro-comunidad.jpg",
        etiqueta: "Más que una tienda",
        titulo: "Un lugar para conocer gente.",
        texto:
          "Jugá, competí, intercambiá y compartí el hobby con la comunidad.",
        boton: "Conocer la comunidad",
        ruta: "comunidad"
      }
    ];
  }

  function actualizarCarrusel(indice) {
    const track =
      document.getElementById("home-carousel-track");

    const slides = document.querySelectorAll(
      ".home-carousel-slide"
    );

    if (!track || !slides.length) return;

    slideActual =
      (indice + slides.length) % slides.length;

    track.style.transform =
      `translateX(-${slideActual * 100}%)`;

    document
      .querySelectorAll(".home-carousel-dot")
      .forEach((dot, index) => {
        dot.classList.toggle(
          "active",
          index === slideActual
        );
      });
  }

  function iniciarAutomatico() {
    cleanup();

    timer = setInterval(() => {
      if (location.hash !== "#inicio") {
        cleanup();
        return;
      }

      actualizarCarrusel(slideActual + 1);
    }, 6500);
  }

  function render() {
    cleanup();

    const U = window.AfterUtils;
    const proximos = U.upcoming();
    const proximoEvento = proximos[0] || null;
    const estado = obtenerEstadoLocal(proximoEvento);
    const slides = crearSlides(proximoEvento);

    const noticiasActivas = (window.AFTER_NOTICIAS || [])
      .filter(noticia => noticia.activa);

    const noticiaDestacada =
      noticiasActivas.find(
        noticia =>
          noticia.id === window.AFTER_NOTICIA_DESTACADA
      ) || noticiasActivas[0] || null;

    document.getElementById("app").innerHTML = `
      <section class="home-final">

        <div class="home-final-location-bar">

          <a
            class="home-final-map"
            href="${window.AFTER_CONFIG.mapsUrl}"
            target="_blank"
            rel="noopener"
            aria-label="Abrir ubicación en Google Maps"
          >
            🌍
          </a>

          <div class="home-final-location-info">
            <div>
              <small>Encontranos en</small>

              <strong>
                Av. Hipólito Yrigoyen 3386
              </strong>

              <span>
                Almagro, CABA
              </span>
            </div>
          </div>

          <a
            class="home-final-whatsapp"
            href="https://wa.me/${window.AFTER_CONFIG.whatsapp}?text=${encodeURIComponent(window.AFTER_CONFIG.mensajeGeneral)}"
            target="_blank"
            rel="noopener"
            aria-label="Contactar por WhatsApp"
          >
            💬
          </a>

        </div>


        <article
          class="home-carousel"
          id="home-carousel"
        >

          <div
            class="home-carousel-track"
            id="home-carousel-track"
          >

            ${slides.map((slide, index) => `
              <article class="home-carousel-slide">

                <img
                  src="${slide.imagen}"
                  alt="${slide.titulo}"
                  class="home-carousel-image"
                >

                <div class="home-carousel-shade"></div>

                <div class="home-carousel-content">

                  <div class="kicker">
                    ${slide.etiqueta}
                  </div>

                  <h1>${slide.titulo}</h1>

                  <p>${slide.texto}</p>

                  ${
                    slide.reservar
                      ? `
                        <button
                          class="btn btn-primary js-reserve"
                          data-event="${slide.evento}"
                        >
                          ${slide.boton}
                        </button>
                      `
                      : slide.evento
                        ? `
                          <button
                            class="btn btn-primary js-detail"
                            data-event="${slide.evento}"
                          >
                            ${slide.boton}
                          </button>
                        `
                        : `
                          <button
                            class="btn btn-primary js-go"
                            data-route="${slide.ruta}"
                          >
                            ${slide.boton}
                          </button>
                        `
                  }

                </div>

              </article>
            `).join("")}

          </div>


          <button
            class="home-carousel-arrow home-carousel-prev"
            id="home-carousel-prev"
            aria-label="Banner anterior"
          >
            ‹
          </button>

          <button
            class="home-carousel-arrow home-carousel-next"
            id="home-carousel-next"
            aria-label="Siguiente banner"
          >
            ›
          </button>


          <div class="home-carousel-dots">

            ${slides.map((_, index) => `
              <button
                class="
                  home-carousel-dot
                  ${index === 0 ? "active" : ""}
                "
                data-carousel-dot="${index}"
                aria-label="Mostrar banner ${index + 1}"
              ></button>
            `).join("")}

          </div>

        </article>


        ${
          noticiaDestacada
            ? `
              <button
                class="home-featured-news"
                data-featured-news="${noticiaDestacada.id}"
              >
                <span class="home-featured-news-icon">🗞️</span>

                <div>
                  <small>${noticiaDestacada.tipo}</small>
                  <strong>${noticiaDestacada.titulo}</strong>
                  <span>${noticiaDestacada.resumen}</span>
                </div>

                <b>›</b>
              </button>
            `
            : ""
        }

        <div class="home-final-heading">

          <div>
            <div class="kicker">
              Explorá After
            </div>

            <h2>¿Qué querés ver?</h2>
          </div>

          <span>
            Tocá una sección
          </span>

        </div>


        <div class="home-final-nav-grid">

          <button
            class="home-final-nav-card home-final-news js-go"
            data-route="noticias"
          >
            <span>🗞️</span>

            <div>
              <strong>Noticias</strong>
              <small>
                Preventas y novedades
              </small>
            </div>

            <b>›</b>
          </button>


          <button
            class="home-final-nav-card home-final-events js-go"
            data-route="eventos"
          >
            <span>📅</span>

            <div>
              <strong>Eventos</strong>
              <small>
                Fechas, cupos y reservas
              </small>
            </div>

            <b>›</b>
          </button>


          <button
            class="home-final-nav-card home-final-community js-go"
            data-route="comunidad"
          >
            <span>🏆</span>

            <div>
              <strong>Comunidad</strong>
              <small>
                Rankings y resultados
              </small>
            </div>

            <b>›</b>
          </button>


          <button
            class="home-final-nav-card home-final-visit js-go"
            data-route="contacto"
          >
            <span>📍</span>

            <div>
              <strong>Visítanos</strong>
              <small>
                Local y cómo llegar
              </small>
            </div>

            <b>›</b>
          </button>

        </div>


        <article class="home-final-manifesto">

          <span>🎴</span>

          <div>
            <strong>
              Cada fecha es una experiencia diferente.
            </strong>

            <p>
              Torneos, encuentros casuales, Switch,
              intercambios y actividades especiales.
            </p>
          </div>

        </article>

      </section>
    `;

    window.AfterApp.bindCommon();

    const featuredNews =
      document.querySelector("[data-featured-news]");

    if (featuredNews) {
      featuredNews.onclick = () => {
        window.AFTER_NEWS_TARGET =
          featuredNews.dataset.featuredNews;

        window.AfterRouter.go("noticias");
      };
    }

    document
      .getElementById("home-carousel-prev")
      .onclick = () => {
        actualizarCarrusel(slideActual - 1);
        iniciarAutomatico();
      };

    document
      .getElementById("home-carousel-next")
      .onclick = () => {
        actualizarCarrusel(slideActual + 1);
        iniciarAutomatico();
      };

    document
      .querySelectorAll("[data-carousel-dot]")
      .forEach(dot => {
        dot.onclick = () => {
          actualizarCarrusel(
            Number(dot.dataset.carouselDot)
          );

          iniciarAutomatico();
        };
      });

    const carousel =
      document.getElementById("home-carousel");

    carousel.addEventListener(
      "touchstart",
      event => {
        touchInicio =
          event.changedTouches[0].screenX;
      },
      { passive: true }
    );

    carousel.addEventListener(
      "touchend",
      event => {
        touchFin =
          event.changedTouches[0].screenX;

        const diferencia =
          touchInicio - touchFin;

        if (Math.abs(diferencia) < 45) return;

        if (diferencia > 0) {
          actualizarCarrusel(slideActual + 1);
        } else {
          actualizarCarrusel(slideActual - 1);
        }

        iniciarAutomatico();
      },
      { passive: true }
    );

    actualizarCarrusel(0);
    iniciarAutomatico();
  }

  return {
    render,
    cleanup
  };
})();