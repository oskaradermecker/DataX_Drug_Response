/* Sidebar.jsx */
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { TouchApp } from '@material-ui/icons';
import LabelButton from '../components/LabelButton';
import { withStyles } from '@material-ui/core/styles';
import './login_styles.scss';

/* App.jsx */
class SignupForm extends React.Component {
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
              type='email'
              required
              />
            <label>email</label>
          </div>
          <div className='form_inputs'>
            <input
              type='password'
              required
              />
            <label>password</label>
          </div>
          <div className='form_inputs'>
            <input
              type='institution'
              required
              />
            <label>institution</label>
          </div>
          <LabelButton
            text="Register"
            buttonStyle={{ backgroundColor: "#568BFF" }}
            linksTo="/dashboard"
            icon={TouchApp}
          />
        </form>
      </div>
    );
  }

}

export default SignupForm;
