window.AfterApp=(()=>{
  const app=document.getElementById("app"),modal=document.getElementById("event-modal"),content=document.getElementById("modal-content");
  const U=window.AfterUtils;
  function openEvent(id){
    const e=window.AFTER_EVENTOS.find(x=>x.id===id);if(!e)return;
    content.innerHTML=`<div class="modal-image" style="background-image:url('${e.imagen}')"></div><div class="modal-body"><span class="tag">${e.categoria} · ${e.modalidad}</span><h2>${e.titulo}</h2><p>${e.descripcion}</p><div class="pills"><span class="pill">📅 ${U.dateText(e.fecha)}</span><span class="pill">🕒 ${e.hora}</span><span class="pill">🎟 ${U.money(e.precio)}</span></div><h3>Incluye</h3><ul>${e.incluye.map(x=>`<li>${x}</li>`).join("")}</ul>${U.progress(e)}<a class="btn btn-primary" ${U.remaining(e)?`href="${U.whatsappEvent(e)}" target="_blank" rel="noopener"`:'aria-disabled="true"'}>${U.remaining(e)?"Reservar mi lugar":"Evento completo"}</a></div>`;
    modal.showModal();
  }
  function bindCommon(){
    document.querySelectorAll(".js-detail").forEach(b=>b.onclick=()=>openEvent(b.dataset.event));
    document.querySelectorAll(".js-reserve").forEach(b=>b.onclick=()=>{const e=window.AFTER_EVENTOS.find(x=>x.id===b.dataset.event);if(e&&U.remaining(e))window.open(U.whatsappEvent(e),"_blank")});
    document.querySelectorAll(".js-go").forEach(b=>b.onclick=()=>window.AfterRouter.go(b.dataset.route));
  }
  function init(){
    window.AfterRouter.init(app);
    document.querySelectorAll(".nav-btn").forEach(b=>b.onclick=()=>window.AfterRouter.go(b.dataset.route));
    document.querySelector(".modal-close").onclick=()=>modal.close();
    modal.addEventListener("click",e=>{if(e.target===modal)modal.close()});
    window.addEventListener("popstate",()=>window.AfterRouter.go(location.hash.slice(1)||"inicio"));
    window.AfterRouter.go(location.hash.slice(1)||"inicio");
    if("serviceWorker" in navigator&&location.protocol.startsWith("http"))navigator.serviceWorker.register("./service-worker.js").catch(()=>{});
  }
  return {init,bindCommon,openEvent};
})();
document.addEventListener("DOMContentLoaded",window.AfterApp.init);
