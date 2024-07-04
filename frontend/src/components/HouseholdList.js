import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, CircularProgress, Typography, Box, Card, CardContent, Avatar, Divider, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, ListItemIcon } from '@mui/material';
import { getAuth } from 'firebase/auth';
import FridgeAPI from '../API/SmartFridgeAPI.js';
import HouseholdBO from '../API/HouseholdBO.js';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';

const Household = ({ navigate }) => {
    const [users, setUsers] = useState([]);
    const [householdName, setHouseholdName] = useState('');
    const [newHouseholdName, setNewHouseholdName] = useState('');
    const [householdId, setHouseholdId] = useState(null);
    const [fridgeId, setFridgeId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [households, setHouseholds] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);

    useEffect(() => {
        loadHouseholdUsers();
    }, []);

    const loadHouseholdUsers = async () => {
        const auth = getAuth();
        const currentUser = auth.currentUser;
        if (!currentUser) {
            setError("No user logged in");
            setLoading(false);
            return;
        }

        try {
            const userBO = await FridgeAPI.getAPI().getUserbyGoogleUserId(currentUser.uid);
            if (userBO && userBO.length > 0 && userBO[0].household_id) {
                const users = await FridgeAPI.getAPI().getUsersbyHouseholdID(userBO[0].household_id);
                const householdArray = await FridgeAPI.getAPI().getHouseholdbyID(userBO[0].household_id);
                const household = householdArray[0]; // Access the first element of the array
                setUsers(users);
                setHouseholdName(household.name);
                setNewHouseholdName(household.name);
                setHouseholdId(userBO[0].household_id);
                setFridgeId(household.fridge_id);
                setLoading(false);
            } else {
                setError("User has no associated household.");
                setLoading(false);
            }
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    const updateHouseholdName = async () => {
        const auth = getAuth();
        const currentUser = auth.currentUser;
        if (!currentUser) {
            setError("No user logged in");
            setLoading(false);
            return;
        }

        try {
            const householdBO = new HouseholdBO(newHouseholdName, fridgeId);
            householdBO.setId(householdId);
            await FridgeAPI.getAPI().updateHousehold(householdBO);
            setHouseholdName(newHouseholdName);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    const handleInputChange = (event) => {
        setNewHouseholdName(event.target.value);
    };

    const fetchHouseholds = async () => {
        try {
            const households = await FridgeAPI.getAPI().getHouseholds();
            setHouseholds(households);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleSelectHousehold = async (id) => {
        const auth = getAuth();
        const currentUser = auth.currentUser;
        if (!currentUser) {
            setError("No user logged in");
            return;
        }

        try {
            let userBOArray = await FridgeAPI.getAPI().getUserbyGoogleUserId(currentUser.uid);
            if (userBOArray && userBOArray.length > 0) {
                let userBO = userBOArray[0];
                userBO.household_id = id;

                await FridgeAPI.getAPI().updateUser(userBO);
                setHouseholdId(id);
                setDialogOpen(false);
                loadHouseholdUsers();
            } else {
                throw new Error("User profile not found.");
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const addHousehold = async () => {
        const auth = getAuth();
        const currentUser = auth.currentUser;
        if (!currentUser) {
            setError("No user logged in.");
            return;
        }

        if (!newHouseholdName.trim()) {
            setError("Household name cannot be empty.");
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

                setHouseholdId(addedHousehold.id);
                setHouseholdName(newHouseholdName);
                setNewHouseholdName('');
                setDialogOpen(false);
                loadHouseholdUsers();
            } else {
                throw new Error("Failed to fetch user data for updating.");
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const deleteCurrentHousehold = async () => {
        const auth = getAuth();
        const currentUser = auth.currentUser;
        if (!currentUser) {
            setError("No user logged in");
            return;
        }
        try {
            let household_id = await FridgeAPI.getAPI().getHouseholdIdByGoogleUserId(currentUser.uid);
            await FridgeAPI.getAPI().deleteHousehold(household_id.household_id);
            navigate('/home');
            auth.signOut();
        }
        catch (error) {
            setError(error.message);
        }
    };

    const renderDialogs = () => {
        return (
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                <DialogTitle>{households.length ? "Select or create a household" : "Create a household"}</DialogTitle>
                <DialogContent>
                    {error && <Typography color="error" variant="body2" gutterBottom>{error}</Typography>}
                    <List>
                        {households.map(h => (
                            <ListItem
                                button
                                key={h.id}
                                onClick={() => handleSelectHousehold(h.id)}
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
                                label="New household name"
                                type="text"
                                fullWidth
                                variant="outlined"
                                value={newHouseholdName}
                                onChange={handleInputChange}
                            />
                        </ListItem>
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={addHousehold} color="primary">Add new household</Button>
                </DialogActions>
            </Dialog>
        );
    }

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
                            label="Edit household name"
                            variant="outlined"
                            value={newHouseholdName}
                            onChange={handleInputChange}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={updateHouseholdName}
                            sx={{ mt: 1, width: '100%' }}
                        >
                            Save
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                setDialogOpen(true);
                                fetchHouseholds();
                            }}
                            sx={{ mt: 1, width: '100%' }}
                        >
                            Switch households or create a new household
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={deleteCurrentHousehold}
                            sx={{ mt: 1, width: '100%' }}
                        >
                            Delete current household
                        </Button>
                    </Box>
                    <Divider sx={{ marginBottom: 2 }} />
                    <Typography variant="h5" component="h3" gutterBottom align="center">
                        Household members
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
            {dialogOpen && renderDialogs()}
        </Box>
    );
}

const HouseholdWrapper = () => {
    const navigate = useNavigate();
    return <Household navigate={navigate} />;
}

export default HouseholdWrapper;

