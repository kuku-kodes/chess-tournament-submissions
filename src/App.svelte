<script>
  import Navbar from './components/layout/Navbar.svelte';
  import Sidebar from './components/layout/Sidebar.svelte';
  import Footer from './components/layout/Footer.svelte';

  // Pages
  import Dashboard from './pages/Dashboard.svelte';
  import Players from './pages/Players.svelte';
  import Tournaments from './pages/Tournaments.svelte';
  import Matches from './pages/Matches.svelte';
  import Rankings from './pages/Rankings.svelte';
  import NotFound from './pages/NotFound.svelte';

  // Modals & Notifications
  import DeletePlayerModal from './components/players/DeletePlayerModal.svelte';
  import AssignPlayersModal from './components/tournaments/AssignPlayersModal.svelte';

  import { activePage, activeModal, toast } from './stores/uiStore.js';
</script>

<div class="app-layout">
  <Navbar />
  
  <div class="app-body">
    <Sidebar />
    
    <main class="main-content">
      {#if $activePage === 'dashboard'}
        <Dashboard />
      {:else if $activePage === 'players'}
        <Players />
      {:else if $activePage === 'tournaments'}
        <Tournaments />
      {:else if $activePage === 'matches'}
        <Matches />
      {:else if $activePage === 'rankings'}
        <Rankings />
      {:else}
        <NotFound />
      {/if}
    </main>
  </div>

  <Footer />

  <!-- Global Modal Manager -->
  {#if $activeModal.type === 'deletePlayer'}
    <DeletePlayerModal />
  {:else if $activeModal.type === 'assignPlayers'}
    <AssignPlayersModal tournament={$activeModal.data} />
  {/if}

  <!-- Global Toast Notification -->
  {#if $toast.visible}
    <div class="toast-notification {$toast.type}">
      <span>{$toast.message}</span>
    </div>
  {/if}
</div>

<style>
  :global(body) {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    background-color: #0f172a;
    color: #f8fafc;
  }

  .app-layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .app-body {
    display: flex;
    flex: 1;
    overflow: hidden;
  }

  .main-content {
    flex: 1;
    padding: 2rem;
    overflow-y: auto;
    background-color: #0f172a;
  }

  .toast-notification {
    position: fixed;
    bottom: 1.5rem;
    right: 1.5rem;
    padding: 0.875rem 1.25rem;
    border-radius: 0.375rem;
    font-size: 0.9375rem;
    font-weight: 500;
    z-index: 2000;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
    animation: slideIn 0.2s ease-out;
  }

  .toast-notification.success {
    background: #059669;
    color: white;
  }

  .toast-notification.error {
    background: #dc2626;
    color: white;
  }

  @keyframes slideIn {
    from {
      transform: translateY(1rem);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    .main-content {
      padding: 1rem;
    }
  }
</style>