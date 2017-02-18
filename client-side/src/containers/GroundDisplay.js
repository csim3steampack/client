import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Ground } from '../components';
import { groundDisplayRequest } from '../actions/groundDisplay';

const propTypes = {
	teamMembers: React.PropTypes.array,
	groundDisplayRequest: React.PropTypes.func,
	teamPlayerName: React.PropTypes.string,
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
		const component = this;
		this.props.groundDisplayRequest(this.props.teamPlayerName)
    .then(
      () => {
	const homeArray = [];
	const awayArray = [];

	for (let i = 0; i < this.props.teamMembers.length; i += 1) {
		const teamMembers = this.props.teamMembers;
		if (teamMembers[i].team === this.props.teamPlayerName) {
			homeArray.push(teamMembers[i].name);
		} else {
			awayArray.push(teamMembers[i].name);
		}
	}
	component.setState({
		userMembers: homeArray,
		awayMembers: awayArray,
	});
},
  );
	}

	render() {
		return (
  <div>
    <Ground homeName={this.props.homeTeamMembers} awayName={this.props.awayTeamMembers} />
  </div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		awayTeamMembers: state.groundDisplay.awayTeamData,
		homeTeamMembers: state.groundDisplay.homeTeamData,
		teamPlayerName: state.teamView.teamNameValue,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		groundDisplayRequest: (tempTeam) => {
			return dispatch(groundDisplayRequest(tempTeam));
		},
	};
};

GroundDisplay.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(GroundDisplay);
