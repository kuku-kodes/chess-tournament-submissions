const KEYS = {
  PLAYERS: 'chess_players',
  TOURNAMENTS: 'chess_tournaments',
  MATCHES: 'chess_matches'
};

export const storageService = {
  KEYS,

  /**
   * Retrieves data from localStorage by key.
   */
  getItem(key, defaultValue = []) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultValue;
    } catch (error) {
      console.error(`Error reading key "${key}" from localStorage:`, error);
      return defaultValue;
    }
  },

  /**
   * Serializes and writes data to localStorage.
   */
  setItem(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error saving key "${key}" to localStorage:`, error);
    }
  },

  /**
   * Utility to reset system data if needed.
   */
  clearAll() {
    localStorage.clear();
  }
};