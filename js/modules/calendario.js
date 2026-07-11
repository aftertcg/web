window.AfterModules=window.AfterModules||{};
window.AfterModules.calendario=(()=>{
  let shown=new Date(2026,7,1);
  function render(){
    const U=window.AfterUtils,E=window.AFTER_EVENTOS;
    const y=shown.getFullYear(),m=shown.getMonth(),first=(new Date(y,m,1).getDay()+6)%7,days=new Date(y,m+1,0).getDate();
    const month=new Intl.DateTimeFormat("es-AR",{month:"long",year:"numeric"}).format(shown);
    let cells="";
    for(let i=0;i<first;i++)cells+='<span class="day-cell empty"></span>';
    for(let d=1;d<=days;d++){const iso=`${y}-${String(m+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`,amount=E.filter(e=>e.fecha===iso).length;cells+=`<button class="day-cell ${amount?"has-event":""}" data-date="${iso}">${d}${amount?`<small>${amount}</small>`:""}</button>`}
    document.getElementById("app").innerHTML=`<section>
      <article class="card calendar-card"><div class="calendar-toolbar"><button class="btn btn-secondary" id="prev">‹</button><h2>${month}</h2><button class="btn btn-secondary" id="next">›</button></div>
      <div class="calendar-grid">${["L","M","M","J","V","S","D"].map(x=>`<span class="weekday">${x}</span>`).join("")}${cells}</div></article>
      <div class="section-head"><h2>Fechas publicadas</h2></div>
      <div class="schedule-list">${E.map(e=>`<button class="quick-card js-detail" data-event="${e.id}"><strong>${U.dateText(e.fecha)} · ${e.hora}</strong><span>${e.titulo} · ${U.availability(e)}</span></button>`).join("")}</div>
    </section>`;
    document.getElementById("prev").onclick=()=>{shown=new Date(y,m-1,1);render()};
    document.getElementById("next").onclick=()=>{shown=new Date(y,m+1,1);render()};
    document.querySelectorAll(".day-cell.has-event").forEach(b=>b.onclick=()=>{const e=E.find(x=>x.fecha===b.dataset.date);if(e)window.AfterApp.openEvent(e.id)});
    window.AfterApp.bindCommon();
  }
  return {render};
})();