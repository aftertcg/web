import { escapeHTML, friendlyError, loadJSON, qs } from "./utils.js";

export async function renderRanking() {
  const target = qs("[data-ranking]");
  const featuredTarget = qs("[data-featured-player]");

  try {
    const data = await loadJSON("data/ranking.json");
    target.innerHTML = `
      <table>
        <thead>
          <tr>
            <th>Posición</th>
            <th>Jugador</th>
            <th>Puntos</th>
            <th>Participaciones</th>
            <th>Último resultado</th>
          </tr>
        </thead>
        <tbody>
          ${data.players.map((player) => `
            <tr>
              <td>${escapeHTML(player.position)}</td>
              <td>${escapeHTML(player.name)}</td>
              <td>${escapeHTML(player.points)} pts</td>
              <td>${escapeHTML(player.participations)}</td>
              <td>${escapeHTML(player.lastResult)}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    `;

    featuredTarget.innerHTML = `
      <p class="eyebrow">Jugador destacado</p>
      <h2>${escapeHTML(data.featured.name)}</h2>
      <p>${escapeHTML(data.featured.description)}</p>
      <div class="stat-grid">
        ${data.featured.stats.map((stat) => `
          <div class="stat-box">
            <span>${escapeHTML(stat.label)}</span>
            <strong>${escapeHTML(stat.value)}</strong>
          </div>
        `).join("")}
      </div>
    `;
  } catch {
    friendlyError(target, "el ranking");
    if (featuredTarget) featuredTarget.innerHTML = "";
  }
}
