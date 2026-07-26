<script>
  import { tournamentStore } from '../../stores/tournamentStore.js';
  import { activeModal, selectedTournamentId, activePage } from '../../stores/uiStore.js';
  import { matchStore } from '../../stores/matchStore.js';
  import { toast } from '../../stores/uiStore.js';

  function openAssignModal(tournament) {
    activeModal.set({ type: 'assignPlayers', data: tournament });
  }

  function generateMatches(tournamentId) {
    try {
      matchStore.generateMatches(tournamentId);
      toast.show('Matches generated successfully!', 'success');
      selectedTournamentId.set(tournamentId);
      activePage.set('matches');
    } catch (err) {
      toast.show(err.message, 'error');
    }
  }

  function viewMatches(tournamentId) {
    selectedTournamentId.set(tournamentId);
    activePage.set('matches');
  }

  function viewRankings(tournamentId) {
    selectedTournamentId.set(tournamentId);
    activePage.set('rankings');
  }
</script>

<div class="table-container">
  {#if $tournamentStore.length === 0}
    <p class="empty-state">No tournaments created yet.</p>
  {:else}
    <table class="tournament-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Start Date</th>
          <th>Status</th>
          <th>Players</th>
          <th class="text-right">Actions</th>
        </tr>
      </thead>
      <tbody>
        {#each $tournamentStore as tournament (tournament.id)}
          <tr>
            <td class="font-medium">{tournament.title}</td>
            <td class="text-muted">{tournament.startDate}</td>
            <td>
              <span class="status-badge {tournament.status.toLowerCase()}">{tournament.status}</span>
            </td>
            <td>{tournament.playerIds?.length || 0}</td>
            <td class="text-right actions-cell">
              <button class="btn btn-outline" on:click={() => openAssignModal(tournament)}>Assign</button>
              {#if tournament.playerIds && tournament.playerIds.length >= 2}
                <button class="btn btn-primary" on:click={() => generateMatches(tournament.id)}>Gen Matches</button>
              {/if}
              <button class="btn btn-secondary" on:click={() => viewMatches(tournament.id)}>Matches</button>
              <button class="btn btn-secondary" on:click={() => viewRankings(tournament.id)}>Rankings</button>
              <button class="btn btn-danger-text" on:click={() => tournamentStore.delete(tournament.id)}>Delete</button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}
</div>

<style>
  .table-container {
    width: 100%;
    overflow-x: auto;
    background: var(--color-bg-card, #1e293b);
    border: 1px solid var(--color-border, #334155);
    border-radius: 0.5rem;
  }

  .tournament-table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
    font-size: 0.9375rem;
  }

  .tournament-table th {
    background: var(--color-bg-table-header, #0f172a);
    color: var(--color-text-muted, #94a3b8);
    font-weight: 600;
    padding: 0.875rem 1rem;
    border-bottom: 1px solid var(--color-border, #334155);
  }

  .tournament-table td {
    padding: 0.875rem 1rem;
    border-bottom: 1px solid var(--color-border, #334155);
    color: var(--color-text-primary, #f8fafc);
  }

  .tournament-table tr:last-child td {
    border-bottom: none;
  }

  .font-medium { font-weight: 500; }
  .text-muted { color: var(--color-text-muted, #94a3b8); }
  .text-right { text-align: right; }

  .status-badge {
    font-size: 0.75rem;
    padding: 0.125rem 0.5rem;
    border-radius: 0.25rem;
    font-weight: 600;
  }
  .status-badge.draft { background: rgba(148, 163, 184, 0.1); color: #94a3b8; }
  .status-badge.active { background: rgba(56, 189, 248, 0.1); color: #38bdf8; }
  .status-badge.completed { background: rgba(34, 197, 94, 0.1); color: #22c55e; }

  .actions-cell {
    display: flex;
    gap: 0.375rem;
    justify-content: flex-end;
    align-items: center;
  }

  .btn {
    padding: 0.3125rem 0.625rem;
    border-radius: 0.25rem;
    font-size: 0.75rem;
    font-weight: 500;
    cursor: pointer;
    border: none;
    transition: opacity 0.2s;
  }
  .btn:hover { opacity: 0.85; }
  .btn-primary { background: #0284c7; color: white; }
  .btn-secondary { background: #334155; color: #f8fafc; }
  .btn-outline { background: transparent; border: 1px solid #334155; color: #f8fafc; }
  .btn-danger-text { background: transparent; color: #ef4444; }

  .empty-state {
    padding: 2rem;
    text-align: center;
    color: var(--color-text-muted, #94a3b8);
    font-style: italic;
    margin: 0;
  }
</style>