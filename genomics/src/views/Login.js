import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// https://reacttraining.com/react-router/web/guides/quick-start
import { Button } from '@material-ui/core/Button';
import Logo from '../components/Logo'

const styles = ({
  body: {
    fontFamily: "Source Sans, sans-serif",
    lineHeight: 24,
    fontSize: 16,
    color: "#000000"
  },
  root: {
    backgroundColor: '#FEF9FE',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 35,
  },
  title: {
    fontFamily: "Source Sans, sans-serif",
    lineHeight: 5,
    fontSize: 28,
    color: "#000000",
    textAlign: 'center'
  },

  // for gradient login screen form codepen

  // $gray: #27282d,
  // $medium-gray: lighten(#27282d, 25%),
  // $light-gray: lighten(#27282d, 65%),
  // $gradient: linear-gradient(140deg, rgb(219, 98, 65) 0%, rgb(229, 91, 141) 100%),
  /*
  body: {
    backgroundImage: '$gradient',
    height: 100,
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  .App
    background:
    height: 340px
    width: 520px
    margin: 0 auto
    border-radius: 5px
    box-shadow: 0px 4px 30px -5px rgba(0,0,0,0.65)
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center

  .input-container
    position: relative
    margin-bottom: 30px
    width: 340px

  input, button
    font-family: 'Dosis', sans-serif
    letter-spacing: 1.3px

  input
    box-sizing: border-box
    background: transparent
    width: 100%
    border: none
    border-bottom: 1px solid $medium-gray
    color: $light-gray
    padding: 12px 6px 12px 36px
    font-size: 19px
    outline: none
    caret-color: rgb(229, 91, 141)

  input:focus
    border-bottom: 1px solid transparent
    border-image: $gradient
    border-image-slice: 1

  input:focus + i
    color: $light-gray

  ::placeholder
      color: $light-gray
      opacity: .4
  i
    color: $medium-gray
    position: absolute
    left: 6px
    top: 50%
    transform: translateY(-50%)
    transition: color .3s

  button
    background: lighten($gray, 5%)
    border: none
    border-radius: 30px
    color: $light-gray
    font-size: 16px
    padding: 16px 36px
    cursor: pointer
    transition: all .3s
    margin-top: 20px
    margin-bottom: -30px
    box-shadow: 0px 4px 15px -5px rgba(0,0,0,0.65)
    transition: all .3s

  button:hover
    background: lighten($gray, 10%)
    box-shadow: 0px 5px 20px -3px rgba(0,0,0,0.65)

  @media screen and (max-width: 620px)

    .App
      min-height: 300px
      max-height: 420px
      width: 90vw

    .input-container
      width: 80%
      margin-bottom: 40px

    button
      margin-top: 10px
      margin-bottom: -20px
  */
});

class Login extends Component {
  render() {
    return (
      <div id={ styles.root }>
        <Logo
          logoSize={ 300 }
        />
        <h1 style={ styles.title }>Welcome! Please authenticate here:</h1>
      </div>
    );
  }
}

export default Login