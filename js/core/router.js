window.AfterRouter = (() => {
  let app;
  function init(host){app=host}
  function go(route){
    if(!window.AfterModules[route]) route="inicio";
    if(location.hash!==`#${route}`) history.pushState({route},"",`#${route}`);
    document.querySelectorAll(".nav-btn").forEach(n=>n.classList.toggle("is-active",n.dataset.route===route));
    app.classList.remove("view-enter"); void app.offsetWidth; app.classList.add("view-enter");
    window.AfterModules[route].render();
    window.scrollTo({top:0,behavior:"smooth"});
  }
  return {init,go};
})();
