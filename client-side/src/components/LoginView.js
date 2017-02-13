import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';

const propTypes = {
  onLogin: React.PropTypes.func,
};

class LoginView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      password: '',
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
      this.handleLogin();
    }
  }

  render() {
    return (
      <Container fluid className="auth-view-body">
        <Row>
          <Col sm="7" />
          <Col sm="4" className="auth-div">
            Login for STEAMPACK
          <input
            name="id"
            type="text"
            placeholder="ID"
            onChange={this.handleChange}
            value={this.state.id}
          />
            <input
              name="password"
              type="password"
              placeholder="PASSWORD"
              onChange={this.handleChange}
              value={this.state.password}
              onKeyPress={this.handleKeyPress}
            />
            <Button onClick={this.handleLogin}>login</Button>
          </Col>
          <Col sm="1" />
        </Row>
      </Container>
    );
  }
}

LoginView.propTypes = propTypes;

export default LoginView;
