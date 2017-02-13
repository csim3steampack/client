import { AUTH_LOGIN, AUTH_LOGIN_SUCCESS, AUTH_LOGIN_FAILURE } from './ActionTypes';
import axios from 'axios';

export function login() {
  return {
    type: AUTH_LOGIN,
  };
}

export function loginSuccess(id) {
  return {
    type: AUTH_LOGIN_SUCCESS,
    id,
  };
}

export function loginFailure() {
  return {
    type: AUTH_LOGIN_FAILURE,
  };
}

export function loginRequest(id, password) {
  return (dispatch) => {
    dispatch(login());
    const url = 'http://ec2-52-78-89-87.ap-northeast-2.compute.amazonaws.com:3000/api/account/login';
    return axios.post(url, { id, password })
    .then(() => {
      dispatch(loginSuccess(id));
    }).cathch(() => {
      dispatch(loginFailure());
    });
  };
}
