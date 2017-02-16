import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { App, GroundDisplay, Home, Login, Register, GameRegister, GameRegisterEdit } from './containers';

const store = createStore(reducers, applyMiddleware(thunk));

const rootElement = document.getElementById('root');
ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="/Home" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/game_register" component={GameRegister} />
        <Route path="/game_register/edit" component={GameRegisterEdit} />
        <Route path="/ground_display" component={GroundDisplay} />
      </Route>
    </Router>
  </Provider>, rootElement);
