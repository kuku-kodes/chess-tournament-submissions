import { writable } from 'svelte/store';
import { playerService } from '../services/playerService.js';
import { samplePlayers } from '../data/samplePlayers.js';

const getInitialPlayers = () => {
  if (typeof window === 'undefined') return samplePlayers;
  
  const saved = localStorage.getItem('chess_app_players');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (parsed.length > 0) return parsed;
    } catch (e) {
      console.error('Error parsing players from localStorage', e);
    }
  }
  
  // Agar localStorage bilkul khali hai, toh sample data save karke return kar do
  localStorage.setItem('chess_app_players', JSON.stringify(samplePlayers));
  return samplePlayers;
};

function createPlayerStore() {
   const initialPlayers = typeof window !== 'undefined' ? playerService.getAll() : [];
    const { subscribe, set, update } = writable(initialPlayers);
  
  // const { subscribe, set, update } = writable(getInitialPlayers());

  return {
    subscribe,

    /**
     * Initializes or reloads player list from persistent storage.
     */
    load() {
      const players = playerService.getAll();
      set(players);
    },

    /**
     * Creates a new player and pushes it to the reactive state.
     */
    add(playerData) {
      const newPlayer = playerService.create(playerData);
      update((players) => [...players, newPlayer]);
      return newPlayer;
    },

    /**
     * Updates an existing player by ID and refreshes state.
     */
    update(id, updatedData) {
      const updated = playerService.update(id, updatedData);
      if (updated) {
        update((players) =>
          players.map((player) => (player.id === id ? updated : player))
        );
      }
      return updated;
    },

    /**
     * Removes a player by ID from storage and reactive state.
     */
    delete(id) {
      const success = playerService.delete(id);
      if (success) {
        update((players) => players.filter((player) => player.id !== id));
      }
      return success;
    }
  };
}

export const playerStore = createPlayerStore();