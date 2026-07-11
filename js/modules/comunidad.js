window.AfterModules = window.AfterModules || {};

window.AfterModules.comunidad = (() => {
  let selectedRanking = "after-liga";

  const medal = puesto => {
    if (puesto === 1) return "🥇";
    if (puesto === 2) return "🥈";
    if (puesto === 3) return "🥉";

    return puesto;
  };

  function getRanking() {
    return (
      window.AFTER_RANKINGS.categorias.find(
        ranking => ranking.id === selectedRanking
      ) ||
      window.AFTER_RANKINGS.categorias[0]
    );
  }

  function podium(jugadores) {
    const first = jugadores.find(j => j.puesto === 1);
    const second = jugadores.find(j => j.puesto === 2);
    const third = jugadores.find(j => j.puesto === 3);

    const podiumItem = (player, cssClass) => {
      if (!player) return "";

      return `
        <div class="community-podium-player ${cssClass}">

          <div class="community-medal">
            ${medal(player.puesto)}
          </div>

          <div class="community-avatar">
            ${player.jugador.charAt(0)}
          </div>

          <strong>${player.jugador}</strong>

          <span>${player.puntos} pts</span>

        </div>
      `;
    };

    return `
      <div class="community-podium">
        ${podiumItem(second, "podium-second")}
        ${podiumItem(first, "podium-first")}
        ${podiumItem(third, "podium-third")}
      </div>
    `;
  }

  function rankingRows(jugadores) {
    return jugadores.map(player => `
      <div class="community-ranking-row">

        <div class="community-ranking-position">
          ${medal(player.puesto)}
        </div>

        <div class="community-ranking-player">
          <strong>${player.jugador}</strong>

          <span>
            ${player.eventos} eventos ·
            ${player.victorias}
            ${player.victorias === 1 ? "victoria" : "victorias"}
          </span>
        </div>

        <div class="community-ranking-points">
          ${player.puntos}
          <small>pts</small>
        </div>

      </div>
    `).join("");
  }

  function renderRankingContent() {
    const ranking = getRanking();

    const content =
      document.getElementById("community-ranking-content");

    if (!content) return;

    content.innerHTML = `
      <div class="community-ranking-title">

        <div>
          <div class="kicker">
            ${window.AFTER_RANKINGS.temporada}
          </div>

          <h2>
            ${ranking.emoji}
            ${ranking.nombre}
          </h2>
        </div>

        <span class="community-ranking-badge">
          ${ranking.jugadores.length}
          jugadores
        </span>

      </div>

      ${podium(ranking.jugadores)}

      <div class="community-ranking-list">
        ${rankingRows(ranking.jugadores)}
      </div>

      ${
        ranking.id === "after-liga"
          ? `
            <p class="community-ranking-note">
              ${window.AFTER_RANKINGS.descripcionGeneral}
            </p>
          `
          : ""
      }
    `;

    document
      .querySelectorAll(".community-ranking-filter")
      .forEach(button => {
        button.classList.toggle(
          "active",
          button.dataset.ranking === selectedRanking
        );
      });
  }

  function renderResults() {
    return window.AFTER_RESULTADOS.map(result => `
      <article class="community-result-card card">

        <div
          class="community-result-image"
          style="background-image:url('${result.imagen}')"
        >
          <span>
            ${result.categoria}
          </span>
        </div>

        <div class="community-result-body">

          <div class="kicker">
            ${window.AfterUtils.dateText(result.fecha)}
          </div>

          <h3>${result.titulo}</h3>

          <p>${result.resumen}</p>

          <div class="community-result-podium">

            ${result.podio.map(player => `
              <div>
                <span>${medal(player.puesto)}</span>
                <strong>${player.jugador}</strong>
              </div>
            `).join("")}

          </div>

          <small>
            ${result.participantes} participantes
          </small>

        </div>

      </article>
    `).join("");
  }

  function renderGallery() {
    return window.AFTER_GALERIA.map(item => `
      <article class="community-gallery-item">

        <img
          src="${item.imagen}"
          alt="${item.titulo}"
          loading="lazy"
        >

        <div class="community-gallery-caption">
          <strong>${item.titulo}</strong>
          <span>${item.texto}</span>
        </div>

      </article>
    `).join("");
  }

  function render() {
    const rankings = window.AFTER_RANKINGS.categorias;

    document.getElementById("app").innerHTML = `
      <section class="community-page">

        <div class="community-header">

          <div>
            <div class="kicker">
              Lo que pasa en After
            </div>

            <h1>Comunidad</h1>
          </div>

          <span class="community-season">
            ${window.AFTER_RANKINGS.temporada}
          </span>

        </div>


        <div class="community-ranking-filters">

          ${rankings.map(ranking => `
            <button
              class="
                community-ranking-filter
                ranking-${ranking.color}
                ${
                  ranking.id === selectedRanking
                    ? "active"
                    : ""
                }
              "
              data-ranking="${ranking.id}"
            >
              <span>${ranking.emoji}</span>
              <strong>${ranking.nombre}</strong>
            </button>
          `).join("")}

        </div>


        <article
          class="card community-ranking-card"
          id="community-ranking-content"
        ></article>


        <div class="section-head community-section-heading">

          <div>
            <div class="kicker">
              Últimos campeones
            </div>

            <h2>Resultados recientes</h2>
          </div>

        </div>

        <div class="community-results">
          ${renderResults()}
        </div>


        <div class="section-head community-section-heading">

          <div>
            <div class="kicker">
              Fotos y recuerdos
            </div>

            <h2>Momentos After</h2>
          </div>

        </div>

        <div class="community-gallery">
          ${renderGallery()}
        </div>

      </section>
    `;

    renderRankingContent();

    document
      .querySelectorAll(".community-ranking-filter")
      .forEach(button => {
        button.onclick = () => {
          selectedRanking = button.dataset.ranking;
          renderRankingContent();
        };
      });
  }

  return {
    render
  };
})();