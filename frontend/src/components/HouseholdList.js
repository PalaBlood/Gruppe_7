import React, { useState, useEffect } from 'react';
import { ListItemIcon, List, ListItem, ListItemText, CircularProgress, Typography, Box, Card, CardContent, Avatar, Divider, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { getAuth } from 'firebase/auth';
import FridgeAPI from '../API/SmartFridgeAPI.js';
import HouseholdBO from '../API/HouseholdBO.js';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';

//Komponente die die Haushaltsverwaltung darstellt, hier können Haushalte verwaltet werden, Mitglieder hinzugefügt und gelöscht werden
const Household = ({ navigate }) => {
    const [users, setUsers] = useState([]);
    const [householdName, setHouseholdName] = useState('');
    const [newHouseholdName, setNewHouseholdName] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');
    const [deletePassword, setDeletePassword] = useState(''); // State for delete password
    const [householdId, setHouseholdId] = useState(null);
    const [selectedHouseholdId, setSelectedHouseholdId] = useState(null);
    const [fridgeId, setFridgeId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [households, setHouseholds] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false); // State for delete dialog

   
    useEffect(() => {
        loadHouseholdUsers();
    }, []);


    //methode zum laden der Haushaltsmitglieder
    const loadHouseholdUsers = async () => {
        const auth = getAuth();
        const currentUser = auth.currentUser;
        if (!currentUser) {
            setError("No user logged in");
            setLoading(false);
            return;
        }


        //fetchen der user und haushaltsdaten
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


    //methode zum aktualisieren des Haushaltsnamens
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


    //Handler für die Eingabe des Haushaltsnamens
    const handleInputChangeHouseholdName = (event) => {
        setNewHouseholdName(event.target.value);
    };


    //Handler für die Eingabe des Passworts
    const handleInputChangePassword = (event) => {
        setNewPassword(event.target.value);
    };


    //methode zum fetchen der Haushalte
    const fetchHouseholds = async () => {
        try {
            const households = await FridgeAPI.getAPI().getHouseholds();
            setHouseholds(households);
        } catch (error) {
            setError(error.message);
        }
    };


    //methode zum auswählen eines Haushalts
    const handleSelectHousehold = (id) => {
        setSelectedHouseholdId(id);
        setPasswordDialogOpen(true); // Passwortdialog öffnen
    };


    //methode zum bestätigen des Passworts
    const confirmPassword = async () => {
        const auth = getAuth();
        const currentUser = auth.currentUser;
        if (!currentUser) {
            setError("No user logged in");
            return;
        }
        try {
            const householdArray = await FridgeAPI.getAPI().getHouseholdbyID(selectedHouseholdId);
            const household = householdArray[0]; 
            if (household.password === enteredPassword) {
                let userBOArray = await FridgeAPI.getAPI().getUserbyGoogleUserId(currentUser.uid);
                if (userBOArray && userBOArray.length > 0) {
                    let userBO = userBOArray[0];
                    userBO.household_id = selectedHouseholdId;
                    await FridgeAPI.getAPI().updateUser(userBO);
                    setHouseholdId(selectedHouseholdId);
                    setPasswordDialogOpen(false);
                    setEnteredPassword(''); 
                    setDialogOpen(false);
                    loadHouseholdUsers();
                } else {
                    throw new Error("User profile not found.");
                }
            } else {
                alert("Incorrect password.");
            }
        } catch (error) {
            setError(error.message);
        }
    };


    //Haushalt löschen bestätigen
    const confirmDeleteHousehold = async () => {
        const auth = getAuth();
        const currentUser = auth.currentUser;
        if (!currentUser) {
            setError("No user logged in");
            return;
        }
        try {
            const householdArray = await FridgeAPI.getAPI().getHouseholdbyID(householdId);
            const household = householdArray[0]; 
            if (household.password === deletePassword) {
                await FridgeAPI.getAPI().deleteHousehold(householdId);
                setDeletePassword(''); 
                navigate('/home');
                auth.signOut();
            } else {
                alert("Incorrect delete password.");
            }
        } catch (error) {
            setError(error.message);
        }
    };


    //Hinzufügen eines neuen Haushalts
    const addHousehold = async () => {
        const auth = getAuth();
        const currentUser = auth.currentUser;
        if (!currentUser) {
            setError("No user logged in.");
            return;
        }

        if (!newHouseholdName.trim()) {
            alert("Household name cannot be empty.");
            return;
        }

        if (!newPassword.trim()) {
            alert("Password cannot be empty.");
            return;
        }

        try {
            let householdBO = new HouseholdBO({ name: newHouseholdName, id: 0, fridge_id: null , password: newPassword });
            const addedHousehold = await FridgeAPI.getAPI().addHousehold(householdBO);
            let userBOArray = await FridgeAPI.getAPI().getUserbyGoogleUserId(currentUser.uid);
            if (userBOArray && userBOArray.length > 0) {
                let userBO = userBOArray[0];
                userBO.household_id = addedHousehold.id;
                await FridgeAPI.getAPI().updateUser(userBO);

                setHouseholdId(addedHousehold.id);
                setHouseholdName(newHouseholdName);
                setNewPassword('');
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
            const household_id = await FridgeAPI.getAPI().getHouseholdIdByGoogleUserId(currentUser.uid);
            const householdArray = await FridgeAPI.getAPI().getHouseholdbyID(household_id.household_id);
            const household = householdArray[0]; 
            if (household.password) {
                setDeleteDialogOpen(true);
            } else {
                await FridgeAPI.getAPI().deleteHousehold(household_id.household_id);
                navigate('/home');
                auth.signOut();
            }
        } catch (error) {
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
                                    <HomeIcon color="primary" />
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
                                onChange={handleInputChangeHouseholdName}
                            />
                        </ListItem>
                        <ListItem>
                            <TextField
                                label="Password"
                                type="password"
                                fullWidth
                                variant="outlined"
                                value={newPassword}
                                onChange={handleInputChangePassword}
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


    const renderPasswordDialog = () => {
        return (
            <Dialog open={passwordDialogOpen} onClose={() => { setPasswordDialogOpen(false); setEnteredPassword(''); }}>
                <DialogTitle>Enter Household Password</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        variant="outlined"
                        value={enteredPassword}
                        onChange={(e) => setEnteredPassword(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={confirmPassword} color="primary">Confirm</Button>
                    <Button onClick={() => setPasswordDialogOpen(false)} color="secondary">Cancel</Button>
                </DialogActions>
            </Dialog>
        );
    };


    const renderDeleteDialog = () => {
        return (
            <Dialog open={deleteDialogOpen} onClose={() => { setDeleteDialogOpen(false); setDeletePassword(''); }}>
                <DialogTitle>Enter Household Delete Password</DialogTitle>
                <DialogContent style={{color:'red'}}>
                This will delete all recipes, users and ingredients of the current Household, are you sure you want to delete this household?
                    <TextField
                        label="Delete Password"
                        type="password"
                        fullWidth
                        variant="outlined"
                        value={deletePassword}
                        onChange={(e) => setDeletePassword(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={confirmDeleteHousehold} color="primary">Confirm Delete</Button>
                    <Button onClick={() => setDeleteDialogOpen(false)} color="secondary">Cancel</Button>
                </DialogActions>
            </Dialog>
        );
    };

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}><CircularProgress /></Box>;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: 8, padding: 2, mt: 5 }}>
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
                            onChange={handleInputChangeHouseholdName}
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
            {passwordDialogOpen && renderPasswordDialog()}
            {deleteDialogOpen && renderDeleteDialog()}
        </Box>
    );
}

const HouseholdWrapper = () => {
    const navigate = useNavigate();
    return <Household navigate={navigate} />;
}

export default HouseholdWrapper;
