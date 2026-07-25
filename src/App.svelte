<script>
  import Navbar from './components/layout/Navbar.svelte';
  import Footer from './components/layout/Footer.svelte';
  
  import Dashboard from './pages/Dashboard.svelte';
  import Players from './pages/Players.svelte';
  import Tournaments from './pages/Tournaments.svelte';
  import Matches from './pages/Matches.svelte';
  import Rankings from './pages/Rankings.svelte';
  import NotFound from './pages/NotFound.svelte';

  import { activePage } from './stores/uiStore.js';

  
</script>

<div class="app-layout">
  <Navbar />

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

  <Footer />
</div>

<style>
  .app-layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .main-content {
    flex: 1;
    max-width: 1280px;
    width: 100%;
    margin: 0 auto;
    padding: 1.5rem;
  }
</style>