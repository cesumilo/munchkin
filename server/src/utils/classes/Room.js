import Game from "./Game";
import Observer from "./others/Observer";

/**
 * @author Alexandre SAISON <alexandre.saison@appi-conseil.com>
 * @file Description
 * @desc Created on 2019-10-20 4:00:42 pm
 * @copyright APPI SASU
 */

export default class Room extends Observer {
  constructor(index) {
    super();
    this.timeouts = []
    this._game = new Game();
    this._name = `Room${index}`;
    this._players = [];
    this._master = null;
  }

  getName() {
    return this._name;
  }

  setMaster(master) {
    this._master = master;
    this._players.push(master);
  }

  canBeJoined() {
    return (!this._master || this._players.length <= 6) && !this._game.isLaunched();
  }

  /**
   * @returns {string} return the SocketID of the Master
   */
  getMaster() {
    return this._master && this._master.getID();
  }

  startGame() {
    this._game.startGame(this._players);
  }

  endGame() {
    // TODO : Must be called before removing the Room
    this.destroy()
  }

  removePlayer(playerID) {
    const playerToRemove = this.findPlayer(playerID)
    if (!!playerToRemove) {
      console.log(`[ROOM] BEFORE #playerRemove::players_length =>  ${this._players.length}`)
      this._players = this._players.filter(p => p.getID() !== playerToRemove.getID());
      console.log(`[ROOM] AFTER #playerRemove::players_length =>  ${this._players.length}`)
    }
    console.log('[ROOM] getEvent !!! ', this._players.map(p => ({name: p.getName(), isReady : p.isReady()})))
  }

  findPlayer(player) {
    console.log('[ROOM] #findPlayer::player =>  ', player)
    return this._players.find(p => p.getID() === player);
  }

  addPlayer(player) {
    console.log('[ROOM] getEvent !!! ', this._players.map(p => p.isReady()))
    if (this._players.some(p => p.getID() === player.getID()))
      throw new Error(`You can't join twice to the room`)
    this._players.push(player)
    this.subscribe(player, "player:ready", () => {
      if (this._players.length >= 3 && this._players.every(p => p.isReady())) {
        this.timeouts.push(setTimeout(() => {
          this.startGame()
        }, 3000))
      }
    })
  }

  destroy() {
    this.timeouts.forEach(timeout => clearTimeout(timeout))
  }

  getPlayers() {
    return this._players;
  }
}