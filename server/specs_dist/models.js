"use strict";

var _sinon = require("sinon");

/**
 * @author Alexandre SAISON <alexandre.saison@appi-conseil.com>
 * @file Description
 * @desc Created on 2019-11-17 10:29:55 am
 * @copyright APPI SASU
 */
module.exports = function (mocha, expect) {
  var describe = mocha.describe,
      beforeEach = mocha.beforeEach,
      afterEach = mocha.afterEach;

  var _require = require("../dist/classes/Player"),
      Player = _require["default"];

  var _require2 = require('../dist/classes/Room'),
      Room = _require2["default"];

  describe("Classes", function () {
    describe('Player', function () {
      it("should not create a player when name is not provided", function () {
        expect(function () {
          return new Player();
        }).to["throw"]();
      });
      it("should create a player when name is at least provided", function () {
        var p = new Player("test");
        expect(function () {
          return new Player("test");
        }).to.not["throw"]();
        expect(p).to.be.not["null"];
      });
      it("should add a Master player to the master room", function () {
        var p = new Player("test");
        var r = new Room(null, "test");
        var listenerReadySpy = (0, _sinon.spy)(r, "listenerReady");
        r.setMaster(p);
        expect(r.getMaster()).to.be.equals(p.getID());
        expect(listenerReadySpy).to.be.calledOnceWith(p);
      });
    });
    describe("Room", function () {
      var _require3 = require("../dist/classes/Room"),
          Room = _require3["default"];

      beforeEach(function () {
        this._stubSocketServer = (0, _sinon.spy)();
        this._room = new Room(this._stubSocketServer, "test");
      });
      afterEach(function () {
        this._stubSocketServer.restore();

        sinon.restore();
      });
      it("should create a Room", function () {
        var stubSocketServer = (0, _sinon.spy)();
        expect(function () {
          return new Room(stubSocketServer, "test");
        }).to.not["throw"](Error);
      });
      it("should got no master when creating a Room", function () {
        expect(this._room.getMaster()).to.not["throw"](Error);
        expect(this._room.getMaster()).to.be.equals(false);
      });
    });
  });
};