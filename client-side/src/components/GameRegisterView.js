import React, { Component } from 'react';
import { Container, Row, Col, Input, Label, FormGroup } from 'reactstrap';

const propTypes = {
  onGameRegister: React.PropTypes.func,
  onGameRegisterPhoto: React.PropTypes.func,
};

const defaultProps = {
  onGameRegister: () => console.log('onGameRegister function is not a defined'),
  onGameRegisterPhoto: () => console.log('onGameRegisterPhoto function is not a defined'),
};

class GameRegisterView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
      date: '',
      ground: '',
      imagePreviewUrl: '',
      selectedDay: new Date(),
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleGameRegister = this.handleGameRegister.bind(this);
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
    const imagePreview = (
      (this.state.imagePreviewUrl) ?
        <img src={this.state.imagePreviewUrl} alt="Team" /> :
        <div>사진을 선택해 주세요</div>
    );

    const checkView = (
      <Container>
        <h4 className="profileView-header">경기 등록</h4>
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
            >등록하기</button>
          </Col>
          <Col sm="3" />
        </Row>
      </Container>
    );

    return (
      <div>
        {checkView}
      </div>
    );
  }
}

GameRegisterView.propTypes = propTypes;
GameRegisterView.defaultProps = defaultProps;

export default GameRegisterView;
