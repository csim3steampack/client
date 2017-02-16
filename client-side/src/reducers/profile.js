import update from 'react-addons-update';
import * as types from '../actions/ActionTypes';


const initialState = {
	status: 'INIT',
	profileIsSucceed: false,
};


export default function profile(state = initialState, action) {
	switch (action.type) {
	case types.PROFILE_VIEW:
		return update(state, {
			status: { $set: 'WAITING' },
		});
	case types.PROFILE_VIEW_SUCCESS:
		return update(state, {
			status: { $set: 'SUCCESS' },
			profileIsSucceed: { $set: action.valid },
		});
	case types.PROFILE_VIEW_FAILURE:
		return update(state, {
			status: { $set: 'FAILURE' },
			profileIsSucceed: { $set: false },
		});
	default:
		return state;
	}
}
