import React from "react";
import { Button } from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import LabelButton from '../components/LabelButton';
import ResponseBar from '../components/ResponseBar';
import Logo from '../components/Logo';
import SvgIcon from '@material-ui/core/SvgIcon';
import { Send, Refresh, Book } from '@material-ui/icons';


// using json created by upload component
import PatientResponse from '../backend/flask_backend/patient_predictions.json';

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

class Results extends React.Component {
  render() {
    return (
      <div style={ styles.root }>
        <Logo
          logoSize={ 300 }
        />
        <br/>
        <h1 style={ styles.title }>Your Results:</h1>
        <p style={ styles.subtitle }>• Learn more about your predicted responses and discuss treatment options with your physician.</p>
        <ResponseBar text="Refametinib" color="lightgreen" color2="#5AEBD1" value="76" maxValue="100" rotation="160" />
        <ResponseBar text="CI-1040" color="lightgreen" color2="#5AEBD1" value="71" maxValue="100" rotation="160" />
        <ResponseBar text="Pelitinib" color="lightgreen" color2="#5AEBD1" value="62" maxValue="100" rotation="160" />
        <ResponseBar text="Afatinib" color="lightgreen" color2="#5AEBD1" value="59" maxValue="100" rotation="160" />

        <LabelButton
          text="Share"
          buttonStyle={{ backgroundColor: "#568BFF" }}
          linksTo="/upload"
          icon={ Send }
            />
      </div>
    );
  }
}

//util func for getting patient response data from json file

//util func for reading in Icons from .svg files
function buttonIcon(props) {
  const path = '../images/svg/' + props.iconName + '.svg'
  return (
    <SvgIcon { ...props }>
      <path d={ path } />
    </SvgIcon>
  );
}

export default Results
