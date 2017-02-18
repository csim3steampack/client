import update from 'react-addons-update';
import * as types from '../actions/ActionTypes';


const initialState = {
  login: {
    status: 'INIT',
  },
  register: {
    status: 'INIT',
    error: -1,
  },
  status: {
    status: 'INIT',
    currentUserID: '',
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
          currentUserID: { $set: action.id },
        },
      });
    case types.AUTH_LOGIN_FAILURE:
      return update(state, {
        login: {
          status: { $set: 'FAILURE' },
        },
      });
    case types.AUTH_REGISTER:
      return update(state, {
        register: {
          status: { $set: 'WAITING' },
          error: { $set: -1 },
        },
      });
    case types.AUTH_REGISTER_SUCCESS:
      return update(state, {
        register: {
          status: { $set: 'SUCCESS' },
        },
      });
    case types.AUTH_REGISTER_FAILURE:
      return update(state, {
        register: {
          status: { $set: 'WAITING' },
          error: { $set: action.error },
        },
      });
    case types.AUTH_LOGOUT:
      return update(state, {
        status: {
          isLoggedIn: { $set: false },
          currentUserID: { $set: '' },
        },
      });
    case types.AUTH_GET_STATUS:
      return update(state, {
        status: {
          status: { $set: 'WAITING' },
        },
      });
    case types.AUTH_GET_STATUS_SUCCESS:
      return update(state, {
        status: {
          status: { $set: 'SUCCESS' },
          currentUserID: { $set: action.userID },
        },
      });
    case types.AUTH_GET_STATUS_FAILURE:
      return update(state, {
        status: {
          status: { $set: 'WAITING' },
          currentUserID: { $set: '' },
        },
      });
    default:
      return state;
  }
}
