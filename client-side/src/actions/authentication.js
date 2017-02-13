import axios from 'axios';
import { AUTH_LOGIN, AUTH_LOGIN_SUCCESS, AUTH_LOGIN_FAILURE,
         AUTH_REGISTER, AUTH_REGISTER_SUCCESS, AUTH_REGISTER_FAILURE,
         AUTH_GET_STATUS, AUTH_GET_STATUS_SUCCESS, AUTH_GET_STATUS_FAILURE, AUTH_LOGOUT } from './ActionTypes';

/* LOGIN */
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
    .then((response) => {
      console.log(response)
      dispatch(loginSuccess(id));
    }).catch(() => {
      dispatch(loginFailure());
    });
  };
}

/* REGISTER */
export function register() {
  return {
    type: AUTH_REGISTER,
  };
}

export function registerSuccess() {
  return {
    type: AUTH_REGISTER_SUCCESS,
  };
}

export function registerFailure(error) {
  return {
    type: AUTH_REGISTER_FAILURE,
    error,
  };
}

export function registerRequest(id, password) {
  return (dispatch) => {
    dispatch(register());
    const url = 'http://ec2-52-78-89-87.ap-northeast-2.compute.amazonaws.com:3000/api/account/signup';
    return axios.post(url, { id, password })
    .then(() => {
      dispatch(registerSuccess());
    }).catch((error) => {
      dispatch(registerFailure(error.response.data.code));
    });
  };
}

/* SESSION */
export function getStatus() {
  return {
    type: AUTH_GET_STATUS,
  };
}

export function getStatusSuccess(userid) {
  return {
    type: AUTH_GET_STATUS_SUCCESS,
    userid,
  };
}

export function getStatusFailure() {
  return {
    type: AUTH_GET_STATUS_FAILURE,
  };
}

export function getStatusRequest() {
  return (dispatch) => {
    dispatch(getStatus());
    const url = 'http://ec2-52-78-89-87.ap-northeast-2.compute.amazonaws.com:3000/api/account/getinfo';
    return axios.get(url)
    .then((response) => {
      console.log("response", response);
      dispatch(getStatusSuccess(response.data.id));
    }).catch(() => {
      dispatch(getStatusFailure());
    });
  };
}

/* SESSION */
export function logout() {
  return {
    type: AUTH_LOGOUT,
  };
}

export function logoutRequest() {
  return (dispatch) => {
    const url = 'http://ec2-52-78-89-87.ap-northeast-2.compute.amazonaws.com:3000/api/account/logout';
    return axios.post(url)
    .then(() => {
      dispatch(logout());
    });
  };
}
