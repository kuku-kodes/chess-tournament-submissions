<script>
  import { activePage } from '../../stores/uiStore.js';
</script>

<header class="navbar">
  <div class="navbar-brand" on:click={() => activePage.set('dashboard')} role="button" tabindex="0">
    <span class="brand-icon">♟️</span>
    <span class="brand-title">ChessMaster</span>
  </div>
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
</style>