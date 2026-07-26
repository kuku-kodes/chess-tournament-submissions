import { writable } from 'svelte/store';

// Navigation State
export const activePage = writable('dashboard');

// Selected Tournament for Matches and Leaderboard context
export const selectedTournamentId = writable(null);

// Mobile Navigation State
export const isMobileMenuOpen = writable(false);

// Global Modal State ({ type: 'playerForm' | 'deletePlayer' | 'assignPlayers', data: ... })
export const activeModal = writable({ type: null, data: null });

/**
 * Global Toast Notification Store
 */
function createToastStore() {
  const { subscribe, set } = writable({ message: '', type: 'info', visible: false });

  return {
    subscribe,
    show(message, type = 'info', duration = 3000) {
      set({ message, type, visible: true });
      setTimeout(() => {
        set({ message: '', type: 'info', visible: false });
      }, duration);
    },
    dismiss() {
      set({ message: '', type: 'info', visible: false });
    }
  };
}

export const toast = createToastStore();