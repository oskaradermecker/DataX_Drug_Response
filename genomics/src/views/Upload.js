import React from "react";
import { Button } from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import LabelButton from '../components/LabelButton';
import FileUpload from '../components/FileUpload';
import CountdownTimer from '../components/CountdownTimer';
import Logo from '../components/Logo';
import SvgIcon from '@material-ui/core/SvgIcon';
import { Attachment } from '@material-ui/icons';

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
  render() {
    return (
      <div style={ styles.root }>
        <Logo
          logoSize={ 300 }
        />
        <br/>
        <h1 style={ styles.title }>Get Started:</h1>
        <p style={ styles.subtitle }>• Upload a .csv containing your mutation data.</p>
        < FileUpload />
        < CountdownTimer seconds={15}/>
      </div>
    );
  }
}

export default Upload
