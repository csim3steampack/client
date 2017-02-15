import React, { Component } from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Input, FormFeedback, Label } from 'reactstrap';

const propTypes = {
  onRegister: React.PropTypes.func,
};

class RegisterView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      password: '',
      email: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
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
    const IdLength = this.state.id.length;

    const userIDInitial = (
      <Form>
        <FormGroup>
          <Label>User ID</Label>
          <Input
            name="id"
            type="text"
            value={this.state.id}
            onChange={this.handleChange}
          />
          <FormFeedback>ID length should be 4~12</FormFeedback>
        </FormGroup>
      </Form>
    );

    const userIDSuccess = (
      <Form>
        <FormGroup color="success">
          <Label>User ID</Label>
          <Input
            state="success"
            name="id"
            type="text"
            value={this.state.id}
            onChange={this.handleChange}
          />
          <FormFeedback>Success! You did it!</FormFeedback>
        </FormGroup>
      </Form>
    );

    /* PASSWORD SECTION */
    

    return (
      <Container fluid className="auth-view-body">
        <Row>
          <Col sm="7" />
          <Col sm="4" className="auth-div">
            <h3>Register</h3>
            <div>{(IdLength > 3 && IdLength < 13) ? userIDSuccess : userIDInitial }</div>
            <input
              name="password"
              type="password"
              placeholder="PASSWORD"
              onChange={this.handleChange}
              value={this.state.password}
            />
            <input
              name="email"
              type="text"
              placeholder="EMAIL ADDRESS"
              onChange={this.handleChange}
              value={this.state.email}
              onKeyPress={this.handleKeyPress}
            />
            <Button onClick={this.handleRegister}>REGISTER</Button>
          </Col>
          <Col sm="1" />
        </Row>
      </Container>
    );
  }
}

RegisterView.propTypes = propTypes;

export default RegisterView;
