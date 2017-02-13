import { combineReducers } from 'redux';
import groundDisplay from './groundDisplay';
import teamView from './teamView';
import authentication from './authentication';

export default combineReducers({
  groundDisplay, teamView, authentication,
});
