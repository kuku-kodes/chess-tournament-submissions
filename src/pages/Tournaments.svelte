<script>
  import { tournamentStore } from '../stores/tournamentStore.js';
  import { playerStore } from '../stores/playerStore.js';
  import { selectedTournamentId, activePage, toast } from '../stores/uiStore.js';
  import { matchStore } from '../stores/matchStore.js';

  // Common components aur validators import kiye
  import Button from '../components/common/Button.svelte';
  import Input from '../components/common/Input.svelte';
  import Modal from '../components/common/Model.svelte';
  import { validateTournament } from '../utils/validators.js';

  let title = '';
  let startDate = '';
  let formErrors = {};
  
  // Assignment Modal state
  let assigningTournament = null;
  let selectedPlayerIds = [];

  function handleCreate(e) {
    e.preventDefault();
    
    // Validator ka use karke check kiya
    const validation = validateTournament({ title, format: 'Swiss' });
    if (!validation.isValid) {
      formErrors = validation.errors;
      toast.show(validation.errors.title || 'Please enter a tournament title', 'error');
      return;
    }

    formErrors = {};
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
        
        <Input 
          id="title"
          label="Tournament Title *"
          bind:value={title}
          placeholder="e.g. Winter Grand Prix 2026"
          error={formErrors.title}
        />

        <Input 
          id="startDate"
          label="Start Date"
          type="date"
          bind:value={startDate}
        />

        <Button type="submit" variant="primary">Create Tournament</Button>
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
                <Button variant="outline" on:click={() => openAssignModal(tournament)}>
                  Assign Players
                </Button>
                {#if tournament.playerIds && tournament.playerIds.length >= 2}
                  <Button variant="primary" on:click={() => generateMatches(tournament.id)}>
                    Generate Matches
                  </Button>
                {/if}
                <Button variant="secondary" on:click={() => viewMatches(tournament.id)}>
                  View Matches
                </Button>
                <Button variant="secondary" on:click={() => viewRankings(tournament.id)}>
                  Rankings
                </Button>
                <Button variant="danger" on:click={() => tournamentStore.delete(tournament.id)}>
                  Delete
                </Button>
              </div>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </div>
</div>

<!-- Assign Players Modal (Using common Modal & Button components) -->
<Modal isOpen={!!assigningTournament} title={assigningTournament ? `Assign Players to "${assigningTournament.title}"` : ''} onClose={() => assigningTournament = null}>
  {#if assigningTournament}
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
      <Button variant="secondary" on:click={() => assigningTournament = null}>Cancel</Button>
      <Button variant="primary" on:click={saveAssignments}>Save Assignments</Button>
    </div>
  {/if}
</Modal>

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

  .empty-text {
    color: var(--color-text-muted, #94a3b8);
    font-style: italic;
  }

  .modal-instruction {
    color: var(--color-text-muted, #94a3b8);
    font-size: 0.9375rem;
    margin-bottom: 0.5rem;
  }

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