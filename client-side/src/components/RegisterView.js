import React, { Component } from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Input, FormFeedback, Label, UncontrolledAlert } from 'reactstrap';

const propTypes = {
  onRegister: React.PropTypes.func,
  errorCode: React.PropTypes.number,
};

class RegisterView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      password: '',
      email: '',
      alertVisible: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  onDismiss() {
    this.setState({
      alertVisible: false,
    });
  }

  handleChange(e) {
    const nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  handleRegister() {
    const id = this.state.id;
    const password = this.state.password;

    this.props.onRegister(id, password).then(
      (result) => {
        if (!result) {
          this.setState({
            id: '',
            password: '',
            email: '',
          });
        }
      },
    );
  }

  handleKeyPress(e) {
    if (e.charCode === 13) {
      this.handleRegister();
    }
  }

  render() {
    /* USER ID SECTION */
    const idLength = this.state.id.length;
    const idWarning = <FormFeedback className="warning-text">between 4~12 characters</FormFeedback>;

    const userIDInitial = (
      <Form>
        <FormGroup className="auth-input">
          <Label>User ID</Label>
          <Input
            name="id"
            type="text"
            value={this.state.id}
            onChange={this.handleChange}
          />
          {idLength < 1 ? undefined : idWarning}
        </FormGroup>
      </Form>
    );

    const userIDSuccess = (
      <Form>
        <FormGroup color="success" className="auth-input">
          <Label>User ID</Label>
          <Input
            state="success"
            name="id"
            type="text"
            value={this.state.id}
            onChange={this.handleChange}
          />
          <FormFeedback>Success!</FormFeedback>
        </FormGroup>
      </Form>
    );

    /* PASSWORD SECTION */
    const pwLength = this.state.password.length;
    const pwWarning = <FormFeedback className="warning-text">more than 4 characters</FormFeedback>;

    const pwInitial = (
      <Form>
        <FormGroup className="auth-input">
          <Label>Password</Label>
          <Input
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          {pwLength < 1 ? undefined : pwWarning}
        </FormGroup>
      </Form>
    );

    const pwSuccess = (
      <Form>
        <FormGroup color="success" className="auth-input">
          <Label>Password</Label>
          <Input
            state="success"
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <FormFeedback>Success!</FormFeedback>
        </FormGroup>
      </Form>
    );

    /* EMAIL SECTION */
    const emailInitial = (
      <Form>
        <FormGroup className="auth-input">
          <Label>Email</Label>
          <Input
            name="email"
            type="email"
            value={this.state.email}
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
          />
        </FormGroup>
      </Form>
    );

    /* ALERT SECTION */
    const alertList = [
      'ID information is uncorrect!',
      'Password information is uncorrect!',
      'Email information is uncorrect! ',
      'ID is already existed',
    ];

    const alert = (
      <UncontrolledAlert color="danger">
        {alertList[this.props.errorCode - 1]}
      </UncontrolledAlert>
    );

    return (
      <Container fluid className="auth-view-body">
        {this.props.errorCode !== -1 ? alert : undefined}
        <Row>
          <Col sm="7" />
          <Col sm="4" className="auth-div">
            <h3 className="auth-title">Register</h3>
            <div className="auth-input-div">
              {(idLength > 3 && idLength < 13) ? userIDSuccess : userIDInitial }
            </div>
            <div className="auth-input-div">
              {(pwLength > 4) ? pwSuccess : pwInitial }
            </div>
            <div className="auth-input-div">
              {emailInitial}
            </div>
            <Button
              onClick={this.handleRegister}
              color="primary"
              className="auth-button"
            >
            REGISTER
          </Button>
          </Col>
          <Col sm="1" />
        </Row>
      </Container>
    );
  }
}

RegisterView.propTypes = propTypes;

export default RegisterView;
