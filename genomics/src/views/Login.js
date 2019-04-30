import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// https://reacttraining.com/react-router/web/guides/quick-start
import { Button } from '@material-ui/core/Button';

class Login extends Component {
  render() {
    return (
      <h1>
        Welcome! Please login here.
      </h1>
    );
  }
}

export default Login
