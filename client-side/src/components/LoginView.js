import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';


class LoginView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
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
            />
            <Button>login</Button>
          </Col>
          <Col sm="1" />
        </Row>
      </Container>
    );
  }
}

export default LoginView;
