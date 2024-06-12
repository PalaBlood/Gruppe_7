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
        if (loading) return <div style={{ fontSize: '16px', color: '#999' }}>Loading...</div>;
        if (error) return <div style={{ fontSize: '16px', color: 'blue' }}>Error: {error}</div>;
    
        return (
            <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f4', color: '#333', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center', marginBottom: '20px' }}>Household Members</h1>
                <ul style={{ listStyleType: 'none', padding: '0' }}>
                    {users.map(user => (
                        <li key={user.id} style={{ backgroundColor: 'white', padding: '10px', margin: '5px 0', borderRadius: '4px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', transition: 'background-color 0.3s' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'lightblue'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}>
                            {user.nick_name} - {user.first_name} {user.last_name}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}    

export default UserList;
