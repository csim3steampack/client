import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RegisterView } from '../components';
import { registerRequest } from '../actions/authentication';


const propTypes = {
  registerRequest: React.PropTypes.func,
  status: React.PropTypes.string,
  router: React.PropTypes.any,
  errorCode: React.PropTypes.number,
};

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registerErrorCode: -1,
    };
    this.handleRegister = this.handleRegister.bind(this);
  }

  handleRegister(id, password) {
    return this.props.registerRequest(id, password).then(
      () => {
        if (this.props.status === 'SUCCESS') {
          this.props.router.push('/login');
          return true;
        }
        this.setState({
          registerErrorCode: this.props.errorCode,
        });
        return false;
      },
);
  }

  render() {
    return (
      <div>
        <RegisterView onRegister={this.handleRegister} errorCode={this.state.registerErrorCode} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  status: state.authentication.register.status,
  errorCode: state.authentication.register.error,
});

const mapDispatchToProps = dispatch => ({
  registerRequest: (id, password) => dispatch(registerRequest(id, password)),
});

Register.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(Register);
