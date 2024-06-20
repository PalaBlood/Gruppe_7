//anzeige Eines haushalts

import React, { Component } from 'react';
import { List, ListItem, ListItemText, CircularProgress, Typography, Box, Card, CardContent, Avatar, Divider } from '@mui/material';
import { getAuth } from 'firebase/auth';
import FridgeAPI from '../API/SmartFridgeAPI.js';

class Household extends Component {
    state = {
        users: [],
        loading: true,
        error: null,
    };

    componentDidMount() {
        this.loadHouseholdUsers();
    }


    //auth holen und user nach googleId auslesen, danach per householdid alle user des haushalts aulesen
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
                this.setState({ users: users, loading: false });
            } else {
                this.setState({ error: "User has no associated household.", loading: false });
            }
        } catch (error) {
            this.setState({ error: error.message, loading: false });
        }
    };

    render() {
        const { users, loading, error } = this.state;

        if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}><CircularProgress /></Box>;
        if (error) return <Typography color="error">{error}</Typography>;

        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: 'lightblue', padding: 2 }}>
                <Card raised sx={{ width: '100%', maxWidth: 600, p: 2 }}>
                    <CardContent>
                        <Typography variant="h4" component="h2" gutterBottom align="center">
                            Household Members
                        </Typography>
                        <Divider sx={{ marginBottom: 2 }} />
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

