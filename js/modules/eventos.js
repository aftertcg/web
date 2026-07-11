window.AfterModules=window.AfterModules||{};

window.AfterModules.eventos=(()=>{
  let filter="Todos";

  const FILTERS = [
    {
      nombre: "Todos",
      emoji: "✨",
      clase: "filter-all",
      subtitulo: "Ver todo"
    },
    {
      nombre: "TCG",
      emoji: "🎴",
      clase: "filter-tcg",
      subtitulo: "Cartas y torneos"
    },
    {
      nombre: "Switch",
      emoji: "🎮",
      clase: "filter-switch",
      subtitulo: "Consola y multijugador"
    },
    {
      nombre: "Casual",
      emoji: "🤝",
      clase: "filter-casual",
      subtitulo: "Jugar y compartir"
    },
    {
      nombre: "Especial",
      emoji: "⭐",
      clase: "filter-special",
      subtitulo: "Fechas diferentes"
    }
  ];

  function render(){
    const C=window.AfterComponents;
    const E=window.AFTER_EVENTOS;

    const visible=
      filter==="Todos"
        ? E
        : E.filter(evento=>evento.categoria===filter);

    document.getElementById("app").innerHTML=`
      <section>

        <div class="section-head event-page-head">
          <div>
            <div class="kicker">
              Elegí tu próxima actividad
            </div>

            <h2>
              Eventos
            </h2>
          </div>

          <span class="event-count-label">
            ${visible.length}
            ${visible.length===1 ? "evento" : "eventos"}
          </span>
        </div>

        <div class="mission-filter-wrap">

          <div class="mission-filters">

            ${FILTERS.map(item=>`
              <button
                class="
                  mission-filter
                  ${item.clase}
                  ${item.nombre===filter ? "active" : ""}
                "
                data-filter="${item.nombre}"
              >

                <span class="mission-filter-icon">
                  ${item.emoji}
                </span>

                <span class="mission-filter-text">
                  <strong>
                    ${item.nombre}
                  </strong>

                  <small>
                    ${item.subtitulo}
                  </small>
                </span>

              </button>
            `).join("")}

          </div>

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

    window.AfterApp.bindCommon();

    document
      .querySelectorAll("[data-filter]")
      .forEach(button=>{
        button.onclick=()=>{
          filter=button.dataset.filter;
          render();
        };
      });
  }

  return {
    render
  };
})();