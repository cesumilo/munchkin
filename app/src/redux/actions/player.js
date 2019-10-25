/**
 * @author Guillaume Robin and Alexandre Saison <>
 * @file Player redux actions
 * @desc Created on 2019-10-24 12:04:42 am
 * @copyright Creative Commons Attribution-NonCommercial 4.0 International License
 */
export const PLAYER_UPDATE = 'PLAYER_UPDATE';

export const playerUpdate = attrs => ({
  type: PLAYER_UPDATE,
  payload: attrs,
});
