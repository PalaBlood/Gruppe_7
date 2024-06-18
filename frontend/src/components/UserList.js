import React, { Component } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import FridgeAPI from '../API/SmartFridgeAPI.js';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress.js';
import { getAuth } from "firebase/auth";

class UserProfile extends Component {
    state = {
        user: null,
        loading: true,
        error: null,
        editDialogOpen: false,
    };

    componentDidMount() {
        this.loadCurrentUser();
    }

    loadCurrentUser = async () => {
        this.setState({ loading: true });
        const auth = getAuth();
        const currentUser = auth.currentUser;
        if (!currentUser) {
            this.setState({ error: "No user logged in", loading: false });
            return;
        }
    
        try {
            const userBO = await FridgeAPI.getAPI().getUserbyGoogleUserId(currentUser.uid);
            if (!userBO || userBO.length === 0) {
                throw new Error("User not found.");
            }
            this.setState({ user: userBO[0], loading: false });
        } catch (error) {
            console.error('Failed to fetch user:', error);
            this.setState({ error: error.message, loading: false });
        }
    };

    handleInputChange = (e) => {
        const fieldName = e.target.name;
        const value = e.target.value;
        this.setState(prevState => ({
            user: { ...prevState.user, [fieldName]: value }
        }));
    };

    openEditDialog = () => {
        this.setState({ editDialogOpen: true });
    };

    closeEditDialog = () => {
        this.setState({ editDialogOpen: false });
    };


    updateUser = async () => {
        const { user } = this.state;
        if (!user.nick_name || !user.first_name || !user.last_name) {
            this.setState({ error: 'Please fill out all fields.' });

            return;
        }
        this.setState({ loading: true });
        try {
            await FridgeAPI.getAPI().updateUser(user);
            this.closeEditDialog();
            this.setState({ loading: false });
        } catch (error) {
            this.setState({ error: error.message, loading: false });
        }
    };

    render() {
        const { user, loading, error, editDialogOpen } = this.state;
        if (loading) return <LoadingProgress />;
        if (error) return <ContextErrorMessage error={error} />;
        if (!user) return null;  

        return (
            <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f4',
            color: '#333', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center', marginBottom: '20px' }}>Your Profile</h1>
                <div style={{ marginBottom: '10px' }}>
                    Nickname: {user.nick_name} <br/>
                    First Name: {user.first_name} <br/>
                    Last Name: {user.last_name}
                </div>
                <Button variant="contained" color="primary" startIcon={<EditIcon />} onClick={this.openEditDialog}>
                    Edit Profile
                </Button>

                <Dialog open={editDialogOpen} onClose={this.closeEditDialog}>
                    <DialogTitle>Edit Your Profile</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Update your profile details.
                        </DialogContentText>
                        <TextField autoFocus margin="dense" name="nick_name" label="Nickname" type="text" fullWidth variant="outlined" value={user.nick_name} onChange={this.handleInputChange} />
                        <TextField margin="dense" name="first_name" label="First Name" type="text" fullWidth variant="outlined" value={user.first_name} onChange={this.handleInputChange} />
                        <TextField margin="dense" name="last_name" label="Last Name" type="text" fullWidth variant="outlined" value={user.last_name} onChange={this.handleInputChange} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.closeEditDialog}>Cancel</Button>
                        <Button onClick={this.updateUser}>Update</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}    

export default UserProfile;
