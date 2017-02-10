import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
  status: 'INIT',
  teamData: [],
};


export default function teamView(state = initialState, action) {
  switch (action.type) {
    case types.TEAM_VIEW:
      return update(state, {
        status: { $set: 'WAITING' },
      });
    case types.TEAM_VIEW_SUCCESS:
      return update(state, {
        status: { $set: 'SUCCESS' },
        teamData: { $set: action.data },
      });
    case types.TEAM_VIEW_FAILURE:
      return update(state, {
        status: { $set: 'FAILURE' },
      });
    default:
      return state;
  }
}
