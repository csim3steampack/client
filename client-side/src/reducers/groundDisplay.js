import update from 'react-addons-update';
import * as types from '../actions/ActionTypes';


const initialState = {
	status: 'INIT',
	awayTeamData: [],
	homeTeamData: [],
};


export default function groundDisplay(state = initialState, action) {
	switch (action.type) {
	case types.GROUND_DISPLAY:
		return update(state, {
			status: { $set: 'WAITING' },
		});
	case types.GROUND_DISPLAY_SUCCESS:
		return update(state, {
			status: { $set: 'SUCCESS' },
			awayTeamData: { $set: action.awayUsers },
			homeTeamData: { $set: action.homeUers },
		});
	case types.GROUND_DISPLAY_FAILURE:
		return update(state, {
			status: { $set: 'FAILURE' },
		});
	default:
		return state;
	}
}
