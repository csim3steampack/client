import axios from 'axios';
import { TEAM_VIEW, TEAM_VIEW_SUCCESS, TEAM_VIEW_FAILURE, GROUND_VIEW_TEAMNAME } from './ActionTypes';


export function teamView() {
  return {
    type: TEAM_VIEW,
  };
}

export function teamViewSuccess(data) {
  return {
    type: TEAM_VIEW_SUCCESS,
    data,
  };
}

export function teamViewFailure() {
  return {
    type: TEAM_VIEW_FAILURE,
  };
}

export function teamViewRequest() {
  return (dispatch) => {
    dispatch(teamView());
    const url = 'http://ec2-52-78-89-87.ap-northeast-2.compute.amazonaws.com:3000/api/home';
    return axios.get(url).then((response) => {
      console.log("teamview data is ", response.data)
      dispatch(teamViewSuccess(response.data));
    })
    .catch(() => {
      dispatch(teamViewFailure());
    });
  };
}

export function groundViewTeamName(teamName) {
  return {
    type: GROUND_VIEW_TEAMNAME,
    teamName,
  };
}
