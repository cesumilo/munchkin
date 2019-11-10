/**
 * @author Alexandre SAISON <alexandre.saison@appi-conseil.com>
 * @file Description
 * @desc Created on 2019-10-20 4:00:42 pm
 * @copyright APPI SASU
 */

import Game from "./Game";
import Observer from "./others/Observer";
import Stage from "./Stage";
import Player from "./Player";

import { Socket } from 'socket.io'

export default class Room extends Observer {
  constructor(socketServer, name) {
    super();
    this._serverSocket = socketServer;
    this.timeouts = []
    this._game = new Game();
    this._name = name;
    this._players = [];
    this._master = null;
  }

  /**
   * Returns the room where socketID (The player) is located
   * @param {Array<Room>} availableRooms 
   * @param {string} socketID 
   */
  static getRoomWithSocketID(availableRooms, socketID) {
    return availableRooms.find(room => room.getPlayers().some(player => player.getID() === socketID))
  }

  /**
   * Returns the Room with specified name 
   * @param {Array<Room>} rooms 
   * @param {string} roomName 
   */
  static getRoomWithName(rooms, roomName) {
    return rooms.find(r => r.getName() === roomName);
  }

  getName() {
    return this._name;
  }

  setMaster(master) {
    this._master = master;
    this._players.push(master);
    this.listenerReady(master)
  }

  canBeJoined() {
    return (!this._master || this._players.length < 6) && !this._game.isLaunched();
  }

  isMaster(potentialMasterId) {
    return this.getMaster() === potentialMasterId;
  }

  /**
   * @returns {string} return the SocketID of the Master
   */
  getMaster() {
    return this._master && this._master.getID();
  }

  /**
   * @returns {Socket} return the server socket to handle room messages
   */
  getServerSocket() {
    return this._serverSocket;
  }

  getRoomMaster() {
    return this._master;
  }

  startGame() {
    this._game.initGame(this._players);
    (function toggleSecond(counter = 3) {
      if (counter > 0) {
        this._serverSocket.to(this._name).emit("room:message", { origin: "Server", message: `Début de la partie dans ${counter}...` });
        return setTimeout(() => toggleSecond.bind(this)(counter - 1), 1000);
      }
      this._serverSocket.to(this._name).emit("game:begin");
      return this._game.startGame(this._players, this._master);
    }).bind(this)()
  }

  listenerReady(player) {
    this.subscribe(player, "player:ready", () => {
      this.getServerSocket().to(this.getName()).emit("room:update", { players: this.getRoomPlayers() })
      if (this.canStartGame())
        this._master.getSocket().emit("room:state", "READY");
      else
        this._master.getSocket().emit("room:state", "NOT_READY");
    })
  }

  /**
   * @returns {boolean} Checks to pass before master can launch the game
   */
  canStartGame() {
    return this._players.length >= 1 && this._players.every(p => p.isReady());
  }

  listenerEndTurn(player) {
    this.subscribe(player, "player:endturn", (data) => {
      // TODO : handle end of turn for data.player
    })
  }

  endGame() {
    if (!!this._game) this.destroy()
    else throw new Error('[ROOM] Game must have been started to be ended');
  }

  /**
   * Remove a Player from this room
   * @param {string} playerID socket ID of the player to remove (used for findPlayer)
   */
  removePlayer(playerID) {
    const playerToRemove = this.findPlayer(playerID)
    if (!!playerToRemove) {
      this._players = this._players.filter(p => p.getID() !== playerToRemove.getID());
    }
  }

  /**
   * Find a player using his socket ID 
   * @param {string} playerID socketID related to the user (e.g player.getID())
   */
  findPlayer(playerID) {
    return this._players.find(p => p.getID() === playerID);
  }

  /**
   * Add a player to the room if fills requierments
   * @param {Player} player 
   */
  addPlayer(player) {
    if (this._players.some(p => p.getID() === player.getID()))
      throw new Error(`You can't join twice to the room`)
    this._players.push(player)
    this.getServerSocket().to(this.getName()).emit("room:update", { players: this.getRoomPlayers() })
    this.listenerReady(player);
  }

  destroy() {
    this.timeouts.forEach(timeout => clearTimeout(timeout))
  }

  /**
   * @returns {Array<Player>} returns all room players that has joined the room
   */
  getRoomPlayers() {
    return this._players.map(p => ({ isReady: p.isReady(), name: p.getName() }));
  }

  /**
   * @returns {Array<Player>} returns all players that has joined the room
   */
  getPlayers() {
    return this._players;
  }
}