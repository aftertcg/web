window.AfterModules=window.AfterModules||{};
window.AfterModules.inicio=(()=>{
  let slide=0,timer;
  function render(){
    clearInterval(timer);
    const C=window.AfterComponents,U=window.AfterUtils,E=window.AFTER_EVENTOS,CFG=window.AFTER_CONFIG;
    const destacados=E.filter(x=>x.destacado), up=U.upcoming();
    if(slide>=destacados.length)slide=0;
    const current=destacados[slide]||up[0]||E[0];
    document.getElementById("app").innerHTML=`<section>
      <div id="hero">${C.hero(current)}</div>
      <div class="slider-dots">${destacados.map((_,i)=>`<button class="slider-dot ${i===slide?"active":""}" data-slide="${i}"></button>`).join("")}</div>
      <div class="section-head"><h2>Esta semana</h2><button class="text-btn js-go" data-route="calendario">Ver calendario</button></div>
      <div class="quick-grid">${up.slice(0,3).map(e=>`<button class="quick-card js-detail" data-event="${e.id}"><strong>${e.titulo}</strong><span>${U.dateText(e.fecha)} · ${e.hora}</span></button>`).join("")}</div>
      <div class="section-head"><h2>Qué encontrás</h2></div>
      <div class="quick-grid">
        <div class="quick-card"><strong>🏆 Torneos TCG</strong><span>Competitivos y casuales.</span></div>
        <div class="quick-card"><strong>🎮 Nintendo Switch</strong><span>Multijugador y desafíos.</span></div>
        <div class="quick-card"><strong>🥤 Comida y bebidas</strong><span>Panchitos, Coca-Cola y snacks.</span></div>
      </div>
      <div class="section-head"><h2>El espacio</h2><button class="text-btn js-go" data-route="contacto">Cómo llegar</button></div>
      <article class="card"><img src="assets/local/local-base.jpg" class="local-img" alt="Imagen ilustrativa de After TCG"><div class="contact-block"><h3>Un lugar para venir a jugar</h3><p class="muted">Abrimos martes, viernes y sábado, con una propuesta distinta en cada fecha y cupos limitados.</p><div class="chips">${CFG.consumos.map(x=>`<span class="chip">${x}</span>`).join("")}</div></div></article>
    </section>`;
    window.AfterApp.bindCommon();
    document.querySelectorAll("[data-slide]").forEach(b=>b.onclick=()=>{slide=Number(b.dataset.slide);render()});
    if(destacados.length>1) timer=setInterval(()=>{slide=(slide+1)%destacados.length;render()},6500);
  }
  return {render};
})();