/**
 * @author Guillaume Robin and Alexandre Saison <>
 * @file App component redux actions
 * @desc Created on 2019-10-23 9:39:31 pm
 * @copyright Creative Commons Attribution-NonCommercial 4.0 International License
 */
export const APP_LOAD_SOCKET_REQUEST = 'APP_LOAD_SOCKET_REQUEST';
export const APP_LOAD_SOCKET_SUCCESS = 'APP_LOAD_SOCKET_SUCCESS';
export const APP_LOAD_SOCKET_ERROR = 'APP_LOAD_SOCKET_ERROR';

export const APP_PUSH = 'APP_PUSH';
export const APP_POP = 'APP_POP';

export const appPush = component => ({
  type: APP_PUSH,
  payload: component,
});

export const appPop = () => ({
  type: APP_POP,
});

export const appLoadSocketRequest = () => ({
  type: APP_LOAD_SOCKET_REQUEST,
});

export const appLoadSocketSuccess = socket => ({
  type: APP_LOAD_SOCKET_SUCCESS,
  payload: socket,
});

export const appLoadSocketError = err => ({
  type: APP_LOAD_SOCKET_ERROR,
  error: true,
  payload: err,
});
