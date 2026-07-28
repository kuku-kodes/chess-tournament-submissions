<!-- <script>
  import { link } from 'svelte-spa-router'
  import { activePage } from '../../stores/uiStore.js';
</script>

<nav class="flex gap-4 p-4 bg-gray-800">
  <a href="/" use:link class="hover:text-yellow-400">Dashboard</a>
  <a href="/tournaments" use:link class="hover:text-yellow-400">Tournaments</a>
  <a href="/matches" use:link class="hover:text-yellow-400">Matches</a>
  <a href="/players" use:link class="hover:text-yellow-400">Players</a>
</nav>

<header class="navbar">
  <button type="button" class="navbar-brand" on:click={() => activePage.set('dashboard')}>
    <span class="brand-icon">♟️</span>
    <span class="brand-title">ChessMaster</span>
  </button>
  <div class="navbar-right">
    <span class="badge-version">v1.0.0</span>
  </div>
</header>

<style>
  .navbar {
    height: 60px;
    background: var(--color-bg-card, #1e293b);
    border-bottom: 1px solid var(--color-border, #334155);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1.5rem;
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .navbar-brand {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    cursor: pointer;
    background: transparent;
    border: none;
    color: inherit;
    padding: 0;
  }

  .brand-icon {
    font-size: 1.5rem;
  }

  .brand-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--color-text-primary, #f8fafc);
  }

  .badge-version {
    font-size: 0.75rem;
    background: rgba(56, 189, 248, 0.1);
    color: var(--color-primary, #38bdf8);
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    font-weight: 600;
  }
</style> -->

<script>
  import { link } from 'svelte-spa-router';
</script>

<header class="navbar">
  <!-- Left: Brand / Logo with Router Link -->
  <a href="/" use:link class="navbar-brand">
    <span class="brand-icon">♟️</span>
    <span class="brand-title">ChessMaster</span>
  </a>

  <!-- Middle: Navigation Links -->
  <nav class="navbar-links">
    <a href="/" use:link class="nav-link">Dashboard</a>
    <a href="/tournaments" use:link class="nav-link">Tournaments</a>
    <a href="/matches" use:link class="nav-link">Matches</a>
    <a href="/players" use:link class="nav-link">Players</a>
  </nav>

  <!-- Right: Version Badge -->
  <div class="navbar-right">
    <span class="badge-version">v1.0.0</span>
  </div>
</header>

<style>
  .navbar {
    height: 70px;
    background: var(--color-bg-card, #1e293b);
    border-bottom: 1px solid var(--color-border, #334155);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1.5rem;
    position: sticky;
    top: 0;
    z-index: 100;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  .navbar-brand {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    text-decoration: none;
    cursor: pointer;
  }

  .brand-icon {
    font-size: 1.75rem;
  }

  .brand-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--color-text-primary, #f8fafc);
    letter-spacing: -0.025em;
  }

  .navbar-links {
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  .nav-link {
    color: var(--color-text-secondary, #94a3b8);
    text-decoration: none;
    font-weight: 500;
    font-size: 0.95rem;
    transition: color 0.2s ease;
  }

  .nav-link:hover {
    color: var(--color-primary, #38bdf8);
  }

  .navbar-right {
    display: flex;
    align-items: center;
  }

  .badge-version {
    font-size: 0.75rem;
    background: rgba(56, 189, 248, 0.1);
    color: var(--color-primary, #38bdf8);
    padding: 0.25rem 0.6rem;
    border-radius: 0.375rem;
    font-weight: 600;
    border: 1px solid rgba(56, 189, 248, 0.2);
  }
</style>