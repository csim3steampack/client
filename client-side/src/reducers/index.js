import { combineReducers } from 'redux';
import groundDisplay from './groundDisplay';
import teamView from './teamView';
import authentication from './authentication';
import gameRegister from './gameRegister';
import profile from './profile';

export default combineReducers({
	groundDisplay, teamView, authentication, gameRegister, profile,
});
