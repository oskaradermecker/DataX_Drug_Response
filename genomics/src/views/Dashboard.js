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
    alignItems: 'center',
    justifyContent: 'center',
    padding: 35,
  }
});

class Dashboard extends React.Component {
  render() {
    return (
      <div style={ styles.root }>
        <Logo />
        <h1>About this App:</h1>
        <p>• This service is intended to serve as an educational tool to predict drug response for cancer treatments from patient mutation data.</p>
        <p>• Always consult a licensed physician before making decisions and use results with discretion.</p>
        <LabelButton
          text="Test"
          buttonStyle={{ backgroundColor: "#568BFF" }}
          linksTo="/login"
          icon={Healing}
            />
        <LabelButton
          text="History"
          buttonStyle={{ backgroundColor: "#B877E9" }}
          linksTo="/login"
          icon={Web}
            />
      </div>
    );
  }
}

function buttonIcon(props) {
  const path = '../images/svg/' + props.iconName + '.svg'
  return (
    <SvgIcon {...props}>
      <path d={ path } />
    </SvgIcon>
  );
}

// const StyledButton = withStyles({
//   root: {
//     background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
//     borderRadius: 3,
//     border: 0,
//     color: 'white',
//     height: 48,
//     padding: '0 30px',
//     boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
//   },
//   label: {
//     textTransform: 'capitalize',
//   },
// })(Button);

export default Dashboard
