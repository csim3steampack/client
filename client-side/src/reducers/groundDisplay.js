import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
  status: 'INIT',
  teamData: [],
};


export default function groundDisplay(state = initialState, action) {
  console.log(action.status)
  switch (action.type) {
    case types.GROUND_DISPLAY:
      return update(state, {
        status: { $set: 'WAITING' },
      });
    case types.GROUND_DISPLAY_SUCCESS:
      return update(state, {
        status: { $set: 'SUCCESS' },
        teamData: { $set: action.data },
      });
    case types.GROUND_DISPLAY_FAILURE:
      return update(state, {
        status: { $set: 'FAILURE' },
      });
    default:
      return state;
  }
}
