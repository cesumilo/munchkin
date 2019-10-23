import Game from "./Game";
import Observer from "./others/Observer";
import Player from "./Player";
import Stage from "./Stage";

/**
 * @author Alexandre SAISON <alexandre.saison@appi-conseil.com>
 * @file Description
 * @desc Created on 2019-10-20 4:00:42 pm
 * @copyright APPI SASU
 */

export default class Room extends Observer {
  constructor(index, socketServer) {
    super();
    this._serverSocket = socketServer;
    this.timeouts = []
    this._game = new Game();
    this._name = `Room${index}`;
    this._players = [];
    this._stages = [];
    this._master = null;
  }

  /**
   * Trigger Stage for Player
   * @param {Player} player 
   * @param {Stage} stage
   */
  triggerStageFor(player, stage) {
    const currentStage = player.getCurrentStage();
    if (!!currentStage) {

    } else {
      console.log("[ROOM] This is the First Stage")
      // TODO : HANDLE FIRST STAGE
    }
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
    console.log('[ROOM] getEvent !!! ', this._players.map(p => ({ name: p.getName(), isReady: p.isReady() })))
  }

  findPlayer(player) {
    console.log('[ROOM] #findPlayer::player =>  ', player)
    return this._players.find(p => p.getID() === player);
  }

  addPlayer(player) {
    console.log(`[ROOM] #addPlayer::player => ${player.getName()}`)
    if (this._players.some(p => p.getID() === player.getID()))
      throw new Error(`You can't join twice to the room`)
    this._players.push(player)
    this.subscribe(player, "player:ready", () => {
      if (this._players.length >= 3 && this._players.every(p => p.isReady())) {
        const toggleSecond = (counter = 3) => {
          if (counter > 0) {
            this._serverSocket.to(this._name).emit("game:countdown", counter);
            return setTimeout(() => toggleSecond(counter - 1), 1000);
          }
          return this.startGame();
        }
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