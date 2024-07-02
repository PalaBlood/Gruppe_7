import React, { Component } from 'react';
import { Paper, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

class Footer extends Component {
  render() {
    return (
      <Paper variant="outlined" style={{
        borderRadius: '10px',
        marginTop: 'auto',
        padding: '10px 20px',
        backgroundColor: '#f3f3f3',
        boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)'
      }}>
        <Typography variant="body1" color="textSecondary" align="center">
          © 2024 HdMSmartFridge, Inc. All rights reserved.
        </Typography>
        <Typography variant="body2" color="textSecondary" align="center" style={{ marginTop: '5px' }}>
          <Link component={RouterLink} to={process.env.PUBLIC_URL + '/privacy'}>Privacy Policy</Link> | <Link component={RouterLink} to={process.env.PUBLIC_URL + '/terms'}>Terms of Service</Link>
        </Typography>
      </Paper>
    );
  }
}

export default Footer;
