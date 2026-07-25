import { storageService } from './storageService.js';

export const playerService = {
  getAll() {
    return storageService.getItem(storageService.KEYS.PLAYERS, []);
  },

  getById(id) {
    const players = this.getAll();
    return players.find((player) => player.id === id) || null;
  },

  create(playerData) {
    const players = this.getAll();
    const newPlayer = {
      id: crypto.randomUUID(),
      name: playerData.name.trim(),
      email: playerData.email.trim(),
      rating: Number(playerData.rating) || 1200,
      country: playerData.country || 'International',
      createdAt: new Date().toISOString()
    };

    players.push(newPlayer);
    storageService.setItem(storageService.KEYS.PLAYERS, players);
    return newPlayer;
  },

  update(id, updatedData) {
    const players = this.getAll();
    const index = players.findIndex((player) => player.id === id);
    if (index === -1) return null;

    players[index] = {
      ...players[index],
      ...updatedData,
      rating: Number(updatedData.rating) || players[index].rating
    };

    storageService.setItem(storageService.KEYS.PLAYERS, players);
    return players[index];
  },

  delete(id) {
    let players = this.getAll();
    players = players.filter((player) => player.id !== id);
    storageService.setItem(storageService.KEYS.PLAYERS, players);
    return true;
  }
};