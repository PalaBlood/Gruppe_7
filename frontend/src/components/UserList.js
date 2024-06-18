import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle  } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FridgeAPI from '../API/SmartFridgeAPI.js';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress.js';
import UserListEntry from './UserListEntry.js';
import { getAuth } from "firebase/auth";
import UserBO from '../API/UserBO.js';
import DeleteIcon from '@mui/icons-material/Delete';

class UserList extends Component {
    state = {
        users: [],
        loading: true,
        error: null,
        householdId: null,
        addUserDialogOpen: false,
        deleteUserDialogOpen: false,
        newUser: { id: 0,nick_name: '', first_name: '', last_name: '', google_user_id: '' }
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
            if (!userBO || userBO.length === 0 || !userBO[0].household_id) {
                throw new Error("Household not found for the current user.");
            }
            const user = userBO[0]; 
            this.loadHouseholdUsers(user.household_id);
            this.setState({ householdId: user.household_id });
        } catch (error) {
            console.error('Failed to fetch user or household:', error);
            this.setState({ error: error.message, loading: false });
        }
    };
    

    loadHouseholdUsers = async (householdId) => {
        try {
            const users = await FridgeAPI.getAPI().getUsersbyHouseholdID(householdId);
            this.setState({ users: users, loading: false });
        } catch (error) {
            this.setState({ error: error.message, loading: false });
        }
    };

    handleInputChange = (e) => {
        const fieldName = e.target.name;
        const value = e.target.value;
        this.setState(prevState => ({
            newUser: { ...prevState.newUser, [fieldName]: value }
        }));
    };

    openAddUserDialog = () => {
        this.setState({ addUserDialogOpen: true });
    };

    closeAddUserDialog = () => {
        this.setState({ addUserDialogOpen: false });
    };

    addUser = async () => {
        const { newUser, householdId } = this.state;
        const auth = getAuth() //Ab hier um die UserId auszulesen
        const currentUser = auth.currentUser;
        if (!newUser.nick_name || !newUser.first_name || !newUser.last_name) {
            this.setState({ error: 'Please fill out all user details.' });
            return;
        }
        newUser.household_id = householdId;
        newUser.google_user_id = currentUser.uid
        this.setState({ loading: true });
        try {
            await FridgeAPI.getAPI().addUser(newUser);
            this.loadHouseholdUsers(householdId);
            this.closeAddUserDialog();
        } catch (error) {
            this.setState({ error: error.message, loading: false });
        }
    };

    
    openDeleteUserDialog = (user) => {
        this.setState({ deleteUserDialogOpen: true, deleteUser: user });
    };

    closeDeleteUserDialog = () => {
        this.setState({ deleteUserDialogOpen: false, deleteUser: null });
    };

    deleteUser = async () => {
        const { deleteUser } = this.state;
        try {
            await FridgeAPI.getAPI().deleteUser(deleteUser.id);
            this.closeDeleteUserDialog();
            this.identifyHouseholdAndLoadUsers();
        } catch (error) {
            this.setState({ error: error.message });
        }
    };

    render() {
        const { users, loading, error, addUserDialogOpen, newUser, deleteUserDialogOpen, deleteUser } = this.state;
        if (loading) return <div style={{ fontSize: '16px', color: '#999' }}>Loading...</div>;
        if (error) return <div style={{ fontSize: '16px', color: 'blue' }}>Error: {error}</div>;

        return (
            <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f4',
            color: '#333', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center', marginBottom: '20px' }}>Household Members</h1>
                <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={this.openAddUserDialog}>
                    Add User
                </Button>
                <ul style={{ listStyleType: 'none', padding: '0' }}>
                    {users.map(user => (
                        <li key={user.id} style={{ backgroundColor: 'white', padding: '10px', margin: '5px 0', borderRadius: '4px',
                         boxShadow: '0 1px 3px rgba(0,0,0,0.1)', transition: 'background-color 0.3s' }} 
                         onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'lightblue'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}>
                            {user.nick_name} - {user.first_name} {user.last_name}
                            <Button startIcon={<DeleteIcon />} onClick={() => this.openDeleteUserDialog(user)}>
                            Delete
                        </Button>
                        </li>
                    ))}
                </ul>
                <Dialog open={addUserDialogOpen} onClose={this.closeAddUserDialog}>
                    <DialogTitle>Add New User</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Enter details for the new household member.
                        </DialogContentText>
                        <TextField autoFocus margin="dense" name="nick_name" label="Nickname" type="text" fullWidth variant="outlined" value={newUser.nick_name} onChange={this.handleInputChange} />
                        <TextField margin="dense" name="first_name" label="First Name" type="text" fullWidth variant="outlined" value={newUser.first_name} onChange={this.handleInputChange} />
                        <TextField margin="dense" name="last_name" label="Last Name" type="text" fullWidth variant="outlined" value={newUser.last_name} onChange={this.handleInputChange} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.closeAddUserDialog}>Cancel</Button>
                        <Button onClick={this.addUser}>Add</Button>
                    </DialogActions>
                </Dialog>

                <Dialog open={deleteUserDialogOpen} onClose={this.closeDeleteUserDialog}>
                    <DialogTitle>Delete User</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to delete {deleteUser?.first_name} {deleteUser?.last_name}?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.closeDeleteUserDialog}>Cancel</Button>
                        <Button onClick={this.deleteUser}>Delete</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}    

export default UserList;
