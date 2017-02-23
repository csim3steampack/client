import axios from 'axios';
import { GROUND_DISPLAY, GROUND_DISPLAY_SUCCESS, GROUND_DISPLAY_FAILURE } from './ActionTypes';

const localStorage = window.localStorage;

export function groundDisplay() {
  return {
    type: GROUND_DISPLAY,
  };
}

export function groundDisplaySuccess(data) {
  return {
    type: GROUND_DISPLAY_SUCCESS,
    data,
  };
}

export function groundDisplayFailure() {
  return {
    type: GROUND_DISPLAY_FAILURE,
  };
}

export function groundDisplayRequest(awayTeam) {
  const userToken = JSON.parse(localStorage.getItem('user_token'));
  const url = 'http://sanghoon.org/api/ground_display';
  return (dispatch) => {
    dispatch(groundDisplay());
    return axios.post(url, {
      selectedTeam: awayTeam,
      userToken,
    }).then((response) => {
      console.log('groundDisplay response', response);
      if (response.status === 200) {
        dispatch(groundDisplaySuccess(response.data));
      }
    })
    .catch((error) => {
      console.log('groundDisplay error@', error.response);
      if (error.response !== undefined) {
        dispatch(groundDisplayFailure(error.response));
      }
    });
  };
}
