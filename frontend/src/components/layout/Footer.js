import React from 'react';
import { Paper, Typography, Link, useMediaQuery } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  const isMobile = useMediaQuery('(max-width:600px)');

  if (isMobile) {
    return null; 
  }

  return (
    <Paper variant="outlined" style={styles.paper}>
      <Typography variant="body2" color="textSecondary" align="center">
        © 2024 FridgeFinder, Inc. all rights reserved.
      </Typography>
      <Typography variant="body2" color="textSecondary" align="center" style={styles.linkContainer}>
        <Link component={RouterLink} to={process.env.PUBLIC_URL + '/about'}>About</Link>
      </Typography>
    </Paper>
  );
};

const styles = {
  paper: {
    borderRadius: '10px',
    marginTop: 'auto',
    padding: '10px 20px',
    backgroundColor: '#c6d9e7',
    boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
  },
  linkContainer: {
    marginTop: '5px',
  },
};

export default Footer;