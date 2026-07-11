window.AfterModules = window.AfterModules || {};

window.AfterModules.contacto = (() => {
  function renderFaq() {
    const preguntas = [
      {
        pregunta: "¿Tengo que reservar para ir?",
        respuesta:
          "Para los eventos con cupos limitados sí. La reserva se confirma por WhatsApp. Para fechas abiertas o encuentros casuales, revisá siempre la agenda."
      },
      {
        pregunta: "¿Puedo ir aunque no participe de un torneo?",
        respuesta:
          "Sí. Dependiendo de la actividad podés venir a jugar casual, intercambiar cartas, usar la Nintendo Switch, abrir sobres o pasar el rato."
      },
      {
        pregunta: "¿Puedo llevar comida o bebida?",
        respuesta:
          "En el local ofrecemos panchitos, bebidas frías, agua y snacks. Para consumir productos externos, consultanos antes."
      },
      {
        pregunta: "¿Puedo llevar mi mazo, binder o consola?",
        respuesta:
          "Podés traer tu mazo, binder y cartas para jugar o intercambiar. Si querés llevar una consola o accesorio propio, consultanos por WhatsApp."
      }
    ];

    return preguntas.map((item, index) => `
      <article class="visit-faq-item">
        <button
          class="visit-faq-question"
          data-faq="${index}"
          aria-expanded="false"
        >
          <span>${item.pregunta}</span>
          <b>+</b>
        </button>

        <div class="visit-faq-answer">
          <p>${item.respuesta}</p>
        </div>
      </article>
    `).join("");
  }

  function render() {
    const C = window.AFTER_CONFIG;

    document.getElementById("app").innerHTML = `
      <section class="visit-page">

        <div class="visit-header">
          <div>
            <div class="kicker">
              📍 Almagro, CABA
            </div>

            <h1>Visítanos</h1>

            <p>
              Conocé el espacio, mirá cómo llegar y escribinos
              antes de venir.
            </p>
          </div>
        </div>


        <article class="card visit-location-card">

          <img
            src="assets/local/local-base.jpg"
            alt="Imagen ilustrativa del local After TCG"
            class="visit-location-image"
          >

          <div class="visit-location-content">

            <div class="visit-address">

              <div class="visit-address-icon">
                📍
              </div>

              <div>
                <small>Nuestra dirección</small>

                <strong>
                  ${C.direccion}
                </strong>

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
              Abrir en Google Maps
            </a>

          </div>

        </article>


        <div class="section-head visit-section-head">
          <div>
            <div class="kicker">
              Ubicación
            </div>

            <h2>Cómo llegar</h2>
          </div>
        </div>

        <iframe
          class="visit-map"
          src="${C.mapsEmbed}"
          loading="lazy"
          title="Ubicación de After TCG"
        ></iframe>


        <div class="section-head visit-section-head">
          <div>
            <div class="kicker">
              Antes de venir
            </div>

            <h2>Días de actividad</h2>
          </div>
        </div>

        <article class="card visit-days-card">

          ${C.dias.map(day => `
            <div class="visit-day-row">

              <div class="visit-day-name">
                <strong>${day.nombre}</strong>
              </div>

              <div class="visit-day-status">
                <span>${day.horario}</span>
              </div>

            </div>
          `).join("")}

          <p class="visit-note">
            After TCG funciona principalmente mediante actividades
            programadas. Los horarios dependen del evento del día.
            Revisá la agenda antes de venir.
          </p>

        </article>


        <div class="section-head visit-section-head">
          <div>
            <div class="kicker">
              El espacio
            </div>

            <h2>Qué vas a encontrar</h2>
          </div>
        </div>

        <div class="visit-features">

          <article class="visit-feature">
            <span>🎴</span>
            <strong>Mesas para TCG</strong>
            <p>Torneos, partidas casuales e intercambios.</p>
          </article>

          <article class="visit-feature">
            <span>🎮</span>
            <strong>Nintendo Switch</strong>
            <p>Juegos multijugador y actividades especiales.</p>
          </article>

          <article class="visit-feature">
            <span>🌭</span>
            <strong>Comida</strong>
            <p>Panchitos y opciones simples para acompañar la actividad.</p>
          </article>

          <article class="visit-feature">
            <span>🥤</span>
            <strong>Bebidas y snacks</strong>
            <p>Bebidas frías, agua y snacks.</p>
          </article>

          <article class="visit-feature">
            <span>🤝</span>
            <strong>Comunidad</strong>
            <p>Un lugar para conocer gente y compartir el hobby.</p>
          </article>

          <article class="visit-feature">
            <span>✨</span>
            <strong>Eventos temáticos</strong>
            <p>Cada fecha tiene una propuesta distinta.</p>
          </article>

        </div>


        <div class="section-head visit-section-head">
          <div>
            <div class="kicker">
              Reservas y consultas
            </div>

            <h2>Contactanos</h2>
          </div>
        </div>

        <div class="visit-contact-grid">

          <a
            class="visit-contact-card visit-whatsapp"
            href="https://wa.me/${C.whatsapp}?text=${encodeURIComponent(C.mensajeGeneral)}"
            target="_blank"
            rel="noopener"
          >
            <div class="visit-contact-icon">
              💬
            </div>

            <div>
              <strong>WhatsApp</strong>
              <span>${C.telefonoVisible}</span>
              <small>Reservas, cupos y consultas.</small>
            </div>
          </a>

          <a
            class="visit-contact-card visit-instagram"
            href="${C.instagramUrl}"
            target="_blank"
            rel="noopener"
          >
            <div class="visit-contact-icon">
              📸
            </div>

            <div>
              <strong>Instagram</strong>
              <span>${C.instagram}</span>
              <small>Fotos, anuncios y novedades.</small>
            </div>
          </a>

        </div>


        <div class="section-head visit-section-head">
          <div>
            <div class="kicker">
              Información útil
            </div>

            <h2>Preguntas frecuentes</h2>
          </div>
        </div>

        <div class="visit-faq">
          ${renderFaq()}
        </div>

      </section>
    `;

    document
      .querySelectorAll(".visit-faq-question")
      .forEach(button => {
        button.onclick = () => {
          const item = button.closest(".visit-faq-item");
          const estaAbierto = item.classList.contains("is-open");

          document
            .querySelectorAll(".visit-faq-item")
            .forEach(other => {
              other.classList.remove("is-open");

              const otherButton =
                other.querySelector(".visit-faq-question");

              otherButton.setAttribute(
                "aria-expanded",
                "false"
              );

              otherButton.querySelector("b").textContent = "+";
            });

          if (!estaAbierto) {
            item.classList.add("is-open");

            button.setAttribute(
              "aria-expanded",
              "true"
            );

            button.querySelector("b").textContent = "−";
          }
        };
      });
  }

  return {
    render
  };
})();