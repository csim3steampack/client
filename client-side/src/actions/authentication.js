import axios from 'axios';
import { AUTH_LOGIN, AUTH_LOGIN_SUCCESS, AUTH_LOGIN_FAILURE,
         AUTH_REGISTER, AUTH_REGISTER_SUCCESS, AUTH_REGISTER_FAILURE,
         AUTH_GET_STATUS, AUTH_GET_STATUS_SUCCESS, AUTH_GET_STATUS_FAILURE,
         AUTH_LOGOUT } from './ActionTypes';

const localStorage = window.localStorage;

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
      if (response.status === 200) {
        console.log("login token check", response.data.tokenData[id]);
        let id_token = response.data.tokenData[id];
        localStorage.setItem('user_token', JSON.stringify(id_token));
        console.log("token checking", JSON.parse(localStorage.getItem('user_token')));
        dispatch(loginSuccess(id));
      }
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
      console.log("error@", error.response)
      dispatch(registerFailure(error.response.data.code));
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

/* GET STATUS */
export function getStatus() {
  return {
    type: AUTH_GET_STATUS,
  };
}

export function getStatusSuccess(userId) {
  return {
    type: AUTH_GET_STATUS_SUCCESS,
    userId,
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
    const userToken = JSON.parse(localStorage.getItem('user_token'));
    console.log("token id checking", userToken);
    return axios.post(url, {'userToken': userToken })
    .then((response) => {
      console.log("token total response", response);
      dispatch(getStatusSuccess(response.data.info));
    }).catch(() => {
      console.log("its failed")
      dispatch(getStatusFailure());
    });
  };
}
