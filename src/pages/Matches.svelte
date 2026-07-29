<script>
  import { tournamentStore } from '../stores/tournamentStore.js';
  import { playerStore } from '../stores/playerStore.js';
  import { matchStore } from '../stores/matchStore.js';
  import { selectedTournamentId, activePage, toast } from '../stores/uiStore.js';
  import { matchService } from '../services/matchService.js';


  import { shufflePlayers } from '../utils/shufflePlayers.js';
  import { push } from 'svelte-spa-router';

  // Default to selected tournament or first available tournament
  $: activeId = $selectedTournamentId || ($tournamentStore[0] ? $tournamentStore[0].id : null);
  $: currentTournament = $tournamentStore.find(t => t.id === activeId);
  $: matches = activeId ? $matchStore.filter(m => m.tournamentId === activeId) : [];
//   $: matches = activeId ? matchService.getByTournament(activeId) : [];

  function getPlayerName(playerId) {
    if (!playerId) return 'Bye (Auto Win)';
    const player = $playerStore.find((p) => p.id === playerId);
    return player ? player.name : 'Unknown Player';
  }

  function handleSimulateMatch(matchId) {
    matchStore.simulateWinner(matchId);
    toast.show('Match winner simulated!', 'success');
  }

  function handleSimulateAll() {
    if (activeId) {
      matchStore.simulateAllWinners(activeId);
      toast.show('All pending matches simulated successfully!', 'success');
    }
  }

  function goToRankings() {
    if (activeId) {
      selectedTournamentId.set(activeId);
    //   activePage.set('rankings');
      push('/rankings')
    }
  }
</script>

<div class="matches-page">
  <div class="page-header">
    <h2>Match Engine & Pairings</h2>
    <p>View 1v1 match pairings and simulate game results for selected tournaments.</p>
  </div>

  <!-- Tournament Selector Dropdown -->
  <div class="selector-bar">
    <label for="tournament-select">Select Tournament:</label>
    <select id="tournament-select" bind:value={$selectedTournamentId}>
      {#each $tournamentStore as tournament}
        <option value={tournament.id}>{tournament.title} ({tournament.status})</option>
      {/each}
    </select>

    {#if activeId && matches.length > 0}
      <div class="batch-actions">
        <button class="btn btn-primary" on:click={handleSimulateAll}>Simulate All Matches</button>
        <button class="btn btn-outline" on:click={goToRankings}>View Standings 🥇</button>
      </div>
    {/if}
  </div>

  <!-- Matches View Grid -->
  {#if !activeId || $tournamentStore.length === 0}
    <p class="empty-text">No tournaments available. Please create a tournament first.</p>
  {:else if matches.length === 0}
    <div class="empty-matches">
      <p>No matches generated yet for <strong>{currentTournament?.title}</strong>.</p>
      {#if currentTournament?.playerIds && currentTournament.playerIds.length >= 2}
        <button class="btn btn-primary" on:click={() => { matchStore.generateMatches(activeId); toast.show('Matches generated!'); }}>
          Generate Brackets Now
        </button>
      {:else}
        <p class="sub-text">Assign at least 2 players in the Tournaments tab to generate matches.</p>
      {/if}
    </div>
  {:else}
    <div class="match-grid">
      {#each matches as match (match.id)}
        <div class="match-card" class:completed={match.status === 'Completed'}>
          <div class="match-header-row">
            <span class="match-id-badge">Match #{match.id.slice(0, 6)}</span>
            <span class="match-status {match.status.toLowerCase()}">{match.status}</span>
          </div>

          <div class="match-competitors">
            <div class="competitor" class:winner={match.winnerId === match.player1Id}>
              <span class="player-name">{getPlayerName(match.player1Id)}</span>
              {#if match.winnerId === match.player1Id}
                <span class="win-tag">🏆 Winner</span>
              {/if}
            </div>

            <div class="versus">VS</div>

            <div class="competitor" class:winner={match.winnerId === match.player2Id}>
              <span class="player-name">{getPlayerName(match.player2Id)}</span>
              {#if match.winnerId === match.player2Id}
                <span class="win-tag">🏆 Winner</span>
              {/if}
            </div>
          </div>

          <div class="match-footer">
            {#if match.status === 'Pending' && !match.isBye}
              <button class="btn btn-simulate" on:click={() => handleSimulateMatch(match.id)}>
                Simulate Match Result
              </button>
            {:else if match.isBye}
              <span class="bye-text">Automatic Bye (Player advances)</span>
            {:else}
              <span class="completed-text">Match Finished</span>
            {/if}
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .matches-page {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
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
    flex-wrap: wrap;
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

  .batch-actions {
    display: flex;
    gap: 0.75rem;
    margin-left: auto;
  }

  .match-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 1.25rem;
  }

  .match-card {
    background: var(--color-bg-card, #1e293b);
    border: 1px solid var(--color-border, #334155);
    border-radius: 0.5rem;
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .match-header-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .match-id-badge {
    font-size: 0.75rem;
    color: var(--color-text-muted, #94a3b8);
  }

  .match-status {
    font-size: 0.75rem;
    padding: 0.125rem 0.5rem;
    border-radius: 0.25rem;
    font-weight: 600;
  }
  .match-status.pending { background: rgba(234, 179, 8, 0.1); color: #eab308; }
  .match-status.completed { background: rgba(34, 197, 94, 0.1); color: #22c55e; }

  .match-competitors {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    background: rgba(15, 23, 42, 0.4);
    padding: 0.75rem;
    border-radius: 0.375rem;
  }

  .competitor {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.375rem 0.5rem;
    border-radius: 0.25rem;
  }

  .competitor.winner {
    background: rgba(34, 197, 94, 0.15);
    font-weight: 600;
  }

  .player-name {
    color: var(--color-text-primary, #f8fafc);
    font-size: 0.9375rem;
  }

  .win-tag {
    font-size: 0.75rem;
    color: #22c55e;
  }

  .versus {
    text-align: center;
    font-size: 0.75rem;
    color: var(--color-text-muted, #94a3b8);
    font-weight: 700;
  }

  .match-footer {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .btn {
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-weight: 500;
    font-size: 0.875rem;
    cursor: pointer;
    border: none;
  }
  .btn-primary { background: #0284c7; color: white; }
  .btn-outline { background: transparent; border: 1px solid #334155; color: #f8fafc; }
  .btn-simulate { background: #059669; color: white; width: 100%; }
  .btn-simulate:hover { background: #047857; }

  .bye-text, .completed-text {
    font-size: 0.8125rem;
    color: var(--color-text-muted, #94a3b8);
    font-style: italic;
  }

  .empty-matches {
    background: var(--color-bg-card, #1e293b);
    border: 1px solid var(--color-border, #334155);
    padding: 3rem;
    border-radius: 0.5rem;
    text-align: center;
  }

  .empty-text {
    color: var(--color-text-muted, #94a3b8);
    font-style: italic;
  }

  .sub-text {
    font-size: 0.875rem;
    color: var(--color-text-muted, #94a3b8);
    margin-top: 0.5rem;
  }
</style>