import React, { Component } from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Input, FormFeedback, Label, UncontrolledAlert } from 'reactstrap';
import { Link } from 'react-router';

const propTypes = {
  onLogin: React.PropTypes.func,
};

const defaultProps = {
  onLogin: () => console.log('onLogin is not a defined'),
};

class LoginView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      password: '',
      errorCode: -1,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleLogin() {
    const id = this.state.id;
    const password = this.state.password;

    this.props.onLogin(id, password).then(
      (success) => {
        if (!success) {
          this.setState({
            password: '',
            errorCode: 1,
          });
        }
      },
    );
  }

  handleChange(e) {
    const nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  handleKeyPress(e) {
    if (e.charCode === 13) {
      e.preventDefault();
      this.handleLogin();
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
            onKeyPress={this.handleKeyPress}
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
            onKeyPress={this.handleKeyPress}
          />
          <FormFeedback>Success!</FormFeedback>
        </FormGroup>
      </Form>
    );

    /* ALERT SECTION */
    const alertList = (
      'Login is failed'
    );

    const alert = (
      <UncontrolledAlert color="danger">
        {alertList}
      </UncontrolledAlert>
    );

    return (
      <Container fluid className="auth-view-body">
        {this.state.errorCode !== -1 ? alert : undefined}
        <Row>
          <Col sm="7" />
          <Col sm="4" className="auth-div">
            <h3 className="auth-title">로그인</h3>
            <div className="auth-input-div">
              {(idLength > 3 && idLength < 13) ? userIDSuccess : userIDInitial }
            </div>
            <div className="auth-input-div">
              {(pwLength > 4) ? pwSuccess : pwInitial }
            </div>
            <Button
              onClick={this.handleLogin}
              color="primary"
              className="auth-button"
            >
				로그인
			</Button>
            <Link to="/register">
              <Button color="info" className="auth-button">회원가입</Button>
            </Link>
          </Col>
          <Col sm="1" />
        </Row>
      </Container>
    );
  }
}

LoginView.propTypes = propTypes;
LoginView.defaultProps = defaultProps;

export default LoginView;
