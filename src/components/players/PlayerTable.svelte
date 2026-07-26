<script>
  import { playerStore } from '../../stores/playerStore.js';
  import { activeModal } from '../../stores/uiStore.js';

  function openDeleteModal(player) {
    activeModal.set({ type: 'deletePlayer', data: player });
  }
</script>

<div class="table-container">
  {#if $playerStore.length === 0}
    <p class="empty-state">No players available.</p>
  {:else}
    <table class="player-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Country</th>
          <th>Elo Rating</th>
          <th class="text-right">Actions</th>
        </tr>
      </thead>
      <tbody>
        {#each $playerStore as player (player.id)}
          <tr>
            <td class="font-medium">{player.name}</td>
            <td class="text-muted">{player.email || '—'}</td>
            <td>{player.country}</td>
            <td>
              <span class="rating-badge">{player.rating}</span>
            </td>
            <td class="text-right">
              <button 
                class="btn-action delete" 
                on:click={() => openDeleteModal(player)}
                title="Delete player"
              >
                Delete
              </button>
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

  .player-table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
    font-size: 0.9375rem;
  }

  .player-table th {
    background: var(--color-bg-table-header, #0f172a);
    color: var(--color-text-muted, #94a3b8);
    font-weight: 600;
    padding: 0.875rem 1rem;
    border-bottom: 1px solid var(--color-border, #334155);
  }

  .player-table td {
    padding: 0.875rem 1rem;
    border-bottom: 1px solid var(--color-border, #334155);
    color: var(--color-text-primary, #f8fafc);
  }

  .player-table tr:last-child td {
    border-bottom: none;
  }

  .player-table tr:hover td {
    background-color: rgba(255, 255, 255, 0.02);
  }

  .font-medium {
    font-weight: 500;
  }

  .text-muted {
    color: var(--color-text-muted, #94a3b8);
  }

  .text-right {
    text-align: right;
  }

  .rating-badge {
    display: inline-block;
    padding: 0.125rem 0.5rem;
    background: rgba(56, 189, 248, 0.1);
    color: var(--color-primary, #38bdf8);
    border-radius: 0.25rem;
    font-size: 0.875rem;
    font-weight: 600;
  }

  .btn-action {
    background: transparent;
    border: 1px solid #ef4444;
    color: #ef4444;
    padding: 0.25rem 0.75rem;
    border-radius: 0.25rem;
    font-size: 0.8125rem;
    cursor: pointer;
    transition: all 0.2s;
  }

  .btn-action:hover {
    background: #ef4444;
    color: white;
  }

  .empty-state {
    padding: 2rem;
    text-align: center;
    color: var(--color-text-muted, #94a3b8);
    font-style: italic;
    margin: 0;
  }
</style>