import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Person } from '@material-ui/icons';
import LabelButton from '../components/LabelButton';
import { withStyles } from '@material-ui/core/styles';
import './response_styles.scss';

const styles = ({
  progressBarWrapper: {
    margin: "10px 0",

    progressBar: {
      minHeight: "40px",
      width: "100%",

      progressBarProgress: {
        minHeight: "40px",
        display: 'flex',
        alignItems: "center",
        justifyContent: "flex-end",
        boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.2)",
        minWidth: 0,
        width: "100%",
        transition: "all 1s ease"
      },

      responsePercentage: {
        fontFamily: "Gotham Book sans-serif",
      }
  }
},
  drugName: {
    fontSize: 24,
    fontFamily: "Gotham Book sans-serif",
    color: "#B877E9",
  },

});


// https://codepen.io/federspielen/pen/vedgme
class ProgressBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      maxWidth: 0
    };
    this.targetPercentage = this.props.value / this.props.maxValue;
  }

  progressBarStyle() {
    return {
      backgroundImage:
        "linear-gradient(" +
        this.props.rotation +
        "deg, " +
        this.props.color +
        ", " +
        this.props.color2 +
        ")",
      maxWidth: this.state.maxWidth,
      backgroundColor: this.props.color,
      borderRadius: this.getRadius()
    };
  }

  componentDidMount() {
    setTimeout(
      () => this.setState({ maxWidth: this.targetPercentage * 100 + "%" }),
      10
    );
  }

  getRadius() {
    return (
      "5px " + (this.targetPercentage * 100 >= 100 ? "5px 5px" : "0 0") + " 5px"
    );
  }

  render() {
    return (
      <div className="progress-bar-wrapper">
        <drug-name> {this.props.text} </drug-name>
        <div className="progress-bar">
          <div
            className="progress-bar-progress"
            style={this.progressBarStyle()}
          >
            <div className="response-progress">
              {(Math.round(this.targetPercentage * 100)) + "% "}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// usage: <ProgressBar color="#369" color2="lightgreen" value="250" maxValue="295" rotation="160" />
export default ProgressBar
