import React, { Component } from 'react';
import { Container, Row, Col, Input, Label, FormGroup } from 'reactstrap';

const propTypes = {
  onGameRegister: React.PropTypes.func,
  onGameRegisterPhoto: React.PropTypes.func,
  allGameRegisterData: React.PropTypes.object,
  playPlace: React.PropTypes.string,
};

const defaultProps = {
  onGameRegister: () => console.log('onGameRegister function is not a defined'),
  onGameRegisterPhoto: () => console.log('onGameRegisterPhoto function is not a defined'),
  allGameRegisterData: {},
  playPlace: undefined,
};

class GameRegisterView extends Component {
  constructor(props) {
    super(props);
    const allGameRegisterData = this.props.allGameRegisterData;
    this.state = {
      location: allGameRegisterData.place,
      date: allGameRegisterData.playdate,
      ground: allGameRegisterData.playground,
      imagePreviewUrl: allGameRegisterData.teamImgUrl,
      isEdit: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleGameRegister = this.handleGameRegister.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleTrigger = this.handleTrigger.bind(this);
    this.handleGameRegisterEdit = this.handleGameRegisterEdit.bind(this);
  }

  handleTrigger() {
    this.trigger.click();
  }

  handleGameRegisterEdit() {
    this.setState({
      isEdit: true,
    });
  }

  handleChange(e) {
    const nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  handleGameRegister() {
    const location = this.state.location;
    const date = this.state.date;
    const ground = this.state.ground;

    this.props.onGameRegister(location, date, ground)
    .then(
      (succeed) => {
        if (!succeed) {
          this.setState({
            location: '',
            date: '',
            ground: '',
          });
        } else {
          this.setState({
            isEdit: false,
          });
        }
      },
    );
  }

  handleImageChange(e) {
    const reader = new FileReader();
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append('file', file);
    this.props.onGameRegisterPhoto(formData);

    reader.onload = () => {
      this.setState({
        imagePreviewUrl: reader.result,
      });
    };
    reader.readAsDataURL(file);
  }

  render() {
    const allGameRegisterData = this.props.allGameRegisterData;

    /* REGISTER & EDIT SECTION */
    const imagePreview = (
      (this.state.imagePreviewUrl) ?
        <img src={this.state.imagePreviewUrl} alt="Team" /> :
        <div>사진을 선택해 주세요</div>
    );

    const registerView = (
      <Container>
        <h4 className="profileView-header">{this.state.isEdit ? '경기 수정' : '경기 등록'}</h4>
        <Row>
          <Col sm="3" />
          <Col sm="6" className="gameRegister-container">
            <FormGroup>
              <Label className="gameRegister-title">경기장소 ("구"를 입력해 주세요)</Label>
              <Input
                name="location"
                type="text"
                value={this.state.location}
                onChange={this.handleChange}
                placeholder='"구"를 입력해 주세요'
              />
            </FormGroup>
            <FormGroup>
              <Label className="gameRegister-title">경기날짜</Label>
              <Input
                name="date"
                type="date"
                value={this.state.date}
                onChange={this.handleChange}
              />
            </FormGroup>
            <Label className="gameRegister-title">팀 사진</Label>
            <input
              type="file"
              className="fileInput"
              multiple
              onChange={this.handleImageChange}
              ref={(input) => { this.trigger = input; }}
            />
            <div className="registerImgPreview" onClick={this.handleTrigger}>{imagePreview}</div>

            <FormGroup>
              <Label className="gameRegister-title">경기 운동장 (ex. 당산중학교)</Label>
              <Input
                name="ground"
                type="text"
                value={this.state.ground}
                onChange={this.handleChange}
              />
            </FormGroup>
          </Col>
          <Col sm="3" />
        </Row>
        <Row>
          <Col sm="3" />
          <Col sm="6" className="gameRegister-button-box">
            <button
              onClick={this.handleGameRegister}
              className="gameRegister-button"
            >{this.state.isEdit ? '저장하기' : '등록하기'}</button>
          </Col>
          <Col sm="3" />
        </Row>
      </Container>
    );


    /* GAME REGISTER CHECK VIEW SECTION */
    const gameRegisterCheckView = (
      <Container>
        <h4 className="profileView-header">경기 관리</h4>
        <Row>
          <Col sm="3" />
          <Col sm="6" className="gameRegister-container">
            <Label className="gameRegister-title">경기장소</Label>
            <div>{allGameRegisterData.place}</div>

            <Label className="gameRegister-title">경기날짜</Label>
            <div>{allGameRegisterData.playdate}</div>

            <Label className="gameRegister-title">팀 사진</Label>
            <div className="registerImgPreview">
              <img src={allGameRegisterData.teamImgUrl} alt="" />
            </div>

            <Label className="gameRegister-title">경기 운동장</Label>
            <div>{allGameRegisterData.playground}</div>
          </Col>
          <Col sm="3" />
        </Row>
        <Row>
          <Col sm="3" />
          <Col sm="6" className="gameRegister-button-box">
            <button
              onClick={this.handleGameRegisterEdit}
              className="gameRegister-button"
            >수정하기</button>
          </Col>
          <Col sm="3" />
        </Row>
      </Container>
    );

    const toggleGameRegisterView = (this.state.isEdit ? registerView : gameRegisterCheckView);

    return (
      <div>
        {!this.props.playPlace ? registerView : toggleGameRegisterView }
      </div>
    );
  }
}

GameRegisterView.propTypes = propTypes;
GameRegisterView.defaultProps = defaultProps;

export default GameRegisterView;
