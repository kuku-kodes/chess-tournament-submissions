<script>
  import PlayerForm from '../components/players/PlayerForm.svelte';
  import { playerStore } from '../stores/playerStore.js';
  // Common component import kiya
  import Button from '../components/common/Button.svelte';
</script>

<div class="players-page">
  <div class="page-header">
    <h2>Player Management</h2>
    <p>Register players and manage their chess ratings before assigning them to tournaments.</p>
  </div>

  <div class="players-content">
    <!-- Left: Form to add player -->
    <div class="form-container">
      <PlayerForm />
    </div>

    <!-- Right: List of registered players -->
    <div class="list-container">
      <h3>Registered Players ({$playerStore.length})</h3>
      
      {#if $playerStore.length === 0}
        <p class="empty-text">No players registered yet. Add your first player using the form.</p>
      {:else}
        <div class="player-grid">
          {#each $playerStore as player (player.id)}
            <div class="player-card">
              <div class="player-info">
                <h4>{player.name}</h4>
                <span class="player-meta">{player.country} • Elo: <strong>{player.rating}</strong></span>
              </div>
              
              <!-- Custom button ki jagah common Button component ka use -->
              <Button 
                variant="danger" 
                on:click={() => playerStore.delete(player.id)}
              >
                ✕ Delete
              </Button>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  .players-page {
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

  .players-content {
    display: grid;
    grid-template-columns: 1fr 1.5fr;
    gap: 2rem;
    align-items: start;
  }

  .list-container h3 {
    color: var(--color-text-primary, #f8fafc);
    margin-top: 0;
    margin-bottom: 1rem;
  }

  .empty-text {
    color: var(--color-text-muted, #94a3b8);
    font-style: italic;
  }

  .player-grid {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    max-height: 500px;
    overflow-y: auto;
  }

  .player-card {
    background: var(--color-bg-card, #1e293b);
    border: 1px solid var(--color-border, #334155);
    padding: 1rem;
    border-radius: 0.375rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .player-info h4 {
    margin: 0 0 0.25rem 0;
    color: var(--color-text-primary, #f8fafc);
  }

  .player-meta {
    font-size: 0.875rem;
    color: var(--color-text-muted, #94a3b8);
  }

  @media (max-width: 768px) {
    .players-content {
      grid-template-columns: 1fr;
    }
  }
</style>