import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Paper, Typography, Tabs, Tab, Tooltip } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ProfileDropDownWithRouter from '../dialogs/ProfileDropDown';
import SettingsIcon from '@mui/icons-material/Settings';
import MicrowaveIcon from '@mui/icons-material/Microwave';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import KitchenIcon from '@mui/icons-material/Kitchen';
import LivingIcon from '@mui/icons-material/Living';


//Benutzen von mui tooltip zur anzeige einer Beschreibung der Tabs
class Header extends Component {
  state = {
    tabindex: 0,
  };

  handleTabChange = (event, newValue) => {
    this.setState({ tabindex: newValue });
  };

  render() {
    const { user } = this.props;
    const { tabindex } = this.state;

    return (
      <Paper variant='outlined' style={{
        borderRadius: '10px', 
        overflow: 'hidden', 
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)'
      }}>
        <ProfileDropDownWithRouter user={user} />
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
            <Tooltip title="Here is our Homepage">
              <Tab icon={<HomeIcon />} label='Home' component={RouterLink} to='/home'/>
            </Tooltip>
            <Tooltip title="Here you can find your saved Recipes">
              <Tab icon={<MicrowaveIcon />} label='Recipes' component={RouterLink} to='/recipes' />
            </Tooltip>
            <Tooltip title="Here you can find your Groceries">
              <Tab icon={<KitchenIcon />} label='Fridge' component={RouterLink} to='/fridge' />
            </Tooltip>
            <Tooltip title="Here you can see whos in your Household">
              <Tab icon={<LivingIcon />} label='Household' component={RouterLink} to='/household' />
            </Tooltip>
            <Tooltip title="Here you can edit your User Profile">
              <Tab icon={<SettingsIcon />} label='User' component={RouterLink} to='/user'/>
            </Tooltip>
            <Tooltip title="About our App">
              <Tab icon={<InfoIcon />} label='About' component={RouterLink} to='/about' />
            </Tooltip>
          </Tabs>
        )}
      </Paper>
    );
  }
}

Header.propTypes = {
  user: PropTypes.object,
};

export default Header;

