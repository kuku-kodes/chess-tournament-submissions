<script>
  import { tournamentStore } from '../../stores/tournamentStore.js';
  import { playerStore } from '../../stores/playerStore.js';
  import { activeModal, toast } from '../../stores/uiStore.js';

  export let tournament = null;

  $: targetTournament = tournament || $activeModal.data;
  
  let selectedPlayerIds = [];

  $: if (targetTournament) {
    selectedPlayerIds = [...(targetTournament.playerIds || [])];
  }

  function closeModal() {
    activeModal.set({ type: null, data: null });
  }

  function handleKeydown(event) {
    if (event.key === 'Escape') {
      closeModal();
    }
  }

  function togglePlayerSelection(playerId) {
    if (selectedPlayerIds.includes(playerId)) {
      selectedPlayerIds = selectedPlayerIds.filter(id => id !== playerId);
    } else {
      selectedPlayerIds = [...selectedPlayerIds, playerId];
    }
  }

  function saveAssignments() {
    if (targetTournament && targetTournament.id) {
      tournamentStore.assignPlayers(targetTournament.id, selectedPlayerIds);
      toast.show('Players assigned successfully!', 'success');
    }
    closeModal();
  }
</script>

<div class="modal-backdrop" role="dialog" aria-modal="true" tabindex="-1" on:keydown={handleKeydown} on:click|self={closeModal}>
  <div class="modal-content">
    <div class="modal-header">
      <h3>Assign Players to "{targetTournament?.title}"</h3>
      <button class="btn-close" on:click={closeModal} aria-label="Close modal">✕</button>
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
      <button class="btn btn-secondary" on:click={closeModal}>Cancel</button>
      <button class="btn btn-primary" on:click={saveAssignments}>Save Assignments</button>
    </div>
  </div>
</div>

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(15, 23, 42, 0.75);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    backdrop-filter: blur(4px);
  }

  .modal-content {
    background: var(--color-bg-card, #1e293b);
    border: 1px solid var(--color-border, #334155);
    border-radius: 0.5rem;
    width: 100%;
    max-width: 450px;
    padding: 1.5rem;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .modal-header h3 {
    margin: 0;
    color: var(--color-text-primary, #f8fafc);
    font-size: 1.125rem;
  }

  .btn-close {
    background: transparent;
    border: none;
    color: var(--color-text-muted, #94a3b8);
    font-size: 1.25rem;
    cursor: pointer;
  }

  .modal-body {
    margin-bottom: 1.5rem;
    color: var(--color-text-primary, #f8fafc);
    font-size: 0.9375rem;
  }

  .modal-instruction {
    margin: 0 0 0.75rem 0;
    color: var(--color-text-muted, #94a3b8);
    font-size: 0.875rem;
  }

  .player-checkbox-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    max-height: 250px;
    overflow-y: auto;
    padding-right: 0.25rem;
  }

  .checkbox-label {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: var(--color-text-primary, #f8fafc);
    font-size: 0.9375rem;
    cursor: pointer;
    padding: 0.375rem 0.5rem;
    border-radius: 0.25rem;
    transition: background 0.2s;
  }

  .checkbox-label:hover {
    background: rgba(255, 255, 255, 0.03);
  }

  .empty-text {
    color: var(--color-text-muted, #94a3b8);
    font-style: italic;
    margin: 0;
  }

  .modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;
  }

  .btn {
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-weight: 500;
    font-size: 0.875rem;
    cursor: pointer;
    border: none;
  }

  .btn-secondary {
    background: var(--color-bg-input, #334155);
    color: var(--color-text-primary, #f8fafc);
  }
  .btn-secondary:hover { background: #475569; }

  .btn-primary {
    background: #0284c7;
    color: white;
  }
  .btn-primary:hover { background: #0369a1; }
</style>