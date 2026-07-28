import { writable } from 'svelte/store';
import { tournamentService } from '../services/tournamentService.js';

function createTournamentStore() {

   const initialTournaments = typeof window !== 'undefined' ? tournamentService.getAll() : [];
    const { subscribe, set, update } = writable(initialTournaments);
  
  // const { subscribe, set, update } = writable([]);

  return {
    subscribe,

    /**
     * Loads all tournaments from persistent storage.
     */
    load() {
      const tournaments = tournamentService.getAll();
      set(tournaments);
    },

    /**
     * Creates a new tournament draft.
     */
    create(tournamentData) {
      const newTournament = tournamentService.create(tournamentData);
      update((tournaments) => [...tournaments, newTournament]);
      return newTournament;
    },

    /**
     * Updates tournament info (title, date, or status).
     */
    update(id, updatedData) {
      const updated = tournamentService.update(id, updatedData);
      if (updated) {
        update((tournaments) =>
          tournaments.map((t) => (t.id === id ? updated : t))
        );
      }
      return updated;
    },

    /**
     * Deletes a tournament by ID.
     */
    delete(id) {
      const success = tournamentService.delete(id);
      if (success) {
        update((tournaments) => tournaments.filter((t) => t.id !== id));
      }
      return success;
    },

    /**
     * Assigns a list of player IDs to a tournament.
     */
    assignPlayers(tournamentId, playerIds) {
      const updated = tournamentService.assignPlayers(tournamentId, playerIds);
      if (updated) {
        update((tournaments) =>
          tournaments.map((t) => (t.id === tournamentId ? updated : t))
        );
      }
      return updated;
    }
  };
}

export const tournamentStore = createTournamentStore();