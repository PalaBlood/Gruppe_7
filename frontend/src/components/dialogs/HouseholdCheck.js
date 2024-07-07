import React, { Component } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, ListItemText, CircularProgress, TextField, ListItemIcon, Typography } from '@mui/material';
import { getAuth } from 'firebase/auth';
import FridgeAPI from '../../API/SmartFridgeAPI';
import HouseholdBO from '../../API/HouseholdBO';
import HomeIcon from '@mui/icons-material/Home';

//Komponente die nach Anmeldung überprüft, ob der Google_user bereits ind er db existiert, 
//falls nicht wird ein neues User Objekt angelegt und die Aufforderung angezeigt, einen Haushalt auszuwählen  @author: Tom Schönfeld
class CheckforexistingHousehold extends Component {

    //state initialisieren
    state = {
        households: [],
        selectedHouseholdId: null,
        newHouseholdName: '',
        dialogOpen: false,
        error: null,
        loading: true,
        householdConfirmed: false,
        newPassword: ''
    }
    //lifecycle methode
    componentDidMount() {
        this.checkForHousehold();
    }

    //auth holen und db nach user überprüfen, danach haushalt zuweisung prüfen, falls nicht alle haushalte fetchen und zur auwahl anzeigen
    checkForHousehold = async () => {
        const auth = getAuth();
        const currentUser = auth.currentUser;
        if (!currentUser) {
            this.setState({ error: "No user logged in", loading: false });
            return;
        }

        try {
            const userBO = await FridgeAPI.getAPI().getUserbyGoogleUserId(currentUser.uid);
            if (userBO && userBO.length > 0 && userBO[0].household_id) {
                if (!this.state.householdConfirmed) { //haushalt bereits bestätigt?
                    this.props.onHouseholdConfirmed(userBO[0].household_id);
                    this.setState({ loading: false, householdConfirmed: true, dialogOpen: false }); 
                }
            } else {
                await this.fetchHouseholds();
                this.setState({ dialogOpen: true, loading: false }); 
            }
        } catch (error) {
            this.setState({ error: error.message, loading: false }); 
        }
    }
    // methode zum fetchen der haushalte
    fetchHouseholds = async () => {
        try {
            const households = await FridgeAPI.getAPI().getHouseholds();
            this.setState({
                households: households,
                loading: false
            });
        } catch (error) {
            this.setState({ error: error.message, loading: false });
        }
    }
    //was soll passieren, wenn ein Haushalt aus der liste ausgewählt wird?
    handleSelectHousehold = (id) => {
        if (!this.state.householdConfirmed) { 
            this.setState({
                selectedHouseholdId: id,
                dialogOpen: false,
                householdConfirmed: true 
            });
            this.props.onHouseholdConfirmed(id);
        }
    }

    handleInputChange = (event) => {
        this.setState({ newHouseholdName: event.target.value });
    }

    handleInputChangePassword = (event) => {
        this.setState({ newPassword: event.target.value });
    }
    // Option statt auszuwählen einen neuen Haushalt zu erstellen
    addHousehold = async () => {
        const { newHouseholdName } = this.state;
        const { newPassword } = this.state;
        if (!newHouseholdName.trim()) {
            this.setState({ error: "Household name cannot be empty." });
            return;
        }
        this.setState({ loading: true });
        try {
            let householdBO = new HouseholdBO({ name: newHouseholdName, id: 0, fridge_id: null, password: newPassword});
            const addedHousehold = await FridgeAPI.getAPI().addHousehold(householdBO);
            const auth = getAuth();
            const currentUser = auth.currentUser;
            if (currentUser) {
                let userBOArray = await FridgeAPI.getAPI().getUserbyGoogleUserId(currentUser.uid);
                if (userBOArray && userBOArray.length > 0) {
                    let userBO = userBOArray[0];
                    userBO.household_id = addedHousehold.id;
                    await FridgeAPI.getAPI().updateUser(userBO);
                    if (!this.state.householdConfirmed) {
                        this.setState({ loading: false, dialogOpen: false, newHouseholdName: '', householdConfirmed: true, newPassword: ''});
                        this.props.onHouseholdConfirmed(addedHousehold.id);
                    }
                } else {
                    throw new Error("Failed to fetch user data for updating.");
                }
            } else {
                throw new Error("No authenticated user found.");
            }
        } catch (error) {
            this.setState({ error: error.message, loading: false });
        }
    }

    renderDialogs = () => {
        const { dialogOpen, households, newPassword, newHouseholdName, error } = this.state;

        return (
            <Dialog 
                open={dialogOpen} 
                onClose={(event, reason) => {
                    if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
                        this.setState({ dialogOpen: false });
                    }
                }}
                disableEscapeKeyDown
            >
                <DialogTitle>{households.length ? "Select or create a household" : "Create a household"}</DialogTitle>
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
                                onChange={this.handleInputChange}
                            />
                        </ListItem>
                        <ListItem>
                            <TextField
                                label="Password"
                                type="password"
                                fullWidth
                                variant="outlined"
                                value={newPassword}
                                onChange={this.handleInputChangePassword}
                            />
                        </ListItem>
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.addHousehold} color="primary">Add new household</Button>
                </DialogActions>
            </Dialog>
        );
    }

    render() {
        const { loading, error } = this.state;
        if (loading) return <CircularProgress />;
        if (error && !this.state.dialogOpen) return <p>Error: {error}</p>; // Display global error only if dialog is not open
        return this.renderDialogs();
    }
}

export default CheckforexistingHousehold;
