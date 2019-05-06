import React from "react";
import { Button } from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import LabelButton from '../components/LabelButton';
import Logo from '../components/Logo';
import SvgIcon from '@material-ui/core/SvgIcon';
import { Create, Inbox, Healing, Web} from '@material-ui/icons';

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

class Dashboard extends React.Component {
  render() {
    return (
      <div style={ styles.root }>
        <Logo
          logoSize={ 300 }
        />
        <br/>
        <h1 style={ styles.title }>About this App:</h1>
        <p style={ styles.subtitle }>• This service is intended to serve as an educational tool to predict drug response for cancer treatments from patient mutation data.</p>
        <p style={ styles.subtitle }>• Always consult a licensed physician before making decisions and use results from this project with discretion.</p>
        <LabelButton
          text="Test"
          buttonStyle={{ backgroundColor: "#568BFF" }}
          linksTo="/upload"
          icon={ Healing }
            />
        <p style={ { textAlign: 'center' } }> or </p>
        <LabelButton
          text="History"
          buttonStyle={ { backgroundColor: "#B877E9" } }
          linksTo="/login"
          icon={ Web }
            />
      </div>
    );
  }
}

//util func for reading in Icons from .svg files
function buttonIcon(props) {
  const path = '../images/svg/' + props.iconName + '.svg'
  return (
    <SvgIcon { ...props }>
      <path d={ path } />
    </SvgIcon>
  );
}

export default Dashboard
