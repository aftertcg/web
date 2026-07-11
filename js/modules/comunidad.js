window.AfterModules=window.AfterModules||{};
window.AfterModules.comunidad=(()=>{
  function render(){
    const C=window.AfterComponents,COM=window.AFTER_COMUNIDAD,E=window.AFTER_EVENTOS;
    document.getElementById("app").innerHTML=`<section>
      <div class="section-head"><h2>Comunidad</h2></div>
      <article class="card contact-block"><div class="kicker">${COM.temporada}</div><h2>Ranking del mes</h2>
      <div class="rank-list">${COM.ranking.map(r=>`<div class="rank-row"><div class="rank-place">${r.puesto}</div><div><b>${r.jugador}</b><br><small>${r.participaciones} participaciones · ${r.ultimoResultado}</small></div><strong>${r.puntos} pts</strong></div>`).join("")}</div>
      <p class="muted tiny">Ranking cargado manualmente por la tienda. No requiere cuenta.</p></article>
      <div class="section-head"><h2>Novedades</h2></div>
      <div class="news-list">${COM.novedades.map(n=>`<article class="card news"><h3>${n.titulo}</h3><p>${n.texto}</p></article>`).join("")}</div>
      <div class="section-head"><h2>Próximos encuentros</h2></div><div class="event-list">${E.slice(0,2).map(C.eventCard).join("")}</div>
    </section>`;
    window.AfterApp.bindCommon();
  }
  return {render};
})();