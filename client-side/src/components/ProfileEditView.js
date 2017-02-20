import React, { Component } from 'react';
import { Container, Row, Col, Button, Input, Label, FormGroup } from 'reactstrap';

const propTypes = {
  allProfileData: React.PropTypes.object,
  onProfile: React.PropTypes.func,
  onProfilePhoto: React.PropTypes.func,
};

const defaultProps = {
  allProfileData: () => console.log('allProfileData function is not a defined'),
  onProfile: () => console.log('onProfile function is not a defined'),
  onProfilePhoto: () => console.log('onProfilePhoto function is not a defined'),
};

class ProfileEditView extends Component {
  constructor(props) {
    super(props);
    const profileAlldata = this.props.allProfileData;
    this.state = {
      isEdit: false,
      name: profileAlldata.username,
      teamName: profileAlldata.team,
      position: profileAlldata.position,
      leaderState: profileAlldata.leader,
      height: profileAlldata.height,
      foot: profileAlldata.foot,
      imagePreviewUrl: profileAlldata.userImgUrl,
    };
    this.handleProfileEdit = this.handleProfileEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleProfileSave = this.handleProfileSave.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleTrigger = this.handleTrigger.bind(this);
  }

  handleTrigger() {
    this.trigger.click();
  }

  handleChange(e) {
    const nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  handleProfileEdit() {
    this.setState({
      isEdit: true,
    });
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
    const formData = new FormData();

    formData.append('file', file);
    this.props.onProfilePhoto(formData);

    reader.onload = () => {
      this.setState({
        imagePreviewUrl: reader.result,
      });
    };
    reader.readAsDataURL(file);
  }

  render() {
    /* CHECK VIEW SECTION */
    const profileAlldata = this.props.allProfileData;

    const profileCheckView = (
      <Container>
        <h3 className="profileView-header">프로필 관리</h3>
        <Row>
          <Col md="1" />
          <Col md="10" className="profileView-container">
            <Row>
              <Col md="6" className="profile-insideContainer">
                <div className="profile-title">프로필 사진</div>
                <div className="profileCheckView-title-imgage">
                  <img src={profileAlldata.userImgUrl} alt="" />
                </div>

                <div className="profileCheckView-title">사용자 이름</div>
                <div>{profileAlldata.username}</div>

                <div className="profileCheckView-title">팀 이름</div>
                <div>{profileAlldata.team}</div>
              </Col>

              <Col md="6" className="profile-insideContainer">
                <div className="profileCheckView-title">키(cm)</div>
                <div>{profileAlldata.height}CM</div>

                <div className="profileCheckView-title">포지션</div>
                <div>{profileAlldata.position === 'FW' ? '공격수' : undefined}</div>
                <div>{profileAlldata.position === 'MF' ? '미드필더' : undefined}</div>
                <div>{profileAlldata.position === 'DF' ? '수비수' : undefined}</div>
                <div>{profileAlldata.position === 'GK' ? '골키퍼' : undefined}</div>

                <div className="profileCheckView-title">리더 여부</div>
                <div>{profileAlldata.leader === 1 ? '팀 리더' : '멤버'}</div>

                <div className="profileCheckView-title">주 사용발</div>
                <div>{profileAlldata.foot === 'right' ? '오른발' : undefined}</div>
                <div>{profileAlldata.foot === 'left' ? '왼발' : undefined}</div>
                <div>{profileAlldata.foot === 'both' ? '양발 사용' : undefined}</div>

                <Button
                  color="primary"
                  block
                  outline
                  onClick={this.handleProfileEdit}
                  className="profile-save-button"
                >수정하기</Button>
              </Col>
            </Row>
          </Col>
          <Col md="1" />
        </Row>
      </Container>
    );

/* EDIT VIEW SECTION */
    const imagePreview = (
      (this.state.imagePreviewUrl) ?
        <img src={this.state.imagePreviewUrl} alt="Profile" /> :
        <div>사진을 선택해 주세요</div>
    );

    const profileEditView = (
      <Container>
        <h3 className="profileView-header">프로필 수정</h3>
        <Row>
          <Col md="1" />
          <Col md="10" className="profileView-container">
            <Row>
              <Col md="6" className="profile-insideContainer">
                <div className="profile-title">프로필 사진</div>
                <input
                  type="file"
                  className="fileInput"
                  onChange={this.handleImageChange}
                  ref={(input) => { this.trigger = input; }}
                />
              <div className="imgPreview" onClick={this.handleTrigger}>{imagePreview}</div>

                <div className="profile-title">사용자 이름</div>
                <Input
                  name="name"
                  type="text"
                  value={this.state.name}
                  onChange={this.handleChange}
                  className="profile-input"
                />

                <div className="profile-title">팀 이름</div>
                <Input
                  name="teamName"
                  type="text"
                  value={this.state.teamName}
                  onChange={this.handleChange}
                  className="profile-input"
                />

                <div className="profile-title">키(cm)</div>
                <Input
                  name="height"
                  type="text"
                  value={this.state.height}
                  onChange={this.handleChange}
                  className="profile-input"
                />
              </Col>

              <Col md="6" className="profile-insideContainer">
                <div className="profile-title">포지션</div>
                <FormGroup check>
                  <Label check>
                    <Input
                      name="position"
                      type="radio"
                      value="FW"
                      onChange={this.handleChange}
                      checked={this.state.position === 'FW'}
                    />{' '}공격수
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input
                      name="position"
                      type="radio"
                      value="MF"
                      onChange={this.handleChange}
                      checked={this.state.position === 'MF'}
                    />{' '}미드필더
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input
                      name="position"
                      type="radio"
                      value="DF"
                      onChange={this.handleChange}
                      checked={this.state.position === 'DF'}
                    />{' '}수비수
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input
                      name="position"
                      type="radio"
                      value="GK"
                      onChange={this.handleChange}
                      checked={this.state.position === 'GK'}
                    />{' '}골키퍼
                  </Label>
                </FormGroup>
                <div className="profile-title">리더 여부</div>
                <FormGroup check>
                  <Label check>
                    <Input
                      name="leaderState"
                      type="radio"
                      value="1"
                      onChange={this.handleChange}
                      checked={this.state.leaderState === '1'}
                    />{' '}팀 리더 (경기 관리 및 모든 권한)
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input
                      name="leaderState"
                      type="radio"
                      value="0"
                      onChange={this.handleChange}
                      checked={this.state.leaderState === '0'}
                    />{' '}멤버
                  </Label>
                </FormGroup>

                <div className="profile-title">주 사용발</div>
                <FormGroup check>
                  <Label check>
                    <Input
                      name="foot"
                      type="radio"
                      value="right"
                      onChange={this.handleChange}
                      checked={this.state.foot === 'right'}
                    />{' '}오른발
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input
                      name="foot"
                      type="radio"
                      value="left"
                      onChange={this.handleChange}
                      checked={this.state.foot === 'left'}
                    />{' '}왼발
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input
                      name="foot"
                      type="radio"
                      value="both"
                      onChange={this.handleChange}
                      checked={this.state.foot === 'both'}
                    />{' '}양발 사용
                  </Label>
                </FormGroup>
                <Button
                  color="primary"
                  block
                  outline
                  onClick={this.handleProfileSave}
                  className="profile-save-button"
                >저장하기</Button>
              </Col>
            </Row>
          </Col>
          <Col md="1" />
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
ProfileEditView.defaultProps = defaultProps;

export default ProfileEditView;
