import React from "react";
import logo from '../images/predictiveGenomicsLogo.png';

const styles = ({
  headerImage: {
    width: 200,
  },
  appHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default class Logo extends React.Component {
  render() {
    return (
      <div style={styles.appHeader}>
        <img src={logo} style={styles.headerImage} alt="logo"/>
      </div>
    );
  }
}
