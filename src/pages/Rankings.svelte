<script>
  import { tournamentStore } from '../stores/tournamentStore.js';
  import { selectedTournamentId } from '../stores/uiStore.js';
  import { rankingService } from '../services/rankingService.js';

  $: activeId = $selectedTournamentId || ($tournamentStore[0] ? $tournamentStore[0].id : null);
  $: currentTournament = $tournamentStore.find((t) => t.id === activeId);
  $: rankings = activeId ? rankingService.getTournamentRankings(activeId) : [];
  $: podium = activeId ? rankingService.getPodium(activeId) : { first: null, second: null, third: null };
</script>

<div class="rankings-page">
  <div class="page-header">
    <h2>Tournament Leaderboard & Podium</h2>
    <p>Check final standings, match wins, points, and podium placements.</p>
  </div>

  <!-- Tournament Selector Bar -->
  <div class="selector-bar">
    <label for="ranking-tournament-select">Select Tournament:</label>
    <select id="ranking-tournament-select" bind:value={$selectedTournamentId}>
      {#each $tournamentStore as tournament}
        <option value={tournament.id}>{tournament.title} ({tournament.status})</option>
      {/each}
    </select>
  </div>

  {#if !activeId || $tournamentStore.length === 0}
    <p class="empty-text">No tournaments available.</p>
  {:else}
    <!-- Podium Section -->
    <div class="podium-section">
      <h3>🏆 Podium Finishers</h3>
      <div class="podium-container">
        <!-- 2nd Place -->
        <div class="podium-spot second">
          <div class="podium-badge">🥈 2nd Place</div>
          <div class="podium-name">{podium.second?.name || '—'}</div>
          <div class="podium-points">{podium.second ? `${podium.second.points} pts` : ''}</div>
          <div class="pillar silver"></div>
        </div>

        <!-- 1st Place -->
        <div class="podium-spot first">
          <div class="podium-badge">🥇 Champion</div>
          <div class="podium-name">{podium.first?.name || '—'}</div>
          <div class="podium-points">{podium.first ? `${podium.first.points} pts` : ''}</div>
          <div class="pillar gold"></div>
        </div>

        <!-- 3rd Place -->
        <div class="podium-spot third">
          <div class="podium-badge">🥉 3rd Place</div>
          <div class="podium-name">{podium.third?.name || '—'}</div>
          <div class="podium-points">{podium.third ? `${podium.third.points} pts` : ''}</div>
          <div class="pillar bronze"></div>
        </div>
      </div>
    </div>

    <!-- Standings Table -->
    <div class="table-card">
      <h3>Full Standings Table</h3>
      {#if rankings.length === 0}
        <p class="empty-text">No rankings available yet.</p>
      {:else}
        <div class="table-responsive">
          <table class="rank-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Player Name</th>
                <th>Country</th>
                <th>Elo</th>
                <th>Played</th>
                <th>Wins</th>
                <th>Losses</th>
                <th class="text-right">Points</th>
              </tr>
            </thead>
            <tbody>
              {#each rankings as row (row.id)}
                <tr>
                  <td class="font-bold">#{row.rank}</td>
                  <td class="font-medium">{row.name}</td>
                  <td class="text-muted">{row.country}</td>
                  <td>{row.rating}</td>
                  <td>{row.matchesPlayed}</td>
                  <td class="text-win">{row.wins}</td>
                  <td class="text-loss">{row.losses}</td>
                  <td class="text-right font-bold points-col">{row.points}</td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      {/if}
    </div>
   {/if}
</div>

<style>
  .rankings-page {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .page-header h2 {
    font-size: 1.75rem;
    color: var(--color-text-primary, #f8fafc);
    margin: 0 0 0.5rem 0;
  }

  .page-header p {
    color: var(--color-text-muted, #94a3b8);
    margin: 0;
  }

  .selector-bar {
    background: var(--color-bg-card, #1e293b);
    border: 1px solid var(--color-border, #334155);
    padding: 1rem 1.25rem;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .selector-bar label {
    color: var(--color-text-muted, #94a3b8);
    font-weight: 500;
  }

  .selector-bar select {
    padding: 0.5rem;
    border-radius: 0.375rem;
    background: var(--color-bg-input, #0f172a);
    color: #fff;
    border: 1px solid var(--color-border, #475569);
    font-size: 0.9375rem;
    flex: 1;
    max-width: 350px;
  }

  .podium-section h3, .table-card h3 {
    color: var(--color-text-primary, #f8fafc);
    margin-bottom: 1rem;
  }

  .podium-container {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    gap: 1rem;
    background: var(--color-bg-card, #1e293b);
    border: 1px solid var(--color-border, #334155);
    padding: 2rem 1rem 0 1rem;
    border-radius: 0.5rem;
  }

  .podium-spot {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 130px;
    text-align: center;
  }

  .podium-badge {
    font-size: 0.8125rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: var(--color-text-primary, #f8fafc);
  }

  .podium-name {
    font-size: 0.9375rem;
    font-weight: 600;
    color: var(--color-text-primary, #f8fafc);
    margin-bottom: 0.25rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
  }

  .podium-points {
    font-size: 0.8125rem;
    color: var(--color-text-muted, #94a3b8);
    margin-bottom: 0.75rem;
  }

  .pillar {
    width: 100%;
    border-top-left-radius: 0.375rem;
    border-top-right-radius: 0.375rem;
  }

  .pillar.gold { height: 120px; background: linear-gradient(180deg, #f59e0b 0%, #d97706 100%); }
  .pillar.silver { height: 90px; background: linear-gradient(180deg, #94a3b8 0%, #64748b 100%); }
  .pillar.bronze { height: 60px; background: linear-gradient(180deg, #b45309 0%, #92400e 100%); }

  .table-card {
    background: var(--color-bg-card, #1e293b);
    border: 1px solid var(--color-border, #334155);
    padding: 1.5rem;
    border-radius: 0.5rem;
  }

  .table-responsive {
    overflow-x: auto;
  }

  .rank-table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
    font-size: 0.9375rem;
  }

  .rank-table th {
    background: var(--color-bg-table-header, #0f172a);
    color: var(--color-text-muted, #94a3b8);
    font-weight: 600;
    padding: 0.875rem 1rem;
    border-bottom: 1px solid var(--color-border, #334155);
  }

  .rank-table td {
    padding: 0.875rem 1rem;
    border-bottom: 1px solid var(--color-border, #334155);
    color: var(--color-text-primary, #f8fafc);
  }

  .font-bold { font-weight: 700; }
  .font-medium { font-weight: 500; }
  .text-muted { color: var(--color-text-muted, #94a3b8); }
  .text-right { text-align: right; }
  .text-win { color: #22c55e; font-weight: 600; }
  .text-loss { color: #ef4444; }
  .points-col { color: var(--color-primary, #38bdf8); }
</style>