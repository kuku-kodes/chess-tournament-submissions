import { storageService } from './storageService.js';
import { tournamentService } from './tournamentService.js';

export const matchService = {
  getAll() {
    return storageService.getItem(storageService.KEYS.MATCHES, []);
  },

  getByTournament(tournamentId) {
    const matches = this.getAll();
    return matches.filter((m) => m.tournamentId === tournamentId);
  },

  /**
   * Randomly shuffles players assigned to a tournament and creates 1v1 pairings.
   */
  generateRandomMatches(tournamentId) {
    const tournament = tournamentService.getById(tournamentId);
    if (!tournament || !tournament.playerIds || tournament.playerIds.length < 2) {
      throw new Error('At least 2 players are required to generate matches.');
    }

    // Fisher-Yates random shuffle algorithm
    const shuffled = [...tournament.playerIds];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    const newMatches = [];

    // Pair players into 1v1 matches
    for (let i = 0; i < shuffled.length; i += 2) {
      if (i + 1 < shuffled.length) {
        newMatches.push({
          id: crypto.randomUUID(),
          tournamentId,
          player1Id: shuffled[i],
          player2Id: shuffled[i + 1],
          winnerId: null,
          status: 'Pending',
          isBye: false,
          createdAt: new Date().toISOString()
        });
      } else {
        // Odd player receives an automatic Bye
        newMatches.push({
          id: crypto.randomUUID(),
          tournamentId,
          player1Id: shuffled[i],
          player2Id: null,
          winnerId: shuffled[i],
          status: 'Completed',
          isBye: true,
          createdAt: new Date().toISOString()
        });
      }
    }

    // Replace old matches for this tournament
    let allMatches = this.getAll().filter((m) => m.tournamentId !== tournamentId);
    allMatches = [...allMatches, ...newMatches];
    storageService.setItem(storageService.KEYS.MATCHES, allMatches);

    // Update tournament status to Active
    tournamentService.update(tournamentId, { status: 'Active' });

    return newMatches;
  },

  /**
   * Randomly selects a winner between the two players in a match.
   */
  simulateWinner(matchId) {
    const allMatches = this.getAll();
    const matchIndex = allMatches.findIndex((m) => m.id === matchId);
    if (matchIndex === -1) return null;

    const match = allMatches[matchIndex];
    if (match.isBye || match.status === 'Completed') return match;

    // Random choice between player 1 and player 2
    const candidates = [match.player1Id, match.player2Id];
    const winnerId = candidates[Math.floor(Math.random() * candidates.length)];

    allMatches[matchIndex] = {
      ...match,
      winnerId,
      status: 'Completed'
    };

    storageService.setItem(storageService.KEYS.MATCHES, allMatches);
    return allMatches[matchIndex];
  },

  /**
   * Simulates winners for all pending matches in a tournament at once.
   */
  simulateAllWinners(tournamentId) {
    const matches = this.getByTournament(tournamentId);
    matches.forEach((match) => {
      if (match.status === 'Pending') {
        this.simulateWinner(match.id);
      }
    });

    // Mark tournament as Completed if all matches are finished
    tournamentService.update(tournamentId, { status: 'Completed' });
    return this.getByTournament(tournamentId);
  }
};