import React, { useState, useEffect } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Card, CardContent, Typography, Box, CardActions, IconButton, CircularProgress } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CloseIcon from '@mui/icons-material/Close';
import FridgeAPI from '../API/SmartFridgeAPI.js';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import { getAuth } from "firebase/auth";

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editDialogOpen, setEditDialogOpen] = useState(false);

    useEffect(() => {
        loadCurrentUser();
    }, []);

    const loadCurrentUser = async () => {
        setLoading(true);
        const auth = getAuth();
        const currentUser = auth.currentUser;
        if (!currentUser) {
            setError("No user logged in");
            setLoading(false);
            return;
        }

        try {
            const userBO = await FridgeAPI.getAPI().getUserbyGoogleUserId(currentUser.uid);
            if (!userBO || userBO.length === 0) {
                throw new Error("User not found.");
            }
            setUser(userBO[0]);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch user:', error);
            setError(error.message);
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    };

    const openEditDialog = () => {
        setEditDialogOpen(true);
    };

    const closeEditDialog = () => {
        setEditDialogOpen(false);
    };

    const updateUser = async () => {
        if (!user.nick_name || !user.first_name || !user.last_name) {
            setError('Please fill out all fields.');
            return;
        }
        setLoading(true);
        try {
            await FridgeAPI.getAPI().updateUser(user);
            closeEditDialog();
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    if (loading) return <CircularProgress />;
    if (error) return <ContextErrorMessage error={error} />;
    if (!user) return null;

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: 8, mt: 10, p: 2 }}>
            <Card raised sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper', p: 2 }}>
                <CardContent>
                    <Typography variant="h5" component="div" sx={{ fontWeight: 'medium', mb: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1, fontSize: '2rem' }}>
                        <AccountCircleIcon color="primary" sx={{ fontSize: '2.5rem'}} /> Your profile
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '1.2rem'}}>
                        Nickname: {user.nick_name}<br />
                        First name: {user.first_name}<br />
                        Last name: {user.last_name}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button startIcon={<EditIcon />} onClick={openEditDialog} variant="contained" color="primary" sx={{ display: 'flex', justifyContent:'center', width: '100%'}}>
                        Edit profile
                    </Button>
                </CardActions>
            </Card>

            <Dialog open={editDialogOpen} onClose={closeEditDialog}>
                <DialogTitle>
                    Edit your profile
                    <IconButton
                        aria-label="close"
                        onClick={closeEditDialog}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>Update your profile details.</DialogContentText>
                    <TextField autoFocus margin="dense" name="nick_name" label="Nickname" type="text" fullWidth variant="outlined" value={user.nick_name} onChange={handleInputChange} />
                    <TextField margin="dense" name="first_name" label="First Name" type="text" fullWidth variant="outlined" value={user.first_name} onChange={handleInputChange} />
                    <TextField margin="dense" name="last_name" label="Last Name" type="text" fullWidth variant="outlined" value={user.last_name} onChange={handleInputChange} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeEditDialog}>Cancel</Button>
                    <Button onClick={updateUser} color="primary" variant="contained">Update</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default UserProfile;
