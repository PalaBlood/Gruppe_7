import React, { Component } from 'react';
import { List, ListItem, ListItemText, CircularProgress, Typography, Box, Card, CardContent, Avatar, Divider, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, ListItemIcon } from '@mui/material';
import { getAuth } from 'firebase/auth';
import FridgeAPI from '../API/SmartFridgeAPI.js';
import HouseholdBO from '../API/HouseholdBO.js';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';

//Momentanen Haushalt laden, der User bekommt dabei die Option, den Haushalt zu wechseln oder den Namen des aktuellen Haushalts anzupassen

class Household extends Component {

    //State initialisieren
    state = {
        users: [],
        householdName: '',
        newHouseholdName: '',
        householdId: null,
        fridgeId: null,
        loading: true,
        error: null,
        households: [],
        selectedHouseholdId: null,
        dialogOpen: false,
    };


    //lifecycle Method
    componentDidMount() {
        this.loadHouseholdUsers();
    }


    //User des assoziierten Haushaltes laden
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
    
    //name des Haushalts updaten
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
    //alle Haushalte fetchen
    fetchHouseholds = async () => {
        try {
            const households = await FridgeAPI.getAPI().getHouseholds();
            this.setState({ households: households });
        } catch (error) {
            this.setState({ error: error.message });
        }
    };
    //Selektion eines Haushalts verarbeiten über den API Call updateUser household_id setzen
    handleSelectHousehold = async (id) => {
        const auth = getAuth();
        const currentUser = auth.currentUser;
        if (!currentUser) {
            this.setState({ error: "No user logged in" });
            return;
        }

        try {
            let userBOArray = await FridgeAPI.getAPI().getUserbyGoogleUserId(currentUser.uid);
            if (userBOArray && userBOArray.length > 0) {
                let userBO = userBOArray[0];
                userBO.household_id = id;

                await FridgeAPI.getAPI().updateUser(userBO);
                this.setState({ 
                    householdId: id, 
                    dialogOpen: false 
                });
                this.loadHouseholdUsers();
            } else {
                throw new Error("User profile not found.");
            }
        } catch (error) {
            this.setState({ error: error.message });
        }
    };
    //neuen Haushalt erstellen, dabei hat der User die Option, den neuen Namen zu setzen
    addHousehold = async () => {
        const { newHouseholdName } = this.state;
        const auth = getAuth();
        const currentUser = auth.currentUser;
        if (!currentUser) {
            this.setState({ error: "No user logged in" });
            return;
        }

        if (!newHouseholdName.trim()) {
            this.setState({ error: "Household name cannot be empty." });
            return;
        }

        try {
            let householdBO = new HouseholdBO({ name: newHouseholdName, id: 0, fridge_id: null });
            const addedHousehold = await FridgeAPI.getAPI().addHousehold(householdBO);

            let userBOArray = await FridgeAPI.getAPI().getUserbyGoogleUserId(currentUser.uid);
            if (userBOArray && userBOArray.length > 0) {
                let userBO = userBOArray[0];
                userBO.household_id = addedHousehold.id;
                await FridgeAPI.getAPI().updateUser(userBO);

                this.setState({ 
                    householdId: addedHousehold.id, 
                    householdName: newHouseholdName, 
                    newHouseholdName: '',
                    dialogOpen: false 
                });
                this.loadHouseholdUsers();
            } else {
                throw new Error("Failed to fetch user data for updating.");
            }
        } catch (error) {
            this.setState({ error: error.message });
        }
    };

    deletecurrentHousehold = async () => {
        const { navigate } = this.props;
        const auth = getAuth();
        const currentUser = auth.currentUser;
        if (!currentUser) {
            this.setState({ error: "No user logged in" });
            return;
        }
        try {
            let household_id = await FridgeAPI.getAPI().getHouseholdIdByGoogleUserId(currentUser.uid);
            await FridgeAPI.getAPI().deleteHousehold(household_id.household_id);
            navigate('/home');
            auth.signOut();
        }
        catch (error) {
            this.setState({ error: error.message });
        }
    }

    renderDialogs = () => {
        const { dialogOpen, households, newHouseholdName, error } = this.state;

        return (
            <Dialog 
                open={dialogOpen} 
                onClose={() => this.setState({ dialogOpen: false })}
            >
                <DialogTitle>{households.length ? "Select or Create a Household" : "Create a Household"}</DialogTitle>
                <DialogContent>
                    {error && <Typography color="error" variant="body2" gutterBottom>{error}</Typography>}
                    <List>
                        {households.map(h => (
                            <ListItem 
                                button 
                                key={h.id} 
                                onClick={() => this.handleSelectHousehold(h.id)}
                                sx={{ 
                                    margin: '10px 0', 
                                    border: '1px solid #ccc', 
                                    borderRadius: '8px', 
                                    padding: '10px 20px', 
                                    '&:hover': { 
                                        backgroundColor: '#f0f0f0' 
                                    } 
                                }}
                            >
                                <ListItemIcon>
                                    <HomeIcon color="red" />
                                </ListItemIcon>
                                <ListItemText primary={h.name} />
                            </ListItem>
                        ))}
                        <ListItem>
                            <TextField
                                label="New Household Name"
                                type="text"
                                fullWidth
                                variant="outlined"
                                value={newHouseholdName}
                                onChange={this.handleInputChange}
                            />
                        </ListItem>
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.addHousehold} color="primary">Add New Household</Button>
                </DialogActions>
            </Dialog>
        );
    }

    render() {
        const { users, householdName, newHouseholdName, loading, error, dialogOpen } = this.state;

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
                            <Button 
                                variant="contained" 
                                color="primary" 
                                onClick={() => {
                                    this.setState({ dialogOpen: true });
                                    this.fetchHouseholds();
                                }} 
                                sx={{ mt: 1, width: '100%' }}
                            >
                                Switch Households or Create a new Household
                            </Button>
                            <Button 
                                variant="contained" 
                                color="primary" 
                                onClick={this.deletecurrentHousehold} 
                                sx={{ mt: 1, width: '100%' }}
                            >
                                Delete Current Household
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
                {dialogOpen && this.renderDialogs()}
            </Box>
        );
    }
}

const HouseholdWrapper = () => {
    const navigate = useNavigate();
    return <Household navigate={navigate} />;
}

export default HouseholdWrapper;
