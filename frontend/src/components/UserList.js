//Liste von Usern

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListItem } from '@mui/material';
import { Button, List } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { FridgeAPI } from '../API/SmartFridgeAPI.js'
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress.js';
import UserListEntry from './UserListEntry.js';


//rendert eine Liste von User Objekten

class UserList extends Component {

    constructor(props) {
        super(props);
    

    this.state = {
        users: [],
        loadingInProgress: false,
        loadingAccountError: null,
        addingAccountError: null,
    };
}
//alle user vom Haushalt fetchen
getUsersbyHousehold = () => {
    FridgeAPI.getAPI().getHouseholdbyID(this.props.household.getID()).then(userBOs =>
        this.setState({
            users: userBOs,
            loadingInProgress: false,
            loadingAccountError: null
        })).catch(e =>
            this.setState({
                users:[],
                loadingInProgress:false,
                loadingAccountError: e
            })
        );

    this.setState({
        loadingInProgress: true,
        loadingAccountError: null
    });
    
}

}