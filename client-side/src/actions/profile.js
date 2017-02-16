import axios from 'axios';
import { PROFILE_VIEW, PROFILE_VIEW_SUCCESS, PROFILE_VIEW_FAILURE } from './ActionTypes';

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
		dispatch(profileView());
		console.log("profile checking", "name", name, "teamName", teamName, "userPosition", userPosition, "leaderState", leaderState, "userHeight", userHeight, "userFoot", userFoot);
		const url = 'http://ec2-52-78-89-87.ap-northeast-2.compute.amazonaws.com:3000/api/profile/add';
		const userToken = JSON.parse(localStorage.getItem('user_token'));
		console.log("profile token check~", userToken);
		return axios.post(url, {
			username: name,
			team: teamName,
			leader: leaderState,
			position: userPosition,
			height: userHeight,
			foot: userFoot,
			'userToken': userToken,
		}).then((response) => {
			console.log("profile response", response)
			dispatch(profileViewSuccess(response.data));
		})
    .catch((error) => {
			console.log("profile error@", error.response)
	dispatch(profileViewFailure());
});
	};
}
