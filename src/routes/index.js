// Import all the page components for routing
import Dashboard from '../pages/Dashboard.svelte';
import Tournaments from '../pages/Tournaments.svelte'; 
import Matches from '../pages/Matches.svelte'; 
import Players from '../pages/Players.svelte';
import Rankings from '../pages/Rankings.svelte'; 
import NotFound from '../pages/NotFound.svelte'; 


export const routes = {
  // Home / Dashboard route
  '/': Dashboard,

  // Tournaments management route
  '/tournaments': Tournaments,

  // Matches and simulation route
  '/matches': Matches,

  // Players management route
  '/players': Players,

  // Ranking route
  '/rankings': Rankings,

  // Fallback route for 404 Not Found
  '*': NotFound
};