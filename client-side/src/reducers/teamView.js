import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
  status: 'INIT',
  teamNameData: [],
  teamNameValue: '',
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
        teamNameData: { $set: action.data },
      });
    case types.TEAM_VIEW_FAILURE:
      return update(state, {
        status: { $set: 'FAILURE' },
      });
    case types.GROUND_VIEW_TEAMNAME:
      return update(state, {
        teamNameValue: { $set: action.teamName },
      });
    default:
      return state;
  }
}
