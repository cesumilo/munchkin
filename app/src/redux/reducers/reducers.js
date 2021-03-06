/**
 * @author Guillaume Robin and Alexandre Saison <>
 * @file Combine reducers
 * @desc Created on 2019-10-23 10:05:28 pm
 * @copyright Creative Commons Attribution-NonCommercial 4.0 International License
 */
import { combineReducers } from 'redux';
import { app } from './app';
import { play } from './play';
import { player } from './player';
import { room } from './room';

export default combineReducers({ app, play, player, room });
