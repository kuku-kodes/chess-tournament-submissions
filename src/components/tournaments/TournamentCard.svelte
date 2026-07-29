<script>
  export let tournament;
  import { link, push } from 'svelte-spa-router'
  import { activeModal, selectedTournamentId, activePage } from '../../stores/uiStore.js';
  import { tournamentStore } from '../../stores/tournamentStore.js';
  import { matchStore } from '../../stores/matchStore.js';
  import { toast } from '../../stores/uiStore.js';
   

  function openAssignModal() {
    activeModal.set({ type: 'assignPlayers', data: tournament });
  }

  function generateMatches() {
    try {
      matchStore.generateMatches(tournament.id);
      toast.show('Matches generated successfully!', 'success');
      selectedTournamentId.set(tournament.id);
      // activePage.set('matches');
      push('/matches')
    } catch (err) {
      toast.show(err.message, 'error');
    }
  }

  function viewMatches() {
    selectedTournamentId.set(tournament.id);
    // activePage.set('matches');
    push('/matches')
  }

  function viewRankings() {
    selectedTournamentId.set(tournament.id);
    // activePage.set('rankings');
    push('/rankings')
  }
</script>

<div class="tournament-card">
  <div class="card-header">
    <h4>{tournament.title}</h4>
    <span class="status-badge {tournament.status.toLowerCase()}">{tournament.status}</span>
  </div>

  <div class="card-body">
    <p class="meta">Started: <strong>{tournament.startDate}</strong></p>
    <p class="meta">Registered Players: <strong>{tournament.playerIds?.length || 0}</strong></p>
  </div>

  <div class="card-actions">
    <button class="btn btn-outline" on:click={openAssignModal}>Assign Players</button>
    {#if tournament.playerIds && tournament.playerIds.length >= 2}
      <button class="btn btn-primary" on:click={generateMatches}>Generate Matches</button>
    {/if}
    <button class="btn btn-secondary" on:click={viewMatches}>Matches</button>
    <button class="btn btn-secondary" on:click={viewRankings}>Rankings</button>
    <button class="btn btn-danger-text" on:click={() => tournamentStore.delete(tournament.id)}>Delete</button>
  </div>
</div>

<style>
  .tournament-card {
    background: var(--color-bg-card, #1e293b);
    border: 1px solid var(--color-border, #334155);
    border-radius: 0.5rem;
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    transition: border-color 0.2s;
  }

  .tournament-card:hover {
    border-color: var(--color-primary, #38bdf8);
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .card-header h4 {
    margin: 0;
    color: var(--color-text-primary, #f8fafc);
    font-size: 1.125rem;
  }

  .status-badge {
    font-size: 0.75rem;
    padding: 0.125rem 0.5rem;
    border-radius: 0.25rem;
    font-weight: 600;
  }
  .status-badge.draft { background: rgba(148, 163, 184, 0.1); color: #94a3b8; }
  .status-badge.active { background: rgba(56, 189, 248, 0.1); color: #38bdf8; }
  .status-badge.completed { background: rgba(34, 197, 94, 0.1); color: #22c55e; }

  .card-body {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .meta {
    margin: 0;
    font-size: 0.875rem;
    color: var(--color-text-muted, #94a3b8);
  }

  .meta strong {
    color: var(--color-text-primary, #f8fafc);
  }

  .card-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    border-top: 1px solid var(--color-border, #334155);
    padding-top: 0.75rem;
  }

  .btn {
    padding: 0.375rem 0.75rem;
    border-radius: 0.3125rem;
    font-size: 0.8125rem;
    font-weight: 500;
    cursor: pointer;
    border: none;
  }
  .btn-primary { background: #0284c7; color: white; }
  .btn-secondary { background: #334155; color: #f8fafc; }
  .btn-outline { background: transparent; border: 1px solid #334155; color: #f8fafc; }
  .btn-danger-text { background: transparent; color: #ef4444; margin-left: auto; }
</style>