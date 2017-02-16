import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ProfileView, ProfileEditView } from '../components';
import { profileViewRequest } from '../actions/profile';


const propTypes = {
	profileViewRequest: React.PropTypes.func,
	status: React.PropTypes.string,
	profileIsSucceed: React.PropTypes.bool,
};

class Profile extends Component {
	constructor(props) {
		super(props);
		this.handleProfile = this.handleProfile.bind(this);
	}

	handleProfile(name, teamName, position, leader, height, foot) {
		return this.props.profileViewRequest(name, teamName, position, leader, height, foot).then(
			() => {
				if (this.props.status === 'SUCCESS') {
					return true;
				}
				return false;
			});
	}

	render() {
		const initialProfile = <ProfileView onProfile={this.handleProfile} />;
		const registedProfile = <ProfileEditView />;

		return (
  <div>
    {this.props.profileIsSucceed ? registedProfile : initialProfile}
  </div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		profileIsSucceed: state.profile.profileIsSucceed,
		status: state.profile.status,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		profileViewRequest: (name, teamName, position, leader, height, foot) => {
			return dispatch(profileViewRequest(name, teamName, position, leader, height, foot));
		},
	};
};

Profile.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
