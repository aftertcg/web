window.AfterModules=window.AfterModules||{};
window.AfterModules.eventos=(()=>{
  let filter="Todos";
  function render(){
    const C=window.AfterComponents,E=window.AFTER_EVENTOS;
    const filters=["Todos","TCG","Switch","Casual","Especial"];
    const visible=filter==="Todos"?E:E.filter(x=>x.categoria===filter);
    document.getElementById("app").innerHTML=`<section>
      <div class="section-head"><h2>Eventos</h2></div>
      <div class="filters">${filters.map(f=>`<button class="filter ${f===filter?"active":""}" data-filter="${f}">${f}</button>`).join("")}</div>
      <div class="event-list spaced">${visible.length?visible.map(C.eventCard).join(""):'<div class="empty-state">No hay eventos en esta categoría.</div>'}</div>
    </section>`;
    window.AfterApp.bindCommon();
    document.querySelectorAll("[data-filter]").forEach(b=>b.onclick=()=>{filter=b.dataset.filter;render()});
  }
  return {render};
})();