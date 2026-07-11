window.AfterComponents = (() => {
  const U=window.AfterUtils;
  function eventCard(e){
    return `<article class="card event-card">
      <div class="event-img" style="background-image:url('${e.imagen}')"></div>
      <div class="event-content">
        <div class="kicker">${U.dateText(e.fecha)} · ${e.hora}</div>
        <h3>${e.titulo}</h3><p>${e.resumen}</p>${U.progress(e)}
        <div class="event-bottom"><span class="price">${U.money(e.precio)}</span><button class="btn btn-secondary js-detail" data-event="${e.id}">Ver evento</button></div>
      </div>
    </article>`;
  }
  function hero(e){
    return `<article class="card hero" style="background-image:url('${e.imagen}')">
      <div class="hero-content">
        <div class="kicker">Próxima misión · ${e.categoria}</div>
        <h1>${e.titulo}</h1><p class="hero-desc">${e.resumen}</p>
        <div class="pills"><span class="pill">📅 ${U.dateText(e.fecha)}</span><span class="pill">🕒 ${e.hora}</span><span class="pill">👥 ${e.cuposTotales} cupos</span></div>
        ${U.progress(e)}
        <button class="btn btn-primary js-reserve" data-event="${e.id}" ${U.remaining(e)===0?"disabled":""}>${U.remaining(e)===0?"Evento completo":"Reservar mi lugar"}</button>
      </div>
    </article>`;
  }
  return {eventCard,hero};
})();
