import React, { Component } from 'react';
import { List, ListItem, ListItemText, CircularProgress, Typography, Box, Card, CardContent, Avatar, Divider, TextField, Button } from '@mui/material';
import { getAuth } from 'firebase/auth';
import FridgeAPI from '../API/SmartFridgeAPI.js';
import HouseholdBO from '../API/HouseholdBO.js';

class Household extends Component {
    state = {
        users: [],
        householdName: '',
        newHouseholdName: '',
        householdId: null,
        fridgeId: null,
        loading: true,
        error: null,
    };

    componentDidMount() {
        this.loadHouseholdUsers();
    }

    loadHouseholdUsers = async () => {
        const auth = getAuth();
        const currentUser = auth.currentUser;
        if (!currentUser) {
            this.setState({ error: "No user logged in", loading: false });
            return;
        }

        try {
            const userBO = await FridgeAPI.getAPI().getUserbyGoogleUserId(currentUser.uid);
            if (userBO && userBO.length > 0 && userBO[0].household_id) {
                const users = await FridgeAPI.getAPI().getUsersbyHouseholdID(userBO[0].household_id);
                const householdArray = await FridgeAPI.getAPI().getHouseholdbyID(userBO[0].household_id);
                const household = householdArray[0]; // Access the first element of the array
                this.setState({ 
                    users: users, 
                    householdName: household.name, 
                    newHouseholdName: household.name, 
                    householdId: userBO[0].household_id, 
                    fridgeId: household.fridge_id, 
                    loading: false 
                });
            } else {
                this.setState({ error: "User has no associated household.", loading: false });
            }
        } catch (error) {
            this.setState({ error: error.message, loading: false });
        }
    };

    updateHouseholdName = async () => {
        const { newHouseholdName, householdId, fridgeId } = this.state;
        const auth = getAuth();
        const currentUser = auth.currentUser;
        if (!currentUser) {
            this.setState({ error: "No user logged in", loading: false });
            return;
        }

        try {
            const householdBO = new HouseholdBO(newHouseholdName, fridgeId);
            householdBO.setId(householdId); 
            await FridgeAPI.getAPI().updateHousehold(householdBO);
            this.setState({ householdName: newHouseholdName });
        } catch (error) {
            this.setState({ error: error.message, loading: false });
        }
    };

    handleInputChange = (event) => {
        this.setState({ newHouseholdName: event.target.value });
    };

    render() {
        const { users, householdName, newHouseholdName, loading, error } = this.state;

        if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}><CircularProgress /></Box>;
        if (error) return <Typography color="error">{error}</Typography>;

        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: 'lightblue', padding: 2 }}>
                <Card raised sx={{ width: '100%', maxWidth: 600, p: 2 }}>
                    <CardContent>
                        <Typography variant="h4" component="h2" gutterBottom align="center">
                            Household: {householdName}
                        </Typography>
                        <Box sx={{ mb: 2 }}>
                            <TextField
                                fullWidth
                                label="Edit Household Name"
                                variant="outlined"
                                value={newHouseholdName}
                                onChange={this.handleInputChange}
                            />
                            <Button 
                                variant="contained" 
                                color="primary" 
                                onClick={this.updateHouseholdName} 
                                sx={{ mt: 1, width: '100%' }}
                            >
                                Save
                            </Button>
                        </Box>
                        <Divider sx={{ marginBottom: 2 }} />
                        <Typography variant="h5" component="h3" gutterBottom align="center">
                            Household Members
                        </Typography>
                        <List>
                            {users.map(user => (
                                <ListItem key={user.id} sx={{ borderRadius: 2, mb: 1, bgcolor: 'background.paper', boxShadow: 1 }}>
                                    <Avatar sx={{ mr: 2 }}>
                                        {user.first_name.charAt(0)}
                                    </Avatar>
                                    <ListItemText 
                                        primary={`${user.first_name} ${user.last_name}`} 
                                        secondary={user.nick_name} 
                                        primaryTypographyProps={{ fontWeight: 'bold' }}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </CardContent>
                </Card>
            </Box>
        );
    }
}

export default Household;
