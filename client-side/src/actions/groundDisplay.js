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
	return (dispatch) => {
		dispatch(groundDisplay());
		const url = 'http://ec2-52-78-89-87.ap-northeast-2.compute.amazonaws.com:3000/api/ground_display';
		const userToken = JSON.parse(localStorage.getItem('user_token'));
		return axios.post(url, {
			selectedTeam: awayTeam,
			'userToken': userToken,
		}).then((response) => {
			console.log("groundDisplay response", response);
			if (response.status === 200) {
				dispatch(groundDisplaySuccess(response.data));
			}
		})
    .catch((error) => {
	console.log("groundDisplay error@", error.response);
	if (error.response !== undefined) {
		dispatch(groundDisplayFailure(error.response));
	}
});
	};
}
