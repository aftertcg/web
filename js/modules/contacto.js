window.AfterModules = window.AfterModules || {};

window.AfterModules.contacto = (() => {
  function getNextEvent() {
    const eventos = window.AfterUtils.upcoming();

    return eventos.length ? eventos[0] : null;
  }

  function renderFaq() {
    const items = [
      {
        pregunta: "¿Hace falta reservar?",
        respuesta:
          "Sí, la mayoría de los eventos tiene cupos limitados. La reserva se confirma por WhatsApp."
      },
      {
        pregunta: "¿Puedo venir sin jugar un torneo?",
        respuesta:
          "Sí. También organizamos encuentros casuales, intercambios, aperturas y noches de Switch."
      },
      {
        pregunta: "¿Puedo traer mi mazo o binder?",
        respuesta:
          "Sí. Podés traer tus cartas, mazos, carpetas y accesorios para jugar o intercambiar."
      },
      {
        pregunta: "¿Hay comida y bebida?",
        respuesta:
          "Sí. Hay panchitos, bebidas frías, agua y snacks para consumir durante la actividad."
      }
    ];

    return items.map((item, index) => `
      <article class="contact-faq-item">
        <button
          class="contact-faq-question"
          data-faq="${index}"
          aria-expanded="false"
        >
          <span>${item.pregunta}</span>
          <b>+</b>
        </button>

        <div class="contact-faq-answer">
          <p>${item.respuesta}</p>
        </div>
      </article>
    `).join("");
  }

  function render() {
    const C = window.AFTER_CONFIG;
    const U = window.AfterUtils;
    const next = getNextEvent();

    document.getElementById("app").innerHTML = `
      <section class="contact-page">

        <article class="contact-hero card">

          <img
            src="assets/local/local-base.jpg"
            alt="Imagen ilustrativa de After TCG"
            class="contact-hero-image"
          >

          <div class="contact-hero-overlay"></div>

          <div class="contact-hero-content">

            <div class="kicker">
              📍 Almagro, CABA
            </div>

            <h1>Vení a conocer After TCG</h1>

            <p>
              Un espacio para jugar TCG, participar de torneos,
              disfrutar Nintendo Switch, comer algo y compartir
              el hobby con la comunidad.
            </p>

            <div class="contact-hero-actions">

              <a
                class="btn btn-primary"
                href="${C.mapsUrl}"
                target="_blank"
                rel="noopener"
              >
                Abrir Google Maps
              </a>

              <a
                class="btn btn-secondary contact-instagram-btn"
                href="${C.instagramUrl}"
                target="_blank"
                rel="noopener"
              >
                Instagram
              </a>

            </div>

          </div>

        </article>


        ${
          next
            ? `
              <article class="card contact-next-event">

                <div class="contact-next-event-top">

                  <div>
                    <div class="kicker">
                      Próxima actividad
                    </div>

                    <h2>${next.titulo}</h2>
                  </div>

                  <span class="contact-event-category">
                    ${next.categoria}
                  </span>

                </div>

                <div class="contact-next-event-meta">

                  <span>
                    📅 ${U.dateText(next.fecha)}
                  </span>

                  <span>
                    🕒 ${next.hora}
                  </span>

                  <span>
                    👥 ${U.availability(next)}
                  </span>

                </div>

                ${U.progress(next)}

                <div class="contact-event-buttons">

                  <button
                    class="btn btn-secondary js-detail"
                    data-event="${next.id}"
                  >
                    Ver evento
                  </button>

                  <button
                    class="btn btn-primary js-reserve"
                    data-event="${next.id}"
                    ${
                      U.remaining(next) === 0
                        ? "disabled"
                        : ""
                    }
                  >
                    ${
                      U.remaining(next) === 0
                        ? "Completo"
                        : "Reservar"
                    }
                  </button>

                </div>

              </article>
            `
            : ""
        }


        <div class="section-head contact-section-head">

          <div>
            <div class="kicker">
              Cómo llegar
            </div>

            <h2>Ubicación</h2>
          </div>

        </div>

        <article class="card contact-location-card">

          <div class="contact-location-info">

            <div class="contact-location-icon">
              📍
            </div>

            <div>
              <strong>${C.direccion}</strong>

              <span>
                Almagro, Ciudad Autónoma de Buenos Aires
              </span>
            </div>

          </div>

          <a
            class="btn btn-primary"
            href="${C.mapsUrl}"
            target="_blank"
            rel="noopener"
          >
            Ver recorrido
          </a>

        </article>

        <iframe
          class="contact-map"
          src="${C.mapsEmbed}"
          loading="lazy"
          title="Mapa de After TCG"
        ></iframe>


        <div class="section-head contact-section-head">

          <div>
            <div class="kicker">
              Días de actividad
            </div>

            <h2>Horarios</h2>
          </div>

        </div>

        <article class="card contact-schedule-card">

          ${C.dias.map(day => `
            <div class="contact-schedule-row">

              <div class="contact-day-icon">
                ${
                  day.nombre === "Martes"
                    ? "🎴"
                    : day.nombre === "Viernes"
                      ? "🏆"
                      : "🎮"
                }
              </div>

              <div>
                <strong>${day.nombre}</strong>

                <span>${day.horario}</span>
              </div>

            </div>
          `).join("")}

          <p class="contact-schedule-note">
            Los horarios pueden variar según la actividad.
            Consultá el calendario antes de venir.
          </p>

        </article>


        <div class="section-head contact-section-head">

          <div>
            <div class="kicker">
              Reservas y consultas
            </div>

            <h2>Contacto directo</h2>
          </div>

        </div>

        <div class="contact-direct-grid">

          <a
            class="contact-direct-card contact-whatsapp"
            href="https://wa.me/${C.whatsapp}?text=${encodeURIComponent(C.mensajeGeneral)}"
            target="_blank"
            rel="noopener"
          >

            <div class="contact-direct-icon">
              💬
            </div>

            <div>
              <strong>WhatsApp</strong>
              <span>${C.telefonoVisible}</span>
              <small>Consultas, reservas y cupos</small>
            </div>

          </a>

          <a
            class="contact-direct-card contact-instagram"
            href="${C.instagramUrl}"
            target="_blank"
            rel="noopener"
          >

            <div class="contact-direct-icon">
              📸
            </div>

            <div>
              <strong>Instagram</strong>
              <span>${C.instagram}</span>
              <small>Fotos, anuncios y novedades</small>
            </div>

          </a>

        </div>


        <div class="section-head contact-section-head">

          <div>
            <div class="kicker">
              La experiencia
            </div>

            <h2>Qué vas a encontrar</h2>
          </div>

        </div>

        <div class="contact-features">

          <div>
            <span>🎴</span>
            <strong>TCG</strong>
          </div>

          <div>
            <span>🎮</span>
            <strong>Switch</strong>
          </div>

          <div>
            <span>🌭</span>
            <strong>Panchitos</strong>
          </div>

          <div>
            <span>🥤</span>
            <strong>Bebidas</strong>
          </div>

          <div>
            <span>🍿</span>
            <strong>Snacks</strong>
          </div>

          <div>
            <span>👥</span>
            <strong>Comunidad</strong>
          </div>

        </div>


        <div class="section-head contact-section-head">

          <div>
            <div class="kicker">
              Antes de venir
            </div>

            <h2>Preguntas frecuentes</h2>
          </div>

        </div>

        <div class="contact-faq">
          ${renderFaq()}
        </div>

      </section>
    `;

    window.AfterApp.bindCommon();

    document
      .querySelectorAll(".contact-faq-question")
      .forEach(button => {
        button.onclick = () => {
          const item = button.closest(
            ".contact-faq-item"
          );

          const isOpen =
            item.classList.contains("is-open");

          document
            .querySelectorAll(".contact-faq-item")
            .forEach(other => {
              other.classList.remove("is-open");

              const otherButton =
                other.querySelector(
                  ".contact-faq-question"
                );

              otherButton.setAttribute(
                "aria-expanded",
                "false"
              );

              otherButton.querySelector("b")
                .textContent = "+";
            });

          if (!isOpen) {
            item.classList.add("is-open");

            button.setAttribute(
              "aria-expanded",
              "true"
            );

            button.querySelector("b")
              .textContent = "−";
          }
        };
      });
  }

  return {
    render
  };
})();