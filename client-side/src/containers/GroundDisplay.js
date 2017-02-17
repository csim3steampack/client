import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Ground } from '../components';
import { groundDisplayRequest } from '../actions/groundDisplay';

const propTypes = {
	groundDisplayRequest: React.PropTypes.func,
	teamPlayerName: React.PropTypes.string,
	displayTeamData: React.PropTypes.object,
};

class GroundDisplay extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userMembers: [],
			awayMembers: [],
		};
	}

	componentDidMount() {
		this.props.groundDisplayRequest(this.props.teamPlayerName);
	}

	render() {
		const {
			homeUsers,
			awayUsers,
		} = this.props.allDisplayTeam;
		const homeName = homeUsers ? homeUsers.map(homeUser => homeUser.username) : [];
		const awayName = awayUsers ? awayUsers.map(awayUser => awayUser.name) : [];
		return (
			<div>
    		<Ground homeName={homeName} awayName={awayName} />
			</div>
		);
	}
}

const mapStateToProps = state => ({
	allDisplayTeam: state.groundDisplay.displayTeamData,
	teamPlayerName: state.teamView.teamNameValue,
});

const mapDispatchToProps = dispatch => ({
	groundDisplayRequest: selectedTeam => dispatch(groundDisplayRequest(selectedTeam)),
});

GroundDisplay.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(GroundDisplay);
