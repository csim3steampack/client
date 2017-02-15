import update from 'react-addons-update';
import * as types from '../actions/ActionTypes';


const initialState = {
  status: 'INIT',
  isSucceed: false,
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
        isSucceed: { $set: action.bool },
      });
    default:
      return state;
  }
}
