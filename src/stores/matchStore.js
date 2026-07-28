import { writable } from 'svelte/store';
import { matchService } from '../services/matchService.js';
import { tournamentStore } from './tournamentStore.js';

function createMatchStore() {
 
  const initialMatches = typeof window !== 'undefined' ? matchService.getAll() : [];
  const { subscribe, set, update } = writable(initialMatches);

  return {
    subscribe,

    /**
     * Loads all matches across all tournaments.
     */
    load() {
      const matches = matchService.getAll();
      set(matches);
    },

    /**
     * Randomly pairs assigned players into 1v1 matches.
     */
    generateMatches(tournamentId) {
      try {
        const newMatches = matchService.generateRandomMatches(tournamentId);
        // Refresh matches state
        this.load();
        // Refresh tournament state (status changes to 'Active')
        tournamentStore.load();
        return newMatches;
      } catch (error) {
        console.error('Failed to generate matches:', error.message);
        throw error;
      }
    },

    /**
     * Simulates a random winner for a single match.
     */
    simulateWinner(matchId) {
      const updatedMatch = matchService.simulateWinner(matchId);
      if (updatedMatch) {
        update((matches) => {
         const newMatches = matches.map((m) => (m.id === matchId ? updatedMatch : m))

         return [...newMatches];
      });
      }
      return updatedMatch;
    },

    /**
     * Simulates random winners for all pending matches in a tournament.
     */
    simulateAllWinners(tournamentId) {
      const updatedMatches = matchService.simulateAllWinners(tournamentId);
      this.load();
      tournamentStore.load(); // Refresh status (changes to 'Completed')
      return updatedMatches;
    }
  };
}

export const matchStore = createMatchStore();