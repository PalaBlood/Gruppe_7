import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Paper, Typography, Tabs, Tab, Modal, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ProfileDropDown from '../dialogs/ProfileDropDown';
import UserList from '../UserList';
import SettingsIcon from '@mui/icons-material/Settings';
import MicrowaveIcon from '@mui/icons-material/Microwave';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import KitchenIcon from '@mui/icons-material/Kitchen';

class Header extends Component {
  state = {
    tabindex: 0,
    openUserList: false 
  };

  handleTabChange = (event, newValue) => {
    this.setState({ tabindex: newValue });
  };

  toggleUserListModal = () => {
    this.setState(prevState => ({
      openUserList: !prevState.openUserList
    }));
  };

  render() {
    const { user } = this.props;
    const { openUserList, tabindex } = this.state;

    return (
      <Paper variant='outlined' style={{
        borderRadius: '10px', 
        overflow: 'hidden', 
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)'
      }}>
        <ProfileDropDown user={user} />
        <Typography variant='h3' component='h1' align='center' style={{
          marginTop: '20px', 
          marginBottom: '10px', 
          fontWeight: 'bold'
        }}>
          HdMSmartFridge
        </Typography>
        {user && (
          <Tabs 
            indicatorColor='primary' 
            textColor='primary' 
            centered 
            value={tabindex} 
            onChange={this.handleTabChange}
            style={{
              marginBottom: '20px'
            }}
          >
            <Tab icon={<HomeIcon />} label='Home' component={RouterLink} to='/home'/>
            <Tab icon={<MicrowaveIcon />} label='Recipes' component={RouterLink} to='/recipes' />
            <Tab icon={<KitchenIcon />} label='Fridge' component={RouterLink} to='/fridge' />
            <Tab icon={<SettingsIcon />} label='User' onClick={() => this.toggleUserListModal()} />
            <Tab icon={<InfoIcon />} label='About' component={RouterLink} to='/about' />
          </Tabs>
        )}
        <Modal
          open={openUserList}
          onClose={this.toggleUserListModal}
          style={{
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center'
          }}
        >
          <Box style={{
            backgroundColor: 'white', 
            boxShadow: '24px', 
            padding: '20px', 
            borderRadius: '10px',
            width: 400,  // Ensure modal is centered and sized appropriately
            outline: 'none'  // Remove default focus outline
          }}>
            <UserList /> 
          </Box>
        </Modal>
      </Paper>
    );
  }
}

Header.propTypes = {
  user: PropTypes.object,
};

export default Header;
