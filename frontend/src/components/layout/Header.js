import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Paper, Typography, Tabs, Tab, Tooltip, ThemeProvider, useMediaQuery, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import ProfileDropDownWithRouter from '../dialogs/ProfileDropDown';
import SettingsIcon from '@mui/icons-material/Settings';
import MicrowaveIcon from '@mui/icons-material/Microwave';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import KitchenIcon from '@mui/icons-material/Kitchen';
import LivingIcon from '@mui/icons-material/Living';
import StraightenIcon from '@mui/icons-material/Straighten';
import Theme from '../../theme.js';

const Header = ({ user }) => {
  const [tabindex, setTabindex] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleTabChange = (event, newValue) => {
    setTabindex(newValue);
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const isMobile = useMediaQuery('(max-width:600px)');
  const isTablet = useMediaQuery('(max-width:960px)');

  const menuItems = [
    { icon: <HomeIcon />, label: 'Home', path: '/home' },
    { icon: <MicrowaveIcon />, label: 'Recipes', path: '/recipe' },
    { icon: <KitchenIcon />, label: 'Fridge', path: '/fridge' },
    { icon: <LivingIcon />, label: 'Household', path: '/household' },
    { icon: <SettingsIcon />, label: 'User', path: '/user' },
    { icon: <StraightenIcon />, label: 'Unit', path: '/unit' },
    { icon: <InfoIcon />, label: 'About', path: '/about' },
  ];

  const renderTabs = () => (
    <Tabs
      indicatorColor="primary"
      textColor="primary"
      centered={!isMobile}
      value={tabindex}
      onChange={handleTabChange}
      variant={isMobile ? 'scrollable' : 'fullWidth'}
      scrollButtons={isMobile ? 'on' : 'off'}
      allowScrollButtonsMobile
      style={styles.tabs}
    >
      {menuItems.map((item, index) => (
        <Tooltip title={`Here is our ${item.label.toLowerCase()}`} key={item.label}>
          <Tab icon={item.icon} label={isTablet ? '' : item.label} component={RouterLink} to={item.path} />
        </Tooltip>
      ))}
    </Tabs>
  );

  const renderDrawer = () => (
    <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
      <List>
        {menuItems.map((item, index) => (
          <ListItem button component={RouterLink} to={item.path} key={item.label} onClick={toggleDrawer(false)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );

  return (
    <ThemeProvider theme={Theme}>
      <Paper variant="outlined" style={styles.paper}>
        <ProfileDropDownWithRouter user={user} />
        <Typography variant={isMobile ? 'h5' : 'h3'} component="h1" align="center" style={styles.typography}>
          FridgeFinder
        </Typography>
        {isMobile ? (
          <>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)} style={styles.menuButton}>
              <MenuIcon />
            </IconButton>
            {renderDrawer()}
          </>
        ) : (
          user && renderTabs()
        )}
      </Paper>
    </ThemeProvider>
  );
};

Header.propTypes = {
  user: PropTypes.object,
};

const styles = {
  paper: {
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
    width: '100%',
    display: 'flex',
    flex: '1',
    flexDirection: 'column',
    position: 'relative',
  },
  typography: {
    marginTop: '0px',
    marginBottom: '20px',
    fontWeight: 'bold',
    fontFamily: 'Roboto Mono, sans-serif',
    letterSpacing: '0.1em',
  },
  tabs: {
    marginBottom: '20px',
  },
  menuButton: {
    position: 'absolute',
    left: '10px',
    top: '10px',
  },
};

export default Header;

