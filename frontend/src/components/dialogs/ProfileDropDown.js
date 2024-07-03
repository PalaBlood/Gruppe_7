import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { Popover, IconButton, Avatar, ClickAwayListener, Typography, Paper, Button, Grid, Divider, Box } from '@mui/material';
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

class ProfileDropDown extends Component {

  
  #avatarButtonRef = createRef();
  // Konstruktor mit Initialisierung des States
  constructor(props) {
    super(props);

  // Initialisierung des states
    this.state = {
      open: false,
    }
  }

  // Funktion zum Öffnen des Popovers
  handleAvatarButtonClick = () => {
    this.setState({
      open: !this.state.open
    });
  }

 // Funktion zum Schließen des Popovers
  handleClose = () => {
    this.setState({
      open: false
    });
  }

  // Funktion zum Abmelden des Benutzers
  handleSignOutButtonClicked = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      this.props.navigate('/');
    });
  }

  render() {
    // Extract the user attribute from the props
    const { user } = this.props;
    // Extract the open attribute from the state
    const { open } = this.state;

    return (
      user ?
        <Box>
          <IconButton sx={{ float: 'right' }} ref={this.#avatarButtonRef} onClick={this.handleAvatarButtonClick}>
            <Avatar src={user.photoURL} />
          </IconButton>

          <Popover 
            open={open} 
            anchorEl={this.#avatarButtonRef.current} 
            onClose={this.handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            PaperProps={{
              sx: { 
                mt: 1, 
                boxShadow: 3,
                borderRadius: 2,
                width: 260
              }
            }}
          >
            <ClickAwayListener onClickAway={this.handleClose}>
              <Paper sx={{ padding: 2, bgcolor: 'background.default' }}>
                <Typography align='center' variant='h6' sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                  Hallo
                </Typography>
                <Divider sx={{ margin: 1 }} />
                <Typography align='center' variant='body1' sx={{ fontWeight: 'medium' }}>{user.displayName}</Typography>
                <Typography align='center' variant='body2' sx={{ color: 'text.secondary' }}>{user.email}</Typography>
                <Divider sx={{ margin: 1 }} />
                <Grid container justifyContent='center'>
                  <Grid item>
                    <Button 
                      color='primary' 
                      variant="contained"
                      onClick={this.handleSignOutButtonClicked} 
                      sx={{ mt: 1 }}
                    >
                      Ausloggen
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </ClickAwayListener>
          </Popover>
        </Box>
        : null
    )
  }
}

/** PropTypes */
ProfileDropDown.propTypes = {
  user : PropTypes.object,
}


const ProfileDropDownWithRouter = (props) => {
  const navigate = useNavigate();
  return <ProfileDropDown {...props} navigate={navigate} />;
};

export default ProfileDropDownWithRouter;


