<script>
  import { link } from 'svelte-spa-router'
  import { activePage } from '../../stores/uiStore.js';

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'players', label: 'Players', icon: '♟️' },
    { id: 'tournaments', label: 'Tournaments', icon: '🏆' },
    { id: 'matches', label: 'Matches', icon: '⚔️' },
    { id: 'rankings', label: 'Rankings', icon: '🥇' }
  ];

  function handleNavigate(pageId) {
    activePage.set(pageId);
  }
</script>

<!-- <aside class="sidebar">
  <nav class="sidebar-nav">
    {#each navItems as item}
      <button 
        class="nav-item" 
        class:active={$activePage === item.id}
        on:click={() => handleNavigate(item.id)}
      >
        <span class="nav-icon">{item.icon}</span>
        <span class="nav-label">{item.label}</span>
      </button>
    {/each}
  </nav>
</aside> -->
<aside class="sidebar">
  <nav class="sidebar-nav">
    <a href="/" use:link class="nav-item" class:active={$activePage === 'dashboard'} on:click={() => activePage.set('dashboard')}>
      <span class="icon">📊</span> Dashboard
    </a>
    <a href="/tournaments" use:link class="nav-item" class:active={$activePage === 'tournaments'} on:click={() => activePage.set('tournaments')}>
      <span class="icon">🏆</span> Tournaments
    </a>
    <a href="/matches" use:link class="nav-item" class:active={$activePage === 'matches'} on:click={() => activePage.set('matches')}>
      <span class="icon">⚔️</span> Matches
    </a>
    <a href="/players" use:link class="nav-item" class:active={$activePage === 'players'} on:click={() => activePage.set('players')}>
      <span class="icon">👥</span> Players
    </a>
     <a href="/rankings" use:link class="nav-item" class:active={$activePage === 'rankings'} on:click={() => activePage.set('rankings')}>
      <span class="icon">👥</span> Rankings
    </a>
  </nav>
</aside>

<style>
  .sidebar {
    width: 240px;
    background: var(--color-bg-card, #1e293b);
    border-right: 1px solid var(--color-border, #334155);
    display: flex;
    flex-direction: column;
    padding: 1.5rem 1rem;
    flex-shrink: 0;
  }

  .sidebar-nav {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .nav-item {
    display: flex;
    align-items: center;
    gap: 0.875rem;
    padding: 0.75rem 1rem;
    background: transparent;
    border: none;
    border-radius: 0.375rem;
    text-decoration: none !important; 
    color: var(--color-text-muted, #94a3b8);
    font-size: 0.9375rem;
    font-weight: 500;
    cursor: pointer;
    text-align: left;
    transition: all 0.2s;
  }

  .nav-item:hover {
    background: rgba(255, 255, 255, 0.03);
    color: var(--color-text-primary, #f8fafc);
    text-decoration: none !important;
  }

  .nav-item.active {
    background: rgba(56, 189, 248, 0.1);
    color: var(--color-primary, #38bdf8);
    font-weight: 600;
    text-decoration: none !important;
  }

  .nav-icon {
    font-size: 1.125rem;
  }

  @media (max-width: 768px) {
    .sidebar {
      width: 70px;
      padding: 1rem 0.5rem;
    }
    .nav-label {
      display: none;
    }
    .nav-item {
      justify-content: center;
      padding: 0.75rem;
    }
  }
</style>
