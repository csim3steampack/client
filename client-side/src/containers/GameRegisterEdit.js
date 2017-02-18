import React, { Component } from 'react';
import { GameRegisterEditView } from '../components';

const propTypes = {

};

class GameRegisterEdit extends Component {
	render() {
		return (
  <div>
    <GameRegisterEditView />
  </div>
		);
	}
}

GameRegisterEdit.propTypes = propTypes;

export default GameRegisterEdit;
