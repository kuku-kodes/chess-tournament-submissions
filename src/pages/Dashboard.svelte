<script>
  import { playerStore } from '../stores/playerStore.js';
  import { tournamentStore } from '../stores/tournamentStore.js';
  import { matchStore } from '../stores/matchStore.js';
  import { activePage } from '../stores/uiStore.js';

  $: totalPlayers = $playerStore.length;
  $: totalTournaments = $tournamentStore.length;
  $: activeTournaments = $tournamentStore.filter((t) => t.status === 'Active').length;
  $: completedTournaments = $tournamentStore.filter((t) => t.status === 'Completed').length;
  $: totalMatches = $matchStore.length;
</script>

<div class="dashboard-page">
  <div class="welcome-banner">
    <h2>Welcome to ChessMaster Dashboard</h2>
    <p>Manage your players, organize tournaments, simulate 1v1 match pairings, and view live podium standings seamlessly.</p>
  </div>

  <!-- Metric Statistics Grid -->
  <div class="stats-grid">
    <div class="stat-card" on:click={() => activePage.set('players')} role="button" tabindex="0">
      <div class="stat-icon">♟️</div>
      <div class="stat-info">
        <h3>Total Players</h3>
        <p class="stat-value">{totalPlayers}</p>
      </div>
    </div>

    <div class="stat-card" on:click={() => activePage.set('tournaments')} role="button" tabindex="0">
      <div class="stat-icon">🏆</div>
      <div class="stat-info">
        <h3>Tournaments</h3>
        <p class="stat-value">{totalTournaments}</p>
      </div>
    </div>

    <div class="stat-card" on:click={() => activePage.set('tournaments')} role="button" tabindex="0">
      <div class="stat-icon">⚡</div>
      <div class="stat-info">
        <h3>Active Tournaments</h3>
        <p class="stat-value">{activeTournaments}</p>
      </div>
    </div>

    <div class="stat-card" on:click={() => activePage.set('matches')} role="button" tabindex="0">
      <div class="stat-icon">⚔️</div>
      <div class="stat-info">
        <h3>Total Matches</h3>
        <p class="stat-value">{totalMatches}</p>
      </div>
    </div>
  </div>

  <!-- Quick Actions Section -->
  <div class="quick-actions-section">
    <h3>Quick Navigation</h3>
    <div class="actions-grid">
      <button class="action-card" on:click={() => activePage.set('players')}>
        <span class="action-title">Manage Players</span>
        <span class="action-desc">Add new players, check Elo ratings, and review participant lists.</span>
      </button>

      <button class="action-card" on:click={() => activePage.set('tournaments')}>
        <span class="action-title">Create Tournament</span>
        <span class="action-desc">Set up a new tournament event and assign players to brackets.</span>
      </button>

      <button class="action-card" on:click={() => activePage.set('rankings')}>
        <span class="action-title">View Rankings & Podium</span>
        <span class="action-desc">Check out leaderboards and tournament podium winners.</span>
      </button>
    </div>
  </div>
</div>

<style>
  .dashboard-page {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .welcome-banner {
    background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
    border: 1px solid var(--color-border, #334155);
    padding: 2rem;
    border-radius: 0.75rem;
  }

  .welcome-banner h2 {
    margin: 0 0 0.5rem 0;
    color: var(--color-text-primary, #f8fafc);
    font-size: 1.75rem;
  }

  .welcome-banner p {
    margin: 0;
    color: var(--color-text-muted, #94a3b8);
    font-size: 1rem;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.25rem;
  }

  .stat-card {
    background: var(--color-bg-card, #1e293b);
    border: 1px solid var(--color-border, #334155);
    padding: 1.25rem;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    cursor: pointer;
    transition: transform 0.2s, border-color 0.2s;
  }

  .stat-card:hover {
    transform: translateY(-2px);
    border-color: var(--color-primary, #38bdf8);
  }

  .stat-icon {
    font-size: 2rem;
    background: rgba(56, 189, 248, 0.1);
    padding: 0.75rem;
    border-radius: 0.375rem;
  }

  .stat-info h3 {
    margin: 0 0 0.25rem 0;
    font-size: 0.875rem;
    color: var(--color-text-muted, #94a3b8);
    font-weight: 500;
  }

  .stat-value {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-text-primary, #f8fafc);
  }

  .quick-actions-section h3 {
    color: var(--color-text-primary, #f8fafc);
    margin-bottom: 1rem;
  }

  .actions-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.25rem;
  }

  .action-card {
    background: var(--color-bg-card, #1e293b);
    border: 1px solid var(--color-border, #334155);
    padding: 1.25rem;
    border-radius: 0.5rem;
    text-align: left;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    transition: background 0.2s, border-color 0.2s;
  }

  .action-card:hover {
    background: rgba(56, 189, 248, 0.05);
    border-color: var(--color-primary, #38bdf8);
  }

  .action-title {
    font-size: 1rem;
    font-weight: 600;
    color: var(--color-text-primary, #f8fafc);
  }

  .action-desc {
    font-size: 0.875rem;
    color: var(--color-text-muted, #94a3b8);
    line-height: 1.4;
  }
</style>