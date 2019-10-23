/**
 * @author Guillaume Robin and Alexandre Saison <>
 * @file Play component reducer
 * @desc Created on 2019-10-23 11:26:16 pm
 * @copyright Creative Commons Attribution-NonCommercial 4.0 International License
 */
import {
  PLAY_ON_CHANGE_USERNAME,
  PLAY_IS_READY_REQUEST,
} from '../actions/play';

const initialState = {
  loading: false,
  username: null,
};

export const play = (state = initialState, { type, payload }) => {
  switch (action.type) {
    case PLAY_IS_READY_REQUEST:
      return { ...state, loading: true };
    case PLAY_ON_CHANGE_USERNAME:
      return { ...state, username: payload };
    default:
      return state;
  }
};
