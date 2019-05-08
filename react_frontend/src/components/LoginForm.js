/* Sidebar.jsx */
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Person } from '@material-ui/icons';
import LabelButton from '../components/LabelButton';
import { withStyles } from '@material-ui/core/styles';
import './login_styles.scss';

/* App.jsx */
class LoginForm extends React.Component {
  render() {
    return (
      <div className='form'>
        <form className='form_items'>
          <div className='form_inputs'>
            <input
              type='text'
              required
              />
            <label>username</label>
          </div>
          <div className='form_inputs'>
            <input
              type='password'
              required
              />
            <label>password</label>
          </div>
          <LabelButton
            text="Login"
            buttonStyle={{ backgroundColor: "#568BFF" }}
            linksTo="/dashboard"
            icon={Person}
          />
        </form>
        <div className='form_other'>
          <a href='#'>Sign Up</a>
          <a href='#'>Skip</a>
        </div>
      </div>
    );
  }

}

export default LoginForm;
