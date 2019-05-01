import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import classNames from 'classnames';
import SvgIcon from '@material-ui/core/SvgIcon';

const styles = theme => ({
  button: {
    alignItems: 'center',
    padding: 25,
    margin: 15,
    width: '90%',
    boxShadow: 'bottom',
    borderRadius: 0
  },
  container: {
    display: 'flex',
    justifyContents: 'center'
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  iconLarge: {
    fontSize: 36,
    padding: 10
  },
  buttonText: {
    fontFamily: "Source, sans-serif",
    color: "white",
    fontSize: 36,
    fontWeight: "light"
  },
});

function createIcon(props) {
  const finPath = "../images/svg/" + props.path;
  return (
    <SvgIcon {...props}>
      <path d={ finPath } />
    </SvgIcon>
  );
}


class LabelButton extends React.Component {
  buttonClick = () => {
    if (this.props.onClick) this.props.onClick();
    if (this.props.linksTo) this.props.history.push(this.props.linksTo);
  };

  render() {
    const Icon = this.props.icon;
    const { classes } = this.props;
    return (
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          style={this.props.buttonStyle}
          href={this.props.linksTo}
          size='large'
        >
        <Icon className={classes.leftIcon, classes.iconLarge}/>
        <Typography className={classes.buttonText}>
          {this.props.text}
        </Typography>
        </Button>
      </div>
    );
  }
}

LabelButton.propTypes = {
  buttonStyle: PropTypes.object,
  text: PropTypes.string,
  icon: PropTypes.any,
  // iconPath: PropTypes.string,
  size: PropTypes.any,
  linksTo: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LabelButton);
