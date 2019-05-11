import React from "react";
import { Button } from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import LabelButton from '../components/LabelButton';
import FileUploader from '../components/FileUploader';
import CountdownTimer from '../components/CountdownTimer';
import Logo from '../components/Logo';
import SvgIcon from '@material-ui/core/SvgIcon';
import { Attachment } from '@material-ui/icons';
import { Redirect } from 'react-router-dom';

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
    padding: 20,
  },
  title: {
    fontFamily: "Gotham, sans-serif",
    fontSize: 32,
    color: "#222"
  },
  subtitle: {
    fontFamily: "Gotham, sans-serif",
    fontSize: 18,
    color: "#222"
  }
});

class Upload extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      finishedUploading: false,
      dataFile: "",
      resultsFile:""
    };
  }

  render() {
    if (this.state.finishedUploading) {
      console.log("data file URL:", this.state.resultsFile['data']);
      this.props.history.push('/results', { results: this.state.resultsFile['data'] });
    }
    if (this.state.dataFile != "") {
      console.log("file " + this.state.dataFile + " successfuly uploaded!");
    }
    if (this.state.resultsFile != "") {
      console.log("model results returned by axios at URL:", this.state.resultsFile);
    }
    return (
      <div style={ styles.root }>
        <Logo
          logoSize={ 300 }
        />
        <br/>
        <h1 style={ styles.title }>Get Started:</h1>
        <p style={ styles.subtitle }>• Upload a .csv containing your mutation data.</p>
        <FileUploader
          uploadFileURL={(dataFile) => this.setState({dataFile})}
          returnResultsURL={(resultsFile) => this.setState({resultsFile})}
        />
        <br/>
        <CountdownTimer
          seconds={5}
          finishedUploading={this.state.finishedUploading}
          toResults={(finishedUploading) => this.setState({finishedUploading})}
        />
      </div>
    );
  }
}

export default Upload
