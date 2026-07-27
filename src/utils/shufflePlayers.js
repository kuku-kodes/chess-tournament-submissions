/**
 * Shuffles an array of players randomly using the Fisher-Yates algorithm.
 * @param {Array} players - Array of player objects
 * @returns {Array} - New shuffled array of players
 */
export function shufflePlayers(players) {
  if (!Array.isArray(players)) return [];
  const shuffled = [...players];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}