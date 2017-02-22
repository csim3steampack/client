import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';

const propTypes = {
  allProfileData: React.PropTypes.object,
  onProfile: React.PropTypes.func,
  onProfilePhoto: React.PropTypes.func,
};

class ProfileEditView extends Component {
  constructor(props) {
    super(props);
    const profileAlldata = this.props.allProfileData;
    this.state = {
      isEdit: false,
      id: profileAlldata.id,
      name: profileAlldata.username,
      teamName: profileAlldata.team,
      position: profileAlldata.position,
      leaderState: profileAlldata.leader,
      height: profileAlldata.height,
      foot: profileAlldata.foot,
      fileValue: '',
      imagePreviewUrl: '',
    };
    this.handleProfileEdit = this.handleProfileEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleProfileSave = this.handleProfileSave.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleTrigger = this.handleTrigger.bind(this);
    this.handleProfilePhoto = this.handleProfilePhoto.bind(this);
  }

  handleTrigger() {
    this.trigger.click();
  }

  handleProfileEdit() {
    this.setState({
      isEdit: true,
    });
  }

  handleChange(e) {
    const nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  handleProfileSave() {
    const name = this.state.name;
    const teamName = this.state.teamName;
    const position = this.state.position;
    const leaderState = this.state.leaderState;
    const height = this.state.height;
    const foot = this.state.foot;

    this.props.onProfile(name, teamName, position, leaderState, height, foot);
    this.setState({
      isEdit: false,
    });
  }

  handleImageChange(e) {
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onload = () => {
      console.log(reader.result)
      this.setState({
        fileValue: file,
        imagePreviewUrl: reader.result,
      });
    };
    reader.readAsDataURL(file);
  }

  handleProfilePhoto() {
    const photoUrl = this.state.imagePreviewUrl;
    this.props.onProfilePhoto(photoUrl);
  }

  render() {
    const profileAlldata = this.props.allProfileData;

    const profileCheckView = (
      <Container>
        <h3 className="profileView-header">프로필 관리</h3>
        <Row>
          <Col sm="1" />
          <Col sm="10" className="profileView-container">
            <div>아이디</div>
            <div>{profileAlldata.id}</div>
            <div>사용자 이름</div>
            <div>{profileAlldata.username}</div>
            <div>팀 이름</div>
            <div>{profileAlldata.team}</div>
            <div>포지션</div>
            <div>{profileAlldata.position}</div>
            <div>팀내 역활</div>
            <div>{profileAlldata.leader}</div>
            <div>키(cm)</div>
            <div>{profileAlldata.height}</div>
            <div>주 사용발</div>
            <div>{profileAlldata.foot}</div>
            <Button onClick={this.handleProfileEdit}>수정하기</Button>
          </Col>
          <Col sm="1" />
        </Row>
      </Container>
    );


    const imagePreview = (
      (this.state.imagePreviewUrl) ? <img src={this.state.imagePreviewUrl} /> : <div>Please select an Imgage</div>
    );

    const profileEditView = (
      <Container>
        <h3 className="profileView-header">프로필 수정</h3>
        <Row>
          <Col sm="1" />
          <Col sm="10" className="profileView-container">
            <div>User ID</div>
            <div>{this.state.id}</div>
            <div>프로필 사진</div>
            <form encType="multipart/form-data">
              <input
                type="file"
                className="fileInput"
                multiple
                onChange={this.handleImageChange}
                ref={(input) => { this.trigger = input; }}
              />
              <div className="imgPreview" onClick={this.handleTrigger}>{imagePreview}</div>
              <div onClick={this.handleProfilePhoto}>submit</div>
            </form>
            <div>Username</div>
            <input
              name="name"
              type="text"
              className="test-game"
              value={this.state.name}
              onChange={this.handleChange}
            />
            <div>Team Name</div>
            <input
              name="teamName"
              type="text"
              className="test-game"
              value={this.state.teamName}
              onChange={this.handleChange}
            />
            <div>Position</div>
            <input
              name="position"
              type="radio"
              value="FW"
              onChange={this.handleChange}
            />FW
            <input
              name="position"
              type="radio"
              value="MF"
              onChange={this.handleChange}
            />MF
            <input
              name="position"
              type="radio"
              value="DF"
              onChange={this.handleChange}
            />DF
            <input
              name="position"
              type="radio"
              className="test-game"
              value="GK"
              onChange={this.handleChange}
            />GK
            <div>Member State</div>
            <input
              name="leaderState"
              type="radio"
              className="test-game"
              value="1"
              onChange={this.handleChange}
            />leader
            <input
              name="leaderState"
              type="radio"
              className="test-game"
              value="0"
              onChange={this.handleChange}
            />member
            <div>Height(cm)</div>
            <input
              name="height"
              type="text"
              className="test-game"
              value={this.state.height}
              onChange={this.handleChange}
            />
            <div>Foot(right or left)</div>
            <input
              name="foot"
              type="radio"
              className="test-game"
              value="right"
              onChange={this.handleChange}
            />right
            <input
              name="foot"
              type="radio"
              className="test-game"
              value="left"
              onChange={this.handleChange}
            />left
            <input
              name="foot"
              type="radio"
              className="test-game"
              value="both"
              onChange={this.handleChange}
            />both
            <button onClick={this.handleProfileSave}>submit</button>
          </Col>
          <Col sm="1" />
        </Row>
      </Container>
    );

    return (
      <div>
        { this.state.isEdit ? profileEditView : profileCheckView }
      </div>
    );
  }
}

ProfileEditView.propTypes = propTypes;

export default ProfileEditView;
