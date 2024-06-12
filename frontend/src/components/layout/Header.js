import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Paper, Typography, Tabs, Tab, Modal, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ProfileDropDown from '../dialogs/ProfileDropDown';
import UserList from '../UserList';

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
      <Paper variant='outlined'>
        <ProfileDropDown user={user} />
        <Typography variant='h3' component='h1' align='center'>
          CoolTech SmartFridges
        </Typography>
        <Typography variant='h4' component='h2' align='center'>
          Lebensmittel Rezepte Einkaufsliste Haushalt
        </Typography>
        {user && (
          <Tabs indicatorColor='primary' textColor='primary' centered value={this.state.tabindex} onChange={this.handleTabChange}>
            <Tab label='Recipes' component={RouterLink} to={process.env.PUBLIC_URL + '/recipes'} />
            <Tab label='All Users' onClick={this.toggleUserListModal} />
            <Tab label='About' component={RouterLink} to={process.env.PUBLIC_URL + '/about'} />
          </Tabs>
        )}
        <Modal
          open={openUserList}
          onClose={this.toggleUserListModal}
          aria-labelledby="user-list-modal"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
            <Typography id="user-list-modal-title" variant="h6" component="h2">
              User List
            </Typography>
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
