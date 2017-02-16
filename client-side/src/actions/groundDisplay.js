import axios from 'axios';
import { GROUND_DISPLAY, GROUND_DISPLAY_SUCCESS, GROUND_DISPLAY_FAILURE } from './ActionTypes';

const localStorage = window.localStorage;

export function groundDisplay() {
	return {
		type: GROUND_DISPLAY,
	};
}

export function groundDisplaySuccess(awayUsers, homeUers) {
	return {
		type: GROUND_DISPLAY_SUCCESS,
		awayUsers,
		homeUers,
	};
}

export function groundDisplayFailure() {
	return {
		type: GROUND_DISPLAY_FAILURE,
	};
}

export function groundDisplayRequest(awayTeam) {
	return (dispatch) => {
		dispatch(groundDisplay());
		const url = 'http://ec2-52-78-89-87.ap-northeast-2.compute.amazonaws.com:3000/api/ground_display';
		const userToken = JSON.parse(localStorage.getItem('user_token'));
		console.log("awayTeam", awayTeam);
		return axios.post(url, {
			selectedTeam: awayTeam,
			'userToken': userToken,
		}).then((response) => {
			console.log("groundDisplay response", response);
			dispatch(groundDisplaySuccess(response.data.awayUsers, response.data.homeUers));
		})
    .catch((error) => {
			console.log("groundDisplay error@", error.response);
	dispatch(groundDisplayFailure());
});
	};
}
