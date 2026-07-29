<script>
  import { activePage } from '../stores/uiStore.js';
  import { push } from 'svelte-spa-router';

  function goHome() {
    activePage.set('dashboard');
    push('/');
  }
</script>

<div class="not-found-page">
  <div class="error-card">
    <span class="error-code">404</span>
    <h2>Page Not Found</h2>
    <p>Oops! The page you are looking for does not exist or has been moved.</p>
    <button class="btn btn-primary" on:click={goHome}>Return to Dashboard</button>
  </div>
</div>

<style>
  .not-found-page {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 60vh;
  }

  .error-card {
    background: var(--color-bg-card, #1e293b);
    border: 1px solid var(--color-border, #334155);
    padding: 3rem 2rem;
    border-radius: 0.75rem;
    text-align: center;
    max-width: 450px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .error-code {
    font-size: 4rem;
    font-weight: 800;
    color: var(--color-primary, #38bdf8);
    line-height: 1;
  }

  .error-card h2 {
    margin: 0;
    color: var(--color-text-primary, #f8fafc);
    font-size: 1.5rem;
  }

  .error-card p {
    margin: 0 0 1rem 0;
    color: var(--color-text-muted, #94a3b8);
    font-size: 0.9375rem;
    line-height: 1.4;
  }

  .btn {
    padding: 0.625rem 1.25rem;
    border-radius: 0.375rem;
    font-weight: 600;
    font-size: 0.9375rem;
    cursor: pointer;
    border: none;
    background: var(--color-primary, #0284c7);
    color: white;
    transition: background 0.2s;
  }

  .btn:hover {
    background: var(--color-primary-hover, #0369a1);
  }
</style>