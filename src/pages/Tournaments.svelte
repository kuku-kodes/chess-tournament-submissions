<script>
  import { tournamentStore } from '../stores/tournamentStore.js';
  import { playerStore } from '../stores/playerStore.js';
  import { selectedTournamentId, activePage, toast } from '../stores/uiStore.js';
  import { matchStore } from '../stores/matchStore.js';

  let title = '';
  let startDate = '';
  
  // Assignment Modal state
  let assigningTournament = null;
  let selectedPlayerIds = [];

  function handleCreate(e) {
    e.preventDefault();
    if (!title.trim()) {
      toast.show('Please enter a tournament title', 'error');
      return;
    }

    tournamentStore.create({ title, startDate: startDate || new Date().toISOString().split('T')[0] });
    toast.show('Tournament created successfully!', 'success');
    title = '';
    startDate = '';
  }

  function openAssignModal(tournament) {
    assigningTournament = tournament;
    selectedPlayerIds = [...(tournament.playerIds || [])];
  }

  function togglePlayerSelection(playerId) {
    if (selectedPlayerIds.includes(playerId)) {
      selectedPlayerIds = selectedPlayerIds.filter(id => id !== playerId);
    } else {
      selectedPlayerIds = [...selectedPlayerIds, playerId];
    }
  }

  function saveAssignments() {
    if (assigningTournament) {
      tournamentStore.assignPlayers(assigningTournament.id, selectedPlayerIds);
      toast.show('Players assigned successfully!', 'success');
      assigningTournament = null;
    }
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

<div class="tournaments-page">
  <div class="page-header">
    <h2>Tournament Management</h2>
    <p>Create competitions, assign registered players, and generate random tournament brackets.</p>
  </div>

  <div class="tournaments-content">
    <!-- Form to Create Tournament -->
    <div class="form-container">
      <form class="tournament-form" on:submit={handleCreate}>
        <h3>Create New Tournament</h3>
        
        <div class="form-group">
          <label for="title">Tournament Title *</label>
          <input id="title" type="text" bind:value={title} placeholder="e.g. Winter Grand Prix 2026" required />
        </div>

        <div class="form-group">
          <label for="startDate">Start Date</label>
          <input id="startDate" type="date" bind:value={startDate} />
        </div>

        <button type="submit" class="btn-submit">Create Tournament</button>
      </form>
    </div>

    <!-- List of Tournaments -->
    <div class="list-container">
      <h3>All Tournaments ({$tournamentStore.length})</h3>

      {#if $tournamentStore.length === 0}
        <p class="empty-text">No tournaments created yet.</p>
      {:else}
        <div class="tournament-grid">
          {#each $tournamentStore as tournament (tournament.id)}
            <div class="tournament-card">
              <div class="tournament-info">
                <div class="title-row">
                  <h4>{tournament.title}</h4>
                  <span class="status-badge {tournament.status.toLowerCase()}">{tournament.status}</span>
                </div>
                <p class="meta">Started: {tournament.startDate} • Players: <strong>{tournament.playerIds?.length || 0}</strong></p>
              </div>

              <div class="tournament-actions">
                <button class="btn btn-outline" on:click={() => openAssignModal(tournament)}>
                  Assign Players
                </button>
                {#if tournament.playerIds && tournament.playerIds.length >= 2}
                  <button class="btn btn-primary" on:click={() => generateMatches(tournament.id)}>
                    Generate Matches
                  </button>
                {/if}
                <button class="btn btn-secondary" on:click={() => viewMatches(tournament.id)}>
                  View Matches
                </button>
                <button class="btn btn-secondary" on:click={() => viewRankings(tournament.id)}>
                  Rankings
                </button>
                <button class="btn btn-danger-text" on:click={() => tournamentStore.delete(tournament.id)}>
                  Delete
                </button>
              </div>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </div>
</div>

<!-- Assign Players Modal -->
{#if assigningTournament}
  <div class="modal-backdrop" role="dialog" aria-modal="true" on:click|self={() => assigningTournament = null}>
    <div class="modal-content">
      <div class="modal-header">
        <h3>Assign Players to "{assigningTournament.title}"</h3>
        <button class="btn-close" on:click={() => assigningTournament = null}>✕</button>
      </div>

      <div class="modal-body">
        {#if $playerStore.length === 0}
          <p class="empty-text">No registered players available. Please register players first.</p>
        {:else}
          <p class="modal-instruction">Select players to participate in this tournament:</p>
          <div class="player-checkbox-list">
            {#each $playerStore as player (player.id)}
              <label class="checkbox-label">
                <input 
                  type="checkbox" 
                  checked={selectedPlayerIds.includes(player.id)}
                  on:change={() => togglePlayerSelection(player.id)}
                />
                <span>{player.name} (Elo: {player.rating})</span>
              </label>
            {/each}
          </div>
        {/if}
      </div>

      <div class="modal-footer">
        <button class="btn btn-secondary" on:click={() => assigningTournament = null}>Cancel</button>
        <button class="btn btn-primary" on:click={saveAssignments}>Save Assignments</button>
      </div>
    </div>
  </div>
{/if}

<style>
  .tournaments-page {
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

  .tournaments-content {
    display: grid;
    grid-template-columns: 1fr 1.5fr;
    gap: 2rem;
    align-items: start;
  }

  .tournament-form {
    background: var(--color-bg-card, #1e293b);
    padding: 1.5rem;
    border-radius: 0.5rem;
    border: 1px solid var(--color-border, #334155);
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .tournament-form h3 {
    margin: 0 0 0.5rem 0;
    color: var(--color-text-primary, #f8fafc);
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
  }

  label {
    font-size: 0.875rem;
    color: var(--color-text-muted, #94a3b8);
    font-weight: 500;
  }

  input {
    padding: 0.625rem;
    border-radius: 0.375rem;
    border: 1px solid var(--color-border, #475569);
    background: var(--color-bg-input, #0f172a);
    color: #fff;
    font-size: 0.9375rem;
  }

  .btn-submit {
    margin-top: 0.5rem;
    padding: 0.75rem;
    background-color: var(--color-primary, #0284c7);
    color: white;
    border: none;
    border-radius: 0.375rem;
    font-weight: 600;
    cursor: pointer;
  }

  .list-container h3 {
    color: var(--color-text-primary, #f8fafc);
    margin-top: 0;
    margin-bottom: 1rem;
  }

  .tournament-grid {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .tournament-card {
    background: var(--color-bg-card, #1e293b);
    border: 1px solid var(--color-border, #334155);
    padding: 1.25rem;
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .title-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .tournament-info h4 {
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

  .meta {
    margin: 0.375rem 0 0 0;
    font-size: 0.875rem;
    color: var(--color-text-muted, #94a3b8);
  }

  .tournament-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
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
  .btn-danger-text { background: transparent; color: #ef4444; }

  /* Modal Styling */
  .modal-backdrop {
    position: fixed;
    top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(15, 23, 42, 0.75);
    display: flex; justify-content: center; align-items: center;
    z-index: 1000;
    backdrop-filter: blur(4px);
  }
  .modal-content {
    background: var(--color-bg-card, #1e293b);
    border: 1px solid var(--color-border, #334155);
    border-radius: 0.5rem; width: 100%; max-width: 450px;
    padding: 1.5rem;
  }
  .modal-header {
    display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;
  }
  .modal-header h3 { margin: 0; color: #f8fafc; font-size: 1.125rem; }
  .btn-close { background: transparent; border: none; color: #94a3b8; font-size: 1.25rem; cursor: pointer; }
  .player-checkbox-list {
    display: flex; flex-direction: column; gap: 0.5rem; max-height: 250px; overflow-y: auto; margin-top: 0.75rem;
  }
  .checkbox-label {
    display: flex; align-items: center; gap: 0.75rem; color: #f8fafc; font-size: 0.9375rem; cursor: pointer;
  }
  .modal-footer {
    display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 1.5rem;
  }

  @media (max-width: 768px) {
    .tournaments-content { grid-template-columns: 1fr; }
  }
</style>