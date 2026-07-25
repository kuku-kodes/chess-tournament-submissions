import { playerService } from './playerService.js';
import { tournamentService } from './tournamentService.js';
import { matchService } from './matchService.js';

export const rankingService = {
  /**
   * Computes points and rankings for all players in a tournament.
   */
  getTournamentRankings(tournamentId) {
    const tournament = tournamentService.getById(tournamentId);
    if (!tournament || !tournament.playerIds) return [];

    const matches = matchService.getByTournament(tournamentId);
    const allPlayers = playerService.getAll();

    const leaderboard = tournament.playerIds.map((playerId) => {
      const player = allPlayers.find((p) => p.id === playerId) || {
        name: 'Unknown Player',
        rating: 1200
      };

      const playerMatches = matches.filter(
        (m) => m.player1Id === playerId || m.player2Id === playerId
      );

      const matchesPlayed = playerMatches.filter((m) => m.status === 'Completed').length;
      const wins = playerMatches.filter((m) => m.winnerId === playerId).length;
      const losses = matchesPlayed - wins;
      const points = wins * 1; // Win = 1 point

      return {
        id: playerId,
        name: player.name,
        email: player.email,
        rating: player.rating,
        country: player.country,
        matchesPlayed,
        wins,
        losses,
        points
      };
    });

    // Sort by Points descending, then by ELO Rating descending as tiebreaker
    leaderboard.sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      return b.rating - a.rating;
    });

    // Assign rank positions (1st, 2nd, 3rd...)
    return leaderboard.map((player, index) => ({
      ...player,
      rank: index + 1
    }));
  },

  /**
   * Returns top 3 players for the podium.
   */
  getPodium(tournamentId) {
    const standings = this.getTournamentRankings(tournamentId);
    return {
      first: standings[0] || null,
      second: standings[1] || null,
      third: standings[2] || null
    };
  }
};