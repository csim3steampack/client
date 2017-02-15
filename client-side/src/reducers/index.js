import { combineReducers } from 'redux';
import groundDisplay from './groundDisplay';
import teamView from './teamView';
import authentication from './authentication';
import gameRegister from './gameRegister';

export default combineReducers({
  groundDisplay, teamView, authentication, gameRegister,
});
