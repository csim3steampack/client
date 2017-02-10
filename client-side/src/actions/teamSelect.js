import { TEAM_SELECT, TEAM_SELECT_SUCCESS, TEAM_SELECT_FAILURE } from './ActionTypes';
import axios from 'axios';

export function teamSelectRequest() {

}

export function teamSelect() {
  return {
    type: TEAM_SELECT,
  };
}

export function teamSelectSuccess() {
  return {
    type: TEAM_SELECT_SUCCESS,
  };
}

export function teamSelectFailure() {
  return {
    type: TEAM_SELECT_FAILURE,
  };
}
