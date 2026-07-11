window.AfterUI = (() => {
  let timer = null;

  const eventDate = event =>
    new Date(`${event.fecha}T${event.hora}:00`);

  function currentRoute() {
    return location.hash.slice(1) || "inicio";
  }

  function setSectionTheme() {
    document.body.dataset.section = currentRoute();
  }

  function formatShort(event) {
    const day = new Intl.DateTimeFormat("es-AR", {
      weekday: "short",
      day: "numeric",
      month: "short"
    }).format(new Date(`${event.fecha}T12:00:00`));

    return `${day} · ${event.hora}`;
  }

  function countdownText(distance) {
    const totalMinutes = Math.max(
      0,
      Math.floor(distance / 60000)
    );

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (hours > 0) {
      return `${hours} h ${minutes} min`;
    }

    return `${minutes} min`;
  }

  function getStatus() {
    const events = [...(window.AFTER_EVENTOS || [])]
      .sort(
        (a, b) =>
          eventDate(a) - eventDate(b)
      );

    const now = new Date();

    const active = events.find(event => {
      const start = eventDate(event);

      const opening = new Date(
        start.getTime() - 30 * 60 * 1000
      );

      const closing = new Date(
        start.getTime() + 4 * 60 * 60 * 1000
      );

      return now >= opening && now <= closing;
    });

    if (active) {
      return {
        state: "open",
        title: "Abierto ahora",
        detail: active.titulo
      };
    }

    const next = events.find(
      event => eventDate(event) > now
    );

    if (!next) {
      return {
        state: "idle",
        title: "After TCG",
        detail: "Almagro, CABA"
      };
    }

    const distance =
      eventDate(next).getTime() - now.getTime();

    if (distance <= 2 * 60 * 60 * 1000) {
      return {
        state: "soon",
        title: `Comienza en ${countdownText(distance)}`,
        detail: next.titulo
      };
    }

    return {
      state: "next",
      title: "Próxima actividad",
      detail: formatShort(next)
    };
  }

  function updateHeader() {
    const box =
      document.getElementById("topbar-live");

    const title =
      document.getElementById("topbar-live-title");

    const detail =
      document.getElementById("topbar-live-detail");

    if (!box || !title || !detail) return;

    const status = getStatus();

    box.className =
      `topbar-live is-${status.state}`;

    title.textContent = status.title;
    detail.textContent = status.detail;
  }

  function bindBrand() {
    const brand =
      document.querySelector(".topbar-brand");

    if (!brand) return;

    brand.onclick = () => {
      window.AfterRouter.go("inicio");
    };
  }

  function init() {
    setSectionTheme();
    updateHeader();
    bindBrand();

    window.addEventListener(
      "hashchange",
      setSectionTheme
    );

    clearInterval(timer);

    timer = setInterval(
      updateHeader,
      30000
    );
  }

  return { init, updateHeader };
})();

document.addEventListener(
  "DOMContentLoaded",
  window.AfterUI.init
);
