import { GROUND_DISPLAY, GROUND_DISPLAY_SUCCESS, GROUND_DISPLAY_FAILURE } from './ActionTypes';
import axios from 'axios';

export function groundDisplay() {
  return {
    type: GROUND_DISPLAY,
  };
}

export function groundDisplaySuccess(data) {
  return {
    type: GROUND_DISPLAY_SUCCESS,
    data
  };
}

export function groundDisplayFailure(error) {
  return {
    type: GROUND_DISPLAY_FAILURE,
    error,
  };
}

export function groundDisplayRequest() {
  return (dispatch) => {
    dispatch(groundDisplay());
    const url = 'http://ec2-52-78-89-87.ap-northeast-2.compute.amazonaws.com:3000/api/ground_display/?teamA=codestates&teamB=Barcelona';
    return axios.get(url).then((response) => {
      dispatch(groundDisplaySuccess(response.data));
    })
    .catch((error) => {
      dispatch(groundDisplayFailure(error));
    });
  };
}
