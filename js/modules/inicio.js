window.AfterModules=window.AfterModules||{};
window.AfterModules.inicio=(()=>{
  let slide=0;
  let timer=null;

  function cleanup(){
    if(timer){
      clearInterval(timer);
      timer=null;
    }
  }

  function render(){
    cleanup();

    const C=window.AfterComponents;
    const U=window.AfterUtils;
    const E=window.AFTER_EVENTOS;
    const CFG=window.AFTER_CONFIG;

    const destacados=E.filter(x=>x.destacado);
    const up=U.upcoming();

    if(slide>=destacados.length) slide=0;

    const current=destacados[slide]||up[0]||E[0];

    const ahora = new Date();

    const eventoActivo = E.find(evento => {
      const inicio = new Date(`${evento.fecha}T${evento.hora}:00`);
      const apertura = new Date(inicio.getTime() - 30 * 60 * 1000);
      const cierre = new Date(inicio.getTime() + 4 * 60 * 60 * 1000);

      return ahora >= apertura && ahora <= cierre;
    });

    const estadoLocal = eventoActivo
      ? {
          clase: "abierto",
          titulo: "Abierto ahora",
          detalle: eventoActivo.titulo
        }
      : {
          clase: "cerrado",
          titulo: "Próxima actividad",
          detalle: `${U.dateText(current.fecha)} · ${current.hora}`
        };

    document.getElementById("app").innerHTML=`<section>

      <article class="welcome-card">
        <div class="welcome-top">
          <div class="kicker">📍 Almagro, CABA</div>

          <div class="local-status ${estadoLocal.clase}">
            <span class="status-light"></span>

            <div>
              <strong>${estadoLocal.titulo}</strong>
              <small>${estadoLocal.detalle}</small>
            </div>
          </div>
        </div>

        <h1>Más que una tienda.<br>Un lugar para jugar.</h1>

        <p>
          After TCG es un espacio de eventos para jugar cartas,
          participar en torneos, disfrutar Nintendo Switch,
          intercambiar, comer algo y compartir el hobby.
        </p>

        <div class="welcome-tags">
          <span>🎴 TCG</span>
          <span>🎮 Switch</span>
          <span>🏆 Torneos</span>
          <span>🌭 Panchitos</span>
          <span>🥤 Bebidas</span>
        </div>

        <button class="next-event-strip js-detail" data-event="${current.id}">
          <small>PRÓXIMO EVENTO</small>
          <strong>${current.titulo}</strong>
          <span>${U.dateText(current.fecha)} · ${current.hora}</span>
        </button>
      </article>

      <div class="section-head">
        <h2>Reservá tu lugar</h2>
      </div>

      <div id="hero">${C.hero(current)}</div>

      <div class="slider-dots">
        ${destacados.map((_,i)=>`
          <button
            class="slider-dot ${i===slide?"active":""}"
            data-slide="${i}"
            aria-label="Mostrar evento ${i+1}">
          </button>
        `).join("")}
      </div>

      <div class="section-head">
        <h2>Esta semana</h2>
        <button class="text-btn js-go" data-route="calendario">
          Ver calendario
        </button>
      </div>

      <div class="quick-grid">
        ${up.slice(0,3).map(e=>`
          <button class="quick-card js-detail" data-event="${e.id}">
            <strong>${e.titulo}</strong>
            <span>${U.dateText(e.fecha)} · ${e.hora}</span>
          </button>
        `).join("")}
      </div>

      <div class="section-head">
        <h2>Qué encontrás</h2>
      </div>

      <div class="quick-grid">
        <div class="quick-card">
          <strong>🏆 Torneos TCG</strong>
          <span>Competitivos y casuales.</span>
        </div>

        <div class="quick-card">
          <strong>🎮 Nintendo Switch</strong>
          <span>Multijugador y desafíos.</span>
        </div>

        <div class="quick-card">
          <strong>🥤 Comida y bebidas</strong>
          <span>Panchitos, Coca-Cola y snacks.</span>
        </div>
      </div>

      <div class="section-head">
        <h2>El espacio</h2>
        <button class="text-btn js-go" data-route="contacto">
          Cómo llegar
        </button>
      </div>

      <article class="card">
        <img
          src="assets/local/local-base.jpg"
          class="local-img"
          alt="Imagen ilustrativa de After TCG">

        <div class="contact-block">
          <h3>Un lugar para venir a jugar</h3>

          <p class="muted">
            Abrimos martes, viernes y sábado, con una propuesta distinta
            en cada fecha y cupos limitados.
          </p>

          <div class="chips">
            ${CFG.consumos.map(x=>`<span class="chip">${x}</span>`).join("")}
          </div>
        </div>
      </article>
    </section>`;

    window.AfterApp.bindCommon();

    document.querySelectorAll("[data-slide]").forEach(button=>{
      button.onclick=()=>{
        slide=Number(button.dataset.slide);
        render();
      };
    });

    if(destacados.length>1 && location.hash==="#inicio"){
      timer=setInterval(()=>{
        if(location.hash!=="#inicio"){
          cleanup();
          return;
        }

        slide=(slide+1)%destacados.length;
        render();
      },6500);
    }
  }

  return {
    render,
    cleanup
  };
})();