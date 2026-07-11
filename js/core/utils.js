window.AfterUtils = (() => {
  const config = () => window.AFTER_CONFIG;
  const money = n => Number(n) === 0 ? "Gratis" : `$${Number(n).toLocaleString("es-AR")}`;
  const dateText = iso => new Intl.DateTimeFormat("es-AR",{weekday:"long",day:"numeric",month:"long"}).format(new Date(`${iso}T12:00:00`));
  const remaining = e => Math.max(0,e.cuposTotales-e.reservados);
  const occupancy = e => Math.min(100,Math.round((e.reservados/e.cuposTotales)*100));
  const availability = e => remaining(e)===0?"Completo":remaining(e)<=2?`Últimos ${remaining(e)}`:`${remaining(e)} lugares`;
  const whatsappEvent = e => {
    const msg=`Hola After TCG, quiero reservar un lugar para "${e.titulo}" del ${dateText(e.fecha)} a las ${e.hora}.`;
    return `https://wa.me/${config().whatsapp}?text=${encodeURIComponent(msg)}`;
  };
  const upcoming = () => {
    const now=new Date();
    const future=[...window.AFTER_EVENTOS].filter(e=>new Date(`${e.fecha}T${e.hora}`)>=now).sort((a,b)=>new Date(`${a.fecha}T${a.hora}`)-new Date(`${b.fecha}T${b.hora}`));
    return future.length?future:[...window.AFTER_EVENTOS];
  };
  const progress = e => `<div class="progress-block"><div class="progress-head"><b>${e.reservados}/${e.cuposTotales} cupos</b><span>${availability(e)}</span></div><div class="progress"><span style="width:${occupancy(e)}%"></span></div></div>`;
  return {money,dateText,remaining,occupancy,availability,whatsappEvent,upcoming,progress};
})();
