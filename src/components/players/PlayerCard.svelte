<script>
  export let player;
  import { activeModal } from '../../stores/uiStore.js';

  function openDeleteModal() {
    activeModal.set({ type: 'deletePlayer', data: player });
  }
</script>

<div class="player-card">
  <div class="player-avatar">
    <span>♟️</span>
  </div>
  <div class="player-details">
    <h4>{player.name}</h4>
    <p class="email">{player.email || 'No email provided'}</p>
    <div class="meta-tags">
      <span class="badge rating">Elo: {player.rating}</span>
      <span class="badge country">{player.country}</span>
    </div>
  </div>
  <div class="player-actions">
    <button class="btn-icon delete" on:click={openDeleteModal} title="Delete Player">
      🗑️
    </button>
  </div>
</div>

<style>
  .player-card {
    background: var(--color-bg-card, #1e293b);
    border: 1px solid var(--color-border, #334155);
    border-radius: 0.5rem;
    padding: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    transition: transform 0.2s ease, border-color 0.2s ease;
  }

  .player-card:hover {
    border-color: var(--color-primary, #38bdf8);
    transform: translateY(-2px);
  }

  .player-avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: var(--color-bg-avatar, #334155);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    flex-shrink: 0;
  }

  .player-details {
    flex: 1;
    min-width: 0;
  }

  .player-details h4 {
    margin: 0 0 0.25rem 0;
    color: var(--color-text-primary, #f8fafc);
    font-size: 1rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .email {
    margin: 0 0 0.5rem 0;
    font-size: 0.8125rem;
    color: var(--color-text-muted, #94a3b8);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .meta-tags {
    display: flex;
    gap: 0.5rem;
  }

  .badge {
    font-size: 0.75rem;
    padding: 0.125rem 0.5rem;
    border-radius: 0.25rem;
    font-weight: 500;
  }

  .rating {
    background: rgba(56, 189, 248, 0.1);
    color: var(--color-primary, #38bdf8);
    border: 1px solid rgba(56, 189, 248, 0.2);
  }

  .country {
    background: rgba(148, 163, 184, 0.1);
    color: var(--color-text-muted, #94a3b8);
    border: 1px solid rgba(148, 163, 184, 0.2);
  }

  .player-actions {
    display: flex;
    gap: 0.5rem;
  }

  .btn-icon {
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 0.375rem;
    font-size: 1rem;
    transition: background 0.2s;
  }

  .btn-icon.delete:hover {
    background: rgba(239, 68, 68, 0.1);
  }
</style>