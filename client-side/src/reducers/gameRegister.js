import update from 'react-addons-update';
import * as types from '../actions/ActionTypes';


const initialState = {
  status: 'INIT',
  gameRegisterPhotoStatus: 'INIT',
  playPlace: 'defaultPlace',
  allGameRegisterData: {},
};

export default function gameRegister(state = initialState, action) {
  switch (action.type) {
    case types.GAME_REGISTER:
      return update(state, {
        status: { $set: 'WAITING' },
      });
    case types.GAME_REGISTER_SUCCESS:
      return update(state, {
        status: { $set: 'SUCCESS' },
      });
    case types.GAME_REGISTER_FAILURE:
      return update(state, {
        status: { $set: 'FAILURE' },
      });
    case types.GAME_REGISTER_PHOTO:
      return update(state, {
        gameRegisterPhotoStatus: { $set: 'SUCCESS' },
      });
    case types.GAME_REGISTER_CHECK_SUCCESS:
      return update(state, {
        playPlace: { $set: action.playPlace },
        allGameRegisterData: { $set: action.allGameRegisterData },
      });
    case types.GAME_REGISTER_CHECK_FAILURE:
      return update(state, {
        playPlace: { $set: '' },
        allGameRegisterData: { $set: '' },
      });
    default:
      return state;
  }
}
