import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutRequest, getStatusRequest } from '../actions/authentication';
import { Header } from '../components';

const propTypes = {
  children: React.PropTypes.any,
  status: React.PropTypes.object,
  getStatusRequest: React.PropTypes.func,
  router: React.PropTypes.any,
  logoutRequest: React.PropTypes.func,
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: this.props.status.isLoggedIn,
    };
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentWillMount() {
    this.props.getStatusRequest().then(
      () => {
        const userToken = JSON.parse(localStorage.getItem('user_token'));
        if (this.props.status.valid && userToken.id === this.props.status.currentUserId) {
          this.setState({
            isLoggedIn: true,
          });
        } else {
          this.setState({
            isLoggedIn: false,
          });
        }
      },
    );
  }


  handleLogout() {
    this.props.logoutRequest().then(
      () => {
        alert("good bye");
        localStorage.removeItem('user_token');
        this.setState({
          isLoggedIn: false,
        });
        this.props.router.push('/login');
      },
    );
  }

  render() {
    return (
      <div>
        <Header onLogout={this.handleLogout} isLoggedIn={this.state.isLoggedIn} />
        {this.props.children}
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    status: state.authentication.status,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logoutRequest: () => {
      return dispatch(logoutRequest());
    },
    getStatusRequest: () => {
      return dispatch(getStatusRequest());
    },
  };
};

App.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(App);
