import update from 'react-addons-update';
import * as types from '../actions/ActionTypes';


const initialState = {
  status: 'INIT',
  currentUsername: 'defaultName',
  allProfileData: {},
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
      });
    case types.PROFILE_VIEW_FAILURE:
      return update(state, {
        status: { $set: 'FAILURE' },
      });
    case types.PROFILE_CHECK_SUCCESS:
      return update(state, {
        currentUsername: { $set: action.currentUsername },
        allProfileData: { $set: action.allProfileData },
      });
    case types.PROFILE_CHECK_FAILURE:
      return update(state, {
        currentUsername: { $set: '' },
        allProfileData: { $set: '' },
      });
    default:
      return state;
  }
}
