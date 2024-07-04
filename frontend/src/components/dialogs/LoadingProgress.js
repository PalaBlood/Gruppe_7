import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LinearProgress } from '@mui/material';

// LoadingProgress Component
// Shows a loading spinner while waiting for an API request
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
