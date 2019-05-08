import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Login from './views/Login'
import logo from './images/predictiveGenomicsLogo.png';
import './App.css';
import FileUpload from './components/FileUpload';

class App extends Component {
  render() {
    return (
      <Login />
    );
  }
}

export default App;
