import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Paper, Typography, Tabs, Tab } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ProfileDropDown from '../dialogs/ProfileDropDown';

/**
 * Shows the header with the main navigation Tabs within a Paper.
 *
 * @see See Material-UIs [Tabs](https://mui.com/material-ui/react-tabs/)
 * @see See Material-UIs [Paper](https://mui.com/material-ui/react-paper/)
 *
 * @author [Christoph Kunz](https://github.com/christophkunz)
 */
class Header extends Component {

  constructor(props) {
    super(props);

    // Init an empty state
    this.state = {
      tabindex: 0
    };
  }

  /** Handles onChange events of the Tabs component */
  handleTabChange = (e, newIndex) => {
    // console.log(newValue)
    this.setState({
      tabindex: newIndex
    })
  };

  /** Renders the component */
  render() {
    const { user } = this.props;

    return (
      <Paper variant='outlined' >
        <ProfileDropDown user={user} />
        <Typography variant='h3' component='h1' align='center'>
          HdM Bank Administration
        </Typography>
        <Typography variant='h4' component='h2' align='center'>
          Client Advisor Home
        </Typography>
        {
          user ?
            <Tabs indicatorColor='primary' textColor='primary' centered value={this.state.tabindex} onChange={this.handleTabChange} >
              <Tab label='Customers' component={RouterLink} to={process.env.PUBLIC_URL + '/customers'} />
              <Tab label='All Accounts' component={RouterLink} to={process.env.PUBLIC_URL + '/accounts'} />
              <Tab label='About' component={RouterLink} to={process.env.PUBLIC_URL + '/about'} />
            </Tabs>
            : null
        }
      </Paper>
    )
  }
}

/** PropTypes */
Header.propTypes = {
  /** The logged in firesbase user */
  user: PropTypes.object,
}

export default Header;