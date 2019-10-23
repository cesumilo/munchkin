/**
 * @author Guillaume Robin and Alexandre Saison <>
 * @file Play component redux actions
 * @desc Created on 2019-10-23 11:25:29 pm
 * @copyright Creative Commons Attribution-NonCommercial 4.0 International License
 */
import { playerUpdate } from './player';

export const PLAY_ON_CHANGE_USERNAME = 'PLAY_ON_CHANGE_USERNAME';
export const PLAY_IS_READY_REQUEST = 'PLAY_IS_READY_REQUEST';

export const playOnChangeUsername = username => ({
  type: PLAY_ON_CHANGE_USERNAME,
  payload: username,
});

export const playIsReadyRequest = () => ({
  type: PLAY_IS_READY_REQUEST,
});

export const playIsReady = () => {
  return async (dispatch, getState) => {
    const { socket } = getState().app;
    const { username } = getState().play;

    dispatch(playIsReadyRequest());

    socket.on('player:update', data => dispatch(playerUpdate(data)));

    socket.emit('player:action', {
      action: 'READY',
      payload: { username },
    });
  };
};
