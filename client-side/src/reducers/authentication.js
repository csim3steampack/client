import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
  login: {
    status: 'INIT',
  },
  status: {
    isLoggedIn: false,
    currentUserId: '',
  },
};

export default function authentication(state = initialState, action) {
  switch (action.type) {
    case types.AUTH_LOGIN:
      return update(state, {
        login: {
          status: { $set: 'WAITING' },
        },
      });
    case types.AUTH_LOGIN_SUCCESS:
      return update(state, {
        login: {
          status: { $set: 'SUCCESS' },
        },
        status: {
          isLoggedIn: { $set: true },
          currentUserId: { $set: action.id },
        },
      });
    case types.AUTH_LOGIN_FAILURE:
      return update(state, {
        login: {
          status: { $set: 'FAILURE' },
        },
      });
    default:
      return state;
  }
}
