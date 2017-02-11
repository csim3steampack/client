import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';


class RegisterView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      password: '',
      teamname: '',
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
            Register for STEAMPACK
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
            <input
              name="teamname"
              type="text"
              placeholder="TEAM NAME"
              onChange={this.handleChange}
              value={this.state.teamname}
            />
            <Button>REGISTER</Button>
          </Col>
          <Col sm="1" />
        </Row>
      </Container>
    );
  }
}

export default RegisterView;
