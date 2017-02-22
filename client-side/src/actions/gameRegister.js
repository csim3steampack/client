import axios from 'axios';
import { GAME_REGISTER, GAME_REGISTER_SUCCESS, GAME_REGISTER_PHOTO } from './ActionTypes';

const localStorage = window.localStorage;

/* GAME REGISTER SECTION */
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

export function gameRegisterRequest(location, date, ground) {
  const userToken = JSON.parse(localStorage.getItem('user_token'));
  const url = 'http://ec2-52-78-89-87.ap-northeast-2.compute.amazonaws.com:3000/api/game_register';
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
        dispatch(gameRegisterSuccess(response.data.success));
      })
    .catch((error) => {
      console.log('ERROR@', error.response);
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
  const url = 'http://ec2-52-78-89-87.ap-northeast-2.compute.amazonaws.com:3000/api/image/team/upload';
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
