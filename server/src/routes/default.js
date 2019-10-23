/**
 * @author Alexandre SAISON <alexandre.saison@appi-conseil.com>
 * @file default Router for Munchkin APP, it will serve the application to the client
 * @desc Created on 2019-10-20 2:09:04 pm
 * @copyright APPI SASU
 */
import express from 'express';
import path from 'path';

export default (expressApp) => {
  const router = new express.Router({});
  router.get('/', function(req,res) {
    res.sendFile(path.resolve(__dirname, '../../', 'public/', 'index.html'));
  });
  return router
}

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
function resolver(req, res) {
  res.json()
}