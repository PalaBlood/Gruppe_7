//Liste von Usern

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListItem, Button, List } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import  FridgeAPI  from '../API/SmartFridgeAPI.js';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress.js';
import UserListEntry from './UserListEntry.js';
import { getAuth } from "firebase/auth";
import UserBO from '../API/UserBO.js';
import HouseholdBO from '../API/HouseholdBO.js';

class UserList extends Component {
    state = {
        users: [],
        loading: true,
        error: null,
        householdId: null
    };

    componentDidMount() {
        this.identifyHouseholdAndLoadUsers();
    }

    identifyHouseholdAndLoadUsers = async () => {
        this.setState({ loading: true });
        const auth = getAuth();
        const currentUser = auth.currentUser;
        if (!currentUser) {
            this.setState({ error: "No user logged in", loading: false });
            return;
        }

        try {
            const userBO = await FridgeAPI.getAPI().getUserbyGoogleUserId(currentUser.uid);
            if (userBO && userBO.household_id) {
                throw new Error("Household not found for the current user.");
            }
            let user = userBO[0];
            let household_id = user.household_id;
            this.loadHouseholdUsers(household_id);
        } catch (error) {
            this.setState({ error: error.message, loading: false });
        }
    };

    loadHouseholdUsers = async (householdId) => {
        try {
            const users = await FridgeAPI.getAPI().getUsersbyHouseholdID(householdId);
            console.log(users)
            this.setState({ users: users, loading: false });
        } catch (error) {
            this.setState({ error: error.message, loading: false });
        }
    };

    render() {
        const { users, loading, error } = this.state;
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error: {error}</div>;

        return (
            <div>
                <h1>Household Members</h1>
                <ul>
                    {users.map(user => (
                        <li key={user.id}>{user.nick_name} - {user.first_name} {user.last_name}</li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default UserList;
