import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Dashboard from './views/Dashboard'
import logo from './images/predictiveGenomicsLogo.png';
import './App.css';

class App extends Component {
  render() {
    return (
      <Dashboard />
    );
  }
}

export default App;
