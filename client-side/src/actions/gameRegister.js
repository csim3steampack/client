import axios from 'axios';
import { GAME_REGISTER, GAME_REGISTER_SUCCESS, GAME_REGISTER_FAILURE } from './ActionTypes';

const localStorage = window.localStorage;

export function gameRegister() {
  return {
    type: GAME_REGISTER,
  };
}

export function gameRegisterSuccess(bool) {
  return {
    type: GAME_REGISTER_SUCCESS,
    bool,
  };
}

export function gameRegisterFailure() {
  return {
    type: GAME_REGISTER_FAILURE,
  };
}

export function gameRegisterRequest(location, date, ground) {
  const userToken = JSON.parse(localStorage.getItem('user_token'));
  const url = 'http://ec2-52-78-89-87.ap-northeast-2.compute.amazonaws.com:3000/api/game_register';
  return (dispatch) => {
    dispatch(gameRegister());
    console.log('toke is valid??', userToken);
    return axios.put(url,
      { place: location,
        playdate: date,
        playground: ground,
        userToken,
      }).then((response) => {
        console.log('game response check', response);
        dispatch(gameRegisterSuccess(response.data.success));
      })
    .catch((error) => {
      console.log('ERROR@', error.response);
      dispatch(gameRegisterFailure());
    });
  };
}
