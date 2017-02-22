import axios from 'axios';
import { GAME_REGISTER, GAME_REGISTER_SUCCESS, GAME_REGISTER_FAILURE, GAME_REGISTER_PHOTO,
         GAME_REGISTER_CHECK_SUCCESS, GAME_REGISTER_CHECK_FAILURE } from './ActionTypes';

const localStorage = window.localStorage;

/* GAME REGISTER SECTION */
export function gameRegister() {
  return {
    type: GAME_REGISTER,
  };
}

export function gameRegisterSuccess() {
  return {
    type: GAME_REGISTER_SUCCESS,
  };
}

export function gameRegisterFailure() {
  return {
    type: GAME_REGISTER_FAILURE,
  };
}

export function gameRegisterRequest(location, date, ground) {
  const userToken = JSON.parse(localStorage.getItem('user_token'));
  const url = 'http://sanghoon.org/api/game_register';
  return (dispatch) => {
    dispatch(gameRegister());
    console.log('toke is valid??', userToken);
    return axios.post(url,
      { place: location,
        playdate: date,
        playground: ground,
        userToken,
      }).then((response) => {
        console.log('game response check', response);
        dispatch(gameRegisterSuccess());
      })
    .catch((error) => {
      console.log('ERROR@', error.response);
      dispatch(gameRegisterFailure());
    });
  };
}


/* GAME REGISTER PHOTO SECTION */
export function gameRegisterPhoto() {
  return {
    type: GAME_REGISTER_PHOTO,
  };
}

export function gameRegisterPhotoRequest(photoData) {
  const url = 'http://sanghoon.org/api/image/team/upload';
  const userToken = localStorage.getItem('user_token');
  const config = {
    headers: {
      'content-type': 'multipart/form-data',
      userToken,
    },
  };
  return (dispatch) => {
    return axios.post(url, photoData, config).then((response) => {
      if (response.status === 200) {
        console.log('gameRegister photo check', response.data);
        dispatch(gameRegisterPhoto());
      }
    })
    .catch((error) => {
      console.log('gameRegister Error@', error.response);
    });
  };
}


/* GAME REGISTER CHECK SECTION */
export function gameRegisterCheckSuccess(playPlace, allGameRegisterData) {
  return {
    type: GAME_REGISTER_CHECK_SUCCESS,
    playPlace,
    allGameRegisterData,
  };
}

export function gameRegisterCheckFailure() {
  return {
    type: GAME_REGISTER_CHECK_FAILURE,
  };
}

export function gameRegisterCheckRequest() {
  const url = 'http://sanghoon.org/api/game_register/confirm';
  const userToken = JSON.parse(localStorage.getItem('user_token'));
  return dispatch => axios.post(url, {
    userToken,
  })
    .then((response) => {
      if (response.status === 200) {
        console.log('gameRegisterCheck response', response.data.data);
        dispatch(gameRegisterCheckSuccess(response.data.data.place, response.data.data));
      }
    })
    .catch((error) => {
      console.log('gameRegister check error@', error.response);
      dispatch(gameRegisterCheckFailure());
    });
}
