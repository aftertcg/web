window.AfterModules=window.AfterModules||{};
window.AfterModules.contacto=(()=>{
  function render(){
    const C=window.AFTER_CONFIG;
    document.getElementById("app").innerHTML=`<section>
      <article class="card"><img src="assets/local/local-base.jpg" class="local-img" alt="Imagen ilustrativa de After TCG"><div class="contact-block"><div class="kicker">Nuestro local</div><h1>After TCG</h1><p class="muted">${C.direccion}</p><div class="button-grid"><a class="btn btn-primary" href="${C.mapsUrl}" target="_blank" rel="noopener">Abrir Maps</a><a class="btn btn-secondary" href="${C.instagramUrl}" target="_blank" rel="noopener">Instagram</a></div></div></article>
      <div class="section-head"><h2>Ubicación</h2></div><iframe class="map" src="${C.mapsEmbed}" loading="lazy" title="Mapa de After TCG"></iframe>
      <div class="section-head"><h2>Días de apertura</h2></div><article class="card contact-block">${C.dias.map(d=>`<div class="contact-line"><b>${d.nombre}</b><span>${d.horario}</span></div>`).join("")}</article>
      <div class="section-head"><h2>Contacto</h2></div><article class="card contact-block"><div class="contact-line"><b>WhatsApp</b><span>${C.telefonoVisible}</span></div><div class="contact-line"><b>Instagram</b><span>${C.instagram}</span></div><a class="btn btn-primary top-gap" href="https://wa.me/${C.whatsapp}?text=${encodeURIComponent(C.mensajeGeneral)}" target="_blank" rel="noopener">Escribir por WhatsApp</a></article>
    </section>`;
  }
  return {render};
})();