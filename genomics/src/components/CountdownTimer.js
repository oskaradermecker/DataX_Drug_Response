import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './countdown_styles.sass';
import LabelButton from '../components/LabelButton';
import { Cloud, Memory } from '@material-ui/icons';

const zerofill = num => ((num < 10 && num >= 0) ? `0${num}` : num);

class Input extends React.Component {

  onSubmit(event) {
    console.log('submit clicked');
    const seconds = this.props.seconds >= 0 ? this.props.seconds: 15
    this.props.onSetCountdown(seconds);
  }

  render() {
    return (
      <LabelButton
        text="Upload"
        buttonStyle={{ backgroundColor: "#568BFF" }}
        icon={ Memory }
        onClick={this.onSubmit.bind(this)}
      />
    )
  }
}

class CountdownTimer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: this.props.seconds,
      running: false,
    }
    console.log("timer initialized");
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.running !== prevState.running){
      switch(this.state.running) {
        case true:
          this.handleStart();
      }
    }
  }

  handleStart() {
    this.timer = setInterval(() => {
      const newCount = this.state.count - 1;
      if (newCount <= 0) {
        console.log("timer finished");
        this.props.toResults(true);
      }
      this.setState(
        {count: newCount >= 0 ? newCount : 0}
      );
    }, 1000);
  }

  handleStop() {
    if(this.timer) {
      clearInterval(this.timer);
      this.setState(
        {running:false}
      );
    }
  }

  handleReset() {
    this.setState(
      {count: 0}
    );
  }

  handleCountdown(seconds) {
    this.setState({
      count: seconds,
      running: true
    })
  }

  // for stopping/resetting timer display
  // <Button label="stop" onClickHandler={this.handleStop.bind(this)}/>
  // <Button label="reset" onClickHandler={this.handleReset.bind(this)}/>
  render() {
    const {count} = this.state;
    return (
      <div className="container">
        <div className="clock__display">
          <SvgCircle max={this.props.seconds} done={count} />
          <div className="clock__text clock__text--seconds">
            <span className="clock__amount">{zerofill(count)}</span>
            <span className="clock__unit">seconds</span>
          </div>
        </div>
        <Input
          seconds={this.props.seconds}
          onSetCountdown={this.handleCountdown.bind(this)}
        />
      </div>

    )
  }
}

const SvgCircle = (props) => {
  const { className, done, max, radius, stroke, strokeWidth } = props
  const size = (radius + strokeWidth) * 2
  const length = Math.ceil(2 * radius * Math.PI)
  const remainingLength = length - (Math.ceil(2 * radius * Math.PI) * (done / max))
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <circle
          className="circle"
          r={radius}
          cx={radius + strokeWidth}
          cy={radius + strokeWidth}
          stroke={stroke}
          strokeDasharray={length}
          strokeDashoffset={remainingLength}
          strokeLinecap="round"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          className="circle--bg"
          r={radius}
          cx={radius + strokeWidth}
          cy={radius + strokeWidth}
          stroke="rgba(0, 0, 0, .1)"
          strokeLinecap="round"
          strokeWidth={strokeWidth}
          fill="none"
        />
      </g>
    </svg>
  );
}

SvgCircle.defaultProps = {
  done: 0,
  max: 24,
  radius: 72,
  stroke: '#5AEBD1',
  strokeWidth: 10,
}

CountdownTimer.propTypes = {
  seconds: PropTypes.number,
  finishedUploading: PropTypes.bool,
  toResults: PropTypes.func
}

export default CountdownTimer;
