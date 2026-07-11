window.AfterRouter=(()=>{
  let app;
  let currentRoute=null;

  function init(host){
    app=host;
  }

  function cleanupCurrentRoute(){
    if(!currentRoute) return;

    const currentModule=window.AfterModules[currentRoute];

    if(currentModule && typeof currentModule.cleanup==="function"){
      currentModule.cleanup();
    }
  }

  function go(route){
    if(!window.AfterModules[route]){
      route="inicio";
    }

    if(currentRoute!==route){
      cleanupCurrentRoute();
    }

    currentRoute=route;

    if(location.hash!==`#${route}`){
      history.pushState({route},"",`#${route}`);
    }

    document.querySelectorAll(".nav-btn").forEach(button=>{
      button.classList.toggle(
        "is-active",
        button.dataset.route===route
      );
    });

    app.classList.remove("view-enter");
    void app.offsetWidth;
    app.classList.add("view-enter");

    window.AfterModules[route].render();

    window.scrollTo({
      top:0,
      behavior:"smooth"
    });
  }

  return {
    init,
    go
  };
})();