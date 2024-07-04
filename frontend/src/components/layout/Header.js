import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Paper, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, ThemeProvider, useMediaQuery } from '@mui/material';
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
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const menuItems = [
    { icon: <HomeIcon style={styles.icon} />, label: 'Home', path: '/home' },
    { icon: <MicrowaveIcon style={styles.icon} />, label: 'Recipes', path: '/recipe' },
    { icon: <KitchenIcon style={styles.icon} />, label: 'Fridge', path: '/fridge' },
    { icon: <LivingIcon style={styles.icon} />, label: 'Household', path: '/household' },
    { icon: <SettingsIcon style={styles.icon} />, label: 'User', path: '/user' },
    { icon: <StraightenIcon style={styles.icon} />, label: 'Unit', path: '/unit' },
    { icon: <InfoIcon style={styles.icon} />, label: 'About', path: '/about' },
  ];

  const renderDrawer = () => (
    <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)} PaperProps={{ style: styles.drawer }}>
      <List>
        {menuItems.map((item) => (
          <ListItem button component={RouterLink} to={item.path} key={item.label} onClick={toggleDrawer(false)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} primaryTypographyProps={{ style: styles.listItemText }} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );

  const logoContainerStyle = isMobile ? styles.logoContainerMobile : styles.logoContainerDesktop;
  const logoStyle = isMobile ? styles.logoMobile : styles.logoDesktop;

  return (
    <ThemeProvider theme={Theme}>
      <Paper variant="outlined" style={styles.paper}>
        <div style={styles.headerContent}>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)} style={styles.menuButton}>
            <MenuIcon style={styles.menuIcon} />
          </IconButton>
          <div style={logoContainerStyle}>
            <img src={`${process.env.PUBLIC_URL}/images/logo.png`} alt="FridgeFinder Logo" style={logoStyle} />
          </div>
          <div style={styles.profileContainer}>
            <ProfileDropDownWithRouter user={user} />
          </div>
        </div>
        {renderDrawer()}
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
    backgroundColor: '#c6d9e7', 
    position: 'relative',
    zIndex: 1,
  },
  headerContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px',
    height: '100px', // Feste Höhe des Headers
  },
  logoContainerDesktop: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#fff', // Weißer Hintergrund
    borderRadius: '50%', // Runder Rahmen
    padding: '5px',
    boxShadow: '0 0 0 5px #fff', // Weißer Rahmen
    height: '200px',
    width: '400px',
  },
  logoContainerMobile: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#fff', // Weißer Hintergrund
    borderRadius: '50%', // Runder Rahmen
    padding: '3px',
    boxShadow: '0 0 0 2px #fff', // Weißer Rahmen
    height: '200px',
    width: '200px',
  },
  logoDesktop: {
    height: '400px', // Höhe des Logos für Desktop
    width: 'auto', // Automatische Breite, um das Seitenverhältnis beizubehalten
  },
  logoMobile: {
    height: '220px', // Höhe des Logos für Mobilgeräte
    width: 'auto', // Automatische Breite, um das Seitenverhältnis beizubehalten
  },
  menuButton: {
    zIndex: 2,
  },
  menuIcon: {
    fontSize: '2rem', // Größe des Menü-Icons
  },
  profileContainer: {
    zIndex: 2,
    display: 'flex',
    alignItems: 'center',
  },
  drawer: {
    width: '250px', // Breite des Drawers
  },
  icon: {
    fontSize: '1.5rem', // Größe der Icons im Drawer
  },
  listItemText: {
    fontSize: '1.2rem', // Größe des Textes im Drawer
  },
};

export default Header;
