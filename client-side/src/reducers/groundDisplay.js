import update from 'react-addons-update';
import * as types from '../actions/ActionTypes';


const initialState = {
	status: 'INIT',
	displayTeamData: {},
};


export default function groundDisplay(state = initialState, action) {
	console.log(action)
	switch (action.type) {
	case types.GROUND_DISPLAY:
		return update(state, {
			status: { $set: 'WAITING' },
		});
	case types.GROUND_DISPLAY_SUCCESS:
		return update(state, {
			status: { $set: 'SUCCESS' },
			displayTeamData: { $set: action.data },
		});
	case types.GROUND_DISPLAY_FAILURE:
		return update(state, {
			status: { $set: 'FAILURE' },
		});
	default:
		return state;
	}
}
