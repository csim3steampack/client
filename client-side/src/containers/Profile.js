import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ProfileView, ProfileEditView } from '../components';
import { profileViewRequest, profileCheckRequest, profilePhotoRequest } from '../actions/profile';


const propTypes = {
  profileViewRequest: React.PropTypes.func,
  status: React.PropTypes.string,
  profileCheckRequest: React.PropTypes.func,
  currentUsername: React.PropTypes.string,
  allProfileData: React.PropTypes.object,
  profilePhotoRequest: React.PropTypes.func,
};

const defaultProps = {
  profileViewRequest: () => console.log('profileViewRequest function is not a defined'),
  status: undefined,
  profileCheckRequest: () => console.log('profileCheckRequest function is not a defined'),
  currentUsername: undefined,
  allProfileData: {},
  profilePhotoRequest: () => console.log('profilePhotoRequest function is not a defined'),
  profilePhotoStatus: undefined,
};

class Profile extends Component {
  constructor(props) {
    super(props);
    this.handleProfile = this.handleProfile.bind(this);
    this.handleProfilePhoto = this.handleProfilePhoto.bind(this);
  }

  componentDidMount() {
    this.props.profileCheckRequest();
  }

  handleProfile(name, teamName, position, leader, height, foot) {
    return this.props.profileViewRequest(name, teamName, position, leader, height, foot).then(
      () => {
        if (this.props.status === 'SUCCESS') {
          this.props.profileCheckRequest();
          return true;
        }
        return false;
      });
  }

  handleProfilePhoto(photoData) {
    this.props.profilePhotoRequest(photoData);
  }

  render() {
    const initialProfile = <ProfileView onProfile={this.handleProfile} />;
    const profileEditView = (
      <ProfileEditView
        allProfileData={this.props.allProfileData}
        onProfile={this.handleProfile}
        onProfilePhoto={this.handleProfilePhoto}
      />
    );

    return (
      <div>
        {!this.props.currentUsername ? initialProfile : profileEditView}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  status: state.profile.status,
  currentUsername: state.profile.currentUsername,
  allProfileData: state.profile.allProfileData,
});

const mapDispatchToProps = dispatch => ({
  profileViewRequest: (name, teamName, position, leader, height, foot) =>
    dispatch(profileViewRequest(name, teamName, position, leader, height, foot)),
  profileCheckRequest: () => dispatch(profileCheckRequest()),
  profilePhotoRequest: photoUrl => dispatch(profilePhotoRequest(photoUrl)),
});

Profile.propTypes = propTypes;
Profile.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
