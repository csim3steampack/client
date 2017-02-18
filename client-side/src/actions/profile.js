import axios from 'axios';
import { PROFILE_VIEW, PROFILE_VIEW_SUCCESS, PROFILE_VIEW_FAILURE,
         PROFILE_CHECK_SUCCESS, PROFILE_CHECK_FAILURE } from './ActionTypes';

const localStorage = window.localStorage;

export function profileView() {
  return {
    type: PROFILE_VIEW,
  };
}

export function profileViewSuccess(valid) {
  return {
    type: PROFILE_VIEW_SUCCESS,
    valid,
  };
}

export function profileViewFailure(errorCode) {
  return {
    type: PROFILE_VIEW_FAILURE,
    errorCode,
  };
}

export function profileViewRequest(
  name,
  teamName,
  userPosition,
  leaderState,
  userHeight,
  userFoot) {
  return (dispatch) => {
    const url = 'http://ec2-52-78-89-87.ap-northeast-2.compute.amazonaws.com:3000/api/profile';
    const userToken = JSON.parse(localStorage.getItem('user_token'));
    dispatch(profileView());
    return axios.post(url, {
      username: name,
      team: teamName,
      leader: leaderState,
      position: userPosition,
      height: userHeight,
      foot: userFoot,
      userToken,
    }).then((response) => {
      console.log('profile response', response);
      dispatch(profileViewSuccess(response.data));
    })
    .catch((error) => {
      console.log('profile error@', error.response);
      dispatch(profileViewFailure());
    });
  };
}

export function profileCheckSuccess(currentUsername, allProfileData) {
  return {
    type: PROFILE_CHECK_SUCCESS,
    currentUsername,
    allProfileData,
  };
}

export function profileCheckFailure() {
  return {
    type: PROFILE_CHECK_FAILURE,
  };
}

export function profileCheckRequest() {
  const url = 'http://ec2-52-78-89-87.ap-northeast-2.compute.amazonaws.com:3000/api/profile/confirm';
  const userToken = JSON.parse(localStorage.getItem('user_token'));
  return dispatch => axios.post(url, {
    userToken,
  })
    .then((response) => {
      if (response.status === 200) {
        console.log('profileCheck response', response.data.data);
        dispatch(profileCheckSuccess(response.data.data.username, response.data.data));
      }
    })
    .catch((error) => {
      console.log('profile check error@', error.response);
      dispatch(profileCheckFailure());
    });
}
