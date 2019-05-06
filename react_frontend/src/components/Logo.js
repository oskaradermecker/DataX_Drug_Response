import React from "react";
import PropTypes from 'prop-types';
import logo from '../images/predictiveGenomicsLogo.png';

const styles = ({
  headerImage: {
    width: 200,
  },
  appHeader: {
    paddingTop: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default class Logo extends React.Component {
  render() {
    return (
      <div style={styles.appHeader}>
        <img src={logo} style={{width: this.props.logoSize}} alt="logo"/>
      </div>
    );
  }
}

Logo.propTypes = {
  logoSize: PropTypes.any
};
