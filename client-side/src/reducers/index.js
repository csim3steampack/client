import { combineReducers } from 'redux';
import groundDisplay from './groundDisplay';
import teamView from './teamView';

export default combineReducers({
  groundDisplay, teamView,
});
