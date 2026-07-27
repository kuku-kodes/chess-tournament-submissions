/**
 * Calculates and sorts player rankings based on points, wins, and Elo ratings.
 * @param {Array} players - Array of players
 * @param {Array} matches - Array of completed matches
 * @returns {Array} - Sorted rankings array
 */
export function calculateRankings(players = [], matches = []) {
  const stats = {};

  // Initialize stats for each player
  players.forEach(player => {
    const key = player.id || player.name;
    stats[key] = {
      id: player.id,
      name: player.name,
      rating: player.rating || 1200,
      played: 0,
      won: 0,
      lost: 0,
      drawn: 0,
      points: 0
    };
  });

  // Process match results
  matches.forEach(match => {
    if (match.status !== 'Completed') return;
    
    const p1Key = match.player1Id || match.player1;
    const p2Key = match.player2Id || match.player2;

    if (stats[p1Key]) stats[p1Key].played++;
    if (stats[p2Key]) stats[p2Key].played++;

    const score1 = Number(match.score1) || 0;
    const score2 = Number(match.score2) || 0;

    if (score1 > score2) {
      if (stats[p1Key]) { stats[p1Key].won++; stats[p1Key].points += 1; }
      if (stats[p2Key]) { stats[p2Key].lost++; }
    } else if (score2 > score1) {
      if (stats[p2Key]) { stats[p2Key].won++; stats[p2Key].points += 1; }
      if (stats[p1Key]) { stats[p1Key].lost++; }
    } else {
      if (stats[p1Key]) { stats[p1Key].points += 0.5; stats[p1Key].drawn++; }
      if (stats[p2Key]) { stats[p2Key].points += 0.5; stats[p2Key].drawn++; }
    }
  });

  // Sort by Points (desc), then Wins (desc), then Elo Rating (desc)
  return Object.values(stats).sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.won !== a.won) return b.won - a.won;
    return b.rating - a.rating;
  });
}