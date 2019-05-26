import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// https://reacttraining.com/react-router/web/guides/quick-start
import { Button } from '@material-ui/core/Button';
import Logo from '../components/Logo';
import SignupForm from '../components/SignupForm';

const styles = ({
  body: {
    fontFamily: "Source Sans, sans-serif",
    lineHeight: 24,
    fontSize: 16,
    color: "#222"
  },
  root: {
    backgroundColor: '#FEF9FE',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontFamily: "Source Sans, sans-serif",
    lineHeight: 5,
    fontSize: 28,
    color: "#222",
    textAlign: 'center'
  }

});

class Signup extends Component {
  render() {
    return (
      <div id={ styles.root }>
        <Logo
          logoSize={ 300 }
        />
        <SignupForm />
      </div>
    );
  }
}

export default Signup
