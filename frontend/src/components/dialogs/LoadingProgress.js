import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LinearProgress } from '@mui/material';

//Erstellt einen Ladebalken. Kann aufgerufen werden, wenn irgendwas vom Backend geladen werden soll
class LoadingProgress extends Component {

  render() {
    const { show } = this.props;

    return (
      show ?
        <div >
          <LinearProgress sx={{width: '100%', marginTop: 2}} color='secondary' />
        </div>
        : null
    );
  }
}

LoadingProgress.propTypes = {
  show: PropTypes.bool.isRequired,
}

export default LoadingProgress;
