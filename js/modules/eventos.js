window.AfterModules=window.AfterModules||{};

window.AfterModules.eventos=(()=>{
  let filter="Todos";

  const FILTERS = [
    { nombre:"Todos", emoji:"✨", clase:"filter-all" },
    { nombre:"TCG", emoji:"🎴", clase:"filter-tcg" },
    { nombre:"Switch", emoji:"🎮", clase:"filter-switch" },
    { nombre:"Casual", emoji:"🤝", clase:"filter-casual" },
    { nombre:"Especial", emoji:"⭐", clase:"filter-special" }
  ];

  function getVisible(){
    const E=window.AFTER_EVENTOS;

    return filter==="Todos"
      ? E
      : E.filter(evento=>evento.categoria===filter);
  }

  function renderEventList(){
    const C=window.AfterComponents;
    const visible=getVisible();

    const list=document.getElementById("event-list");
    const count=document.getElementById("event-count");

    if(count){
      count.textContent=
        `${visible.length} ${visible.length===1?"evento":"eventos"}`;
    }

    if(list){
      list.innerHTML=
        visible.length
          ? visible.map(C.eventCard).join("")
          : `<div class="empty-state">
              No hay eventos en esta categoría.
            </div>`;
    }

    document.querySelectorAll(".compact-filter").forEach(button=>{
      button.classList.toggle(
        "active",
        button.dataset.filter===filter
      );
    });

    window.AfterApp.bindCommon();
  }

  function render(){
    const visible=getVisible();

    document.getElementById("app").innerHTML=`
      <section>

        <div class="section-head event-page-head">
          <div>
            <div class="kicker">
              Elegí tu próxima actividad
            </div>

            <h2>Eventos</h2>
          </div>

          <span
            class="event-count-label"
            id="event-count"
          >
            ${visible.length}
            ${visible.length===1?"evento":"eventos"}
          </span>
        </div>

        <div class="compact-filter-grid">

          ${FILTERS.map(item=>`
            <button
              class="
                compact-filter
                ${item.clase}
                ${item.nombre===filter?"active":""}
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

        <div
          class="event-list spaced"
          id="event-list"
        >
          ${
            visible.length
              ? visible
                  .map(window.AfterComponents.eventCard)
                  .join("")
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
      .querySelectorAll(".compact-filter")
      .forEach(button=>{
        button.onclick=()=>{
          if(filter===button.dataset.filter){
            return;
          }

          filter=button.dataset.filter;

          renderEventList();
        };
      });
  }

  return {
    render
  };
})();