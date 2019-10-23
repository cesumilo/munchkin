"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @author Alexandre SAISON <alexandre.saison@appi-conseil.com>
 * @file default Router for Munchkin APP, it will serve the application to the client
 * @desc Created on 2019-10-20 2:09:04 pm
 * @copyright APPI SASU
 */
var _default = function _default(expressApp) {
  var router = new _express["default"].Router({});
  router.get('/', function (req, res) {
    res.sendFile(_path["default"].resolve(__dirname, '../../', 'public/', 'index.html'));
  });
  return router;
};
/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */


exports["default"] = _default;

function resolver(req, res) {
  res.json();
}