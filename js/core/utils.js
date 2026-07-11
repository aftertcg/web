window.AfterUtils = (() => {
  const config = () => window.AFTER_CONFIG;

  const money = n =>
    Number(n) === 0
      ? "Gratis"
      : `$${Number(n).toLocaleString("es-AR")}`;

  const dateText = iso =>
    new Intl.DateTimeFormat("es-AR", {
      weekday: "long",
      day: "numeric",
      month: "long"
    }).format(new Date(`${iso}T12:00:00`));

  const shortDate = iso =>
    new Intl.DateTimeFormat("es-AR", {
      weekday: "short",
      day: "numeric",
      month: "short"
    }).format(new Date(`${iso}T12:00:00`));

  const eventDate = e =>
    new Date(`${e.fecha}T${e.hora}:00`);

  const remaining = e =>
    Math.max(
      0,
      Number(e.cuposTotales) - Number(e.reservados)
    );

  const occupancy = e =>
    Math.min(
      100,
      Math.round(
        (Number(e.reservados) /
        Number(e.cuposTotales)) * 100
      )
    );

  const availability = e => {
    const quedan = remaining(e);

    if (quedan === 0) return "Completo";
    if (quedan === 1) return "Último lugar";
    if (quedan === 2) return "Últimos 2 lugares";

    return `${quedan} lugares disponibles`;
  };

  const availabilityClass = e => {
    const quedan = remaining(e);

    if (quedan === 0) return "is-full";
    if (quedan === 1) return "is-last";
    if (quedan === 2) return "is-low";

    return "is-available";
  };

  const whatsappEvent = e => {
    const msg =
      `Hola After TCG, quiero reservar un lugar para ` +
      `"${e.titulo}" del ${dateText(e.fecha)} ` +
      `a las ${e.hora}.`;

    return (
      `https://wa.me/${config().whatsapp}` +
      `?text=${encodeURIComponent(msg)}`
    );
  };

  const upcoming = () => {
    const now = new Date();

    const future = [...window.AFTER_EVENTOS]
      .filter(e => eventDate(e) >= now)
      .sort(
        (a, b) =>
          eventDate(a) - eventDate(b)
      );

    return future.length
      ? future
      : [...window.AFTER_EVENTOS];
  };

  const countdown = e => {
    const distancia =
      eventDate(e).getTime() - Date.now();

    if (distancia <= 0) {
      return "El evento ya comenzó";
    }

    const minutosTotales =
      Math.floor(distancia / 60000);

    const dias =
      Math.floor(minutosTotales / 1440);

    const horas =
      Math.floor(
        (minutosTotales % 1440) / 60
      );

    const minutos =
      minutosTotales % 60;

    if (dias > 0) {
      return (
        `Faltan ${dias} día${dias === 1 ? "" : "s"} ` +
        `y ${horas} h`
      );
    }

    if (horas > 0) {
      return (
        `Faltan ${horas} h y ${minutos} min`
      );
    }

    return `Faltan ${minutos} minutos`;
  };

  const progress = e => `
    <div class="progress-block">
      <div class="progress-head">
        <b>
          ${e.reservados} / ${e.cuposTotales}
          jugadores
        </b>

        <span
          class="availability ${availabilityClass(e)}"
        >
          ${availability(e)}
        </span>
      </div>

      <div
        class="progress ${availabilityClass(e)}"
      >
        <span
          style="width:${occupancy(e)}%"
        ></span>
      </div>
    </div>
  `;

  return {
    money,
    dateText,
    shortDate,
    eventDate,
    remaining,
    occupancy,
    availability,
    availabilityClass,
    whatsappEvent,
    upcoming,
    countdown,
    progress
  };
})();
