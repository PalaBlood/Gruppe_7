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

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabindex: 0,
      openUserList: false 
    };
  }

  handleTabChange = (e, newIndex) => {
    this.setState({
      tabindex: newIndex
    });
  };

  toggleUserListModal = () => {
    this.setState(prevState => ({
      openUserList: !prevState.openUserList
    }));
  };

  render() {
    const { user } = this.props;
    const { openUserList } = this.state;

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
        <Typography variant='h4' component='h2' align='center' style={{
          marginBottom: '20px'
        }}>
          
        </Typography>
        {user && (
          <Tabs 
            indicatorColor='primary' 
            textColor='primary' 
            centered 
            value={this.state.tabindex} 
            onChange={this.handleTabChange}
            style={{
              marginBottom: '20px'
            }}
          > 
            <Tab icon={<HomeIcon/>} label='Home' component={RouterLink} to={process.env.PUBLIC_URL + '/home'}/>
            <Tab icon={<MicrowaveIcon />} label='Recipes' component={RouterLink} to={process.env.PUBLIC_URL + '/recipes'} />
            <Tab icon={<SettingsIcon />} label='Haushalt verwalten' onClick={this.toggleUserListModal} />
            <Tab icon={<InfoIcon/> }label='About' component={RouterLink} to={process.env.PUBLIC_URL + '/about'} />
          </Tabs>
        )}
        <Modal
          open={openUserList}
          onClose={this.toggleUserListModal}
          aria-labelledby="user-list-modal"
          aria-describedby="modal-modal-description"
          style={{
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center'
          }}
        >
          <Box style={{
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)', 
            width: 400, 
            backgroundColor: 'white', 
            boxShadow: '24px', 
            padding: '20px', 
            borderRadius: '10px'
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
