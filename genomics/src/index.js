import React from 'react';
import {Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Dashboard from './views/Dashboard';
import Login from './views/Login';
import Signup from './views/Signup';
import Upload from './views/Upload';
import Results from './views/Results';

import * as serviceWorker from './serviceWorker';

const routing = (
  <div>
  <Router>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/upload" component={Upload} />
      <Route path="/results" component={Results} />
      <Route path="/results/:filename" component={Results} />
      </Switch>
  </Router>
  </div>

)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
