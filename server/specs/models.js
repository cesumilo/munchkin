/**
 * @author Alexandre SAISON <alexandre.saison@appi-conseil.com>
 * @file Description
 * @desc Created on 2019-11-17 10:29:55 am
 * @copyright APPI SASU
 */
import { mock, spy, stub } from 'sinon';

module.exports = function (mocha, expect) {
  const { describe, beforeEach, afterEach } = mocha;
  const { default: Player } = require("../dist/classes/Player");
  const { default: Room } = require('../dist/classes/Room');
  describe("Classes", function () {
    describe('Player', () => {
      it("should not create a player when name is not provided", function () {
        expect(() => new Player()).to.throw();
      })

      it("should create a player when name is at least provided", () => {
        const p = new Player("test");
        expect(() => new Player("test")).to.not.throw();
        expect(p).to.be.not.null;
      })

      it("should add a Master player to the master room", function () {
        const p = new Player("test");
        const r = new Room(null, "test");
        const listenerReadySpy = spy(r, "listenerReady")
        r.setMaster(p);
        expect(r.getMaster()).to.be.equals(p.getID());
        expect(listenerReadySpy).to.be.calledOnceWith(p);
      })
    })

    describe("Room", function () {
      const { default: Room } = require("../dist/classes/Room");
      beforeEach(function () {
        this._stubSocketServer = spy();
        this._room = new Room(this._stubSocketServer, "test");
      })

      afterEach(function () {
        this._stubSocketServer.restore();
        sinon.restore();
      })

      it("should create a Room", function () {
        const stubSocketServer = spy();
        expect(() => new Room(stubSocketServer, "test")).to.not.throw(Error);
      })

      it("should got no master when creating a Room", function () {
        expect(this._room.getMaster()).to.not.throw(Error)
        expect(this._room.getMaster()).to.be.equals(false);
      })
    })
  })
}