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
  profilePhotoStatus: React.PropTypes.string,
};

class Profile extends Component {
  constructor(props) {
    super(props);
    this.handleProfile = this.handleProfile.bind(this);
    this.handleProfilePhoto = this.handleProfilePhoto.bind(this);
  }

  componentDidMount() {
    console.log("PROFILE didmount")
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

  handleProfilePhoto(photoUrl) {
    this.props.profilePhotoRequest(photoUrl);
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
  profilePhotoStatus: state.profile.profilePhotoStatus,
});

const mapDispatchToProps = dispatch => ({
  profileViewRequest: (name, teamName, position, leader, height, foot) =>
    dispatch(profileViewRequest(name, teamName, position, leader, height, foot)),
  profileCheckRequest: () => dispatch(profileCheckRequest()),
  profilePhotoRequest: photoUrl => dispatch(profilePhotoRequest(photoUrl)),
});

Profile.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
