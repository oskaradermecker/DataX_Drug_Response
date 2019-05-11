import React from "react";
import { Button } from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import LabelButton from '../components/LabelButton';
import ResponseBar from '../components/ResponseBar';
import Logo from '../components/Logo';
import SvgIcon from '@material-ui/core/SvgIcon';
import { Send, Refresh, Book } from '@material-ui/icons';
import axios from 'axios';

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
  constructor(props) {
    super(props);

    this.state = {
      dataFile: "patient_predictions.json",
      numDrugs: 0
    };
  }

  componentDidMount() {
    const resultsURL = this.props.location.state.results;
    console.log('URL to results passed from Upload:', resultsURL);

    var data = require("../backend/flask_backend/patient_predictions.json"); // forward slashes will depend on the file location
    this.state.numDrugs = data.length;
    for(var i = 0; i < data.length; i++) {
        var obj = data[i];
        console.log('OBJJJJ',obj);
      }
  }

  render() {
    var drugs = [];
    var certainties = [];
    var data = require("../backend/flask_backend/patient_predictions.json"); // forward slashes will depend on the file location
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
          console.log(key + " -> " + data[key]);
          drugs.push(data[key]['Drug']);
          certainties.push(data[key]['Certainty']);
          console.log(data[key]['Drug'] + ' has response ' + data[key]['Certainty']);
      }
    }
    return (
      <div style={ styles.root }>
        <Logo
          logoSize={ 300 }
        />
        <br/>
        <h1 style={ styles.title }>Your Results:</h1>
        <p style={ styles.subtitle }>• Learn more about your predicted responses and discuss treatment options with your physician.</p>

        <ul>
          {drugs.map(function(name, index){
              return <ResponseBar text={name} color="lightgreen" color2="#5AEBD1" value={certainties[index] * 100} maxValue="100" rotation="160" />
            })}
        </ul>
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
