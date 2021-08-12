import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { createBrowserHistory } from 'history';
import { firebase } from './firebase';
import { logUser, createdAt } from './actions';
import reducer from './reducers';

import App from './components/App';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import './index.css';

const store = createStore(reducer);
const history = createBrowserHistory();

firebase.auth().onAuthStateChanged((user) => {
  if(user) {
    const { email } = user;
    const today = Date.now();
    store.dispatch(logUser(email));
    history.replace('/app');
  } else {
    history.replace('/signin');
  }
});

ReactDOM.render(
  <Provider store={store}>
    <Router path='/' history={history}>
      <Route path='/app' component={App} />
      <Route path='/signin' component={SignIn} />
      <Route path='/signup' component={SignUp} />
    </Router>
  </Provider>
  , document.getElementById('root'));
