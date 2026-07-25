import { storageService } from './storageService.js';

export const tournamentService = {
  getAll() {
    return storageService.getItem(storageService.KEYS.TOURNAMENTS, []);
  },

  getById(id) {
    const tournaments = this.getAll();
    return tournaments.find((t) => t.id === id) || null;
  },

  create(tournamentData) {
    const tournaments = this.getAll();
    const newTournament = {
      id: crypto.randomUUID(),
      title: tournamentData.title.trim(),
      startDate: tournamentData.startDate,
      status: 'Draft', // Statuses: 'Draft' | 'Active' | 'Completed'
      playerIds: [],
      createdAt: new Date().toISOString()
    };

    tournaments.push(newTournament);
    storageService.setItem(storageService.KEYS.TOURNAMENTS, tournaments);
    return newTournament;
  },

  update(id, updatedData) {
    const tournaments = this.getAll();
    const index = tournaments.findIndex((t) => t.id === id);
    if (index === -1) return null;

    tournaments[index] = {
      ...tournaments[index],
      ...updatedData
    };

    storageService.setItem(storageService.KEYS.TOURNAMENTS, tournaments);
    return tournaments[index];
  },

  delete(id) {
    let tournaments = this.getAll();
    tournaments = tournaments.filter((t) => t.id !== id);
    storageService.setItem(storageService.KEYS.TOURNAMENTS, tournaments);
    return true;
  },

  assignPlayers(tournamentId, playerIds) {
    const tournaments = this.getAll();
    const tournament = tournaments.find((t) => t.id === tournamentId);
    if (!tournament) return null;

    tournament.playerIds = playerIds;
    storageService.setItem(storageService.KEYS.TOURNAMENTS, tournaments);
    return tournament;
  }
};