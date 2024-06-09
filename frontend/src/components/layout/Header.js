import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
// import ProfileDropDown from '../dialogs/ProfileDropDown'; // Auskommentieren

const Header = ({ user }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Bank Administration
        </Typography>
        {user && (
          <>
            <Button color="inherit">{user.displayName}</Button>
            {/* <ProfileDropDown user={user} /> // Auskommentieren */}
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
