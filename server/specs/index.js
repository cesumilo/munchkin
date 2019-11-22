/**
 * @author Alexandre SAISON <alexandre.saison@appi-conseil.com>
 * @file Description
 * @desc Created on 2019-11-17 10:29:48 am
 * @copyright APPI SASU
 */

import sinonChai from "sinon-chai"
import * as chai from "chai";
chai.use(sinonChai)

require("./models")(require('mocha'), chai.expect)