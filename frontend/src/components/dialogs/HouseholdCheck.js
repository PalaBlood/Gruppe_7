import React, { Component } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, ListItemText, CircularProgress, TextField } from '@mui/material';
import { getAuth } from 'firebase/auth';
import FridgeAPI from '../../API/SmartFridgeAPI';
import HouseholdBO from '../../API/HouseholdBO';

class CheckforexistingHousehold extends Component {
    state = {
        households: [],
        selectedHouseholdId: null,
        newHouseholdName: '',
        dialogOpen: false,
        error: null,
        loading: true,
        householdConfirmed: false 
    }

    componentDidMount() {
        this.checkForHousehold();
    }

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
                    this.setState({ loading: false, householdConfirmed: true }); 
                }
            } else {
                await this.fetchHouseholds();
                this.setState({ dialogOpen: true, loading: false }); 
            }
        } catch (error) {
            this.setState({ error: error.message, loading: false }); 
        }
    }

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

    addHousehold = async () => {
        const { newHouseholdName } = this.state;
        if (!newHouseholdName.trim()) {
            this.setState({ error: "Household name cannot be empty." });
            return;
        }
        this.setState({ loading: true });
        try {
            let householdBO = new HouseholdBO({ name: newHouseholdName, id: 0, fridge_id: null });
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
                        this.setState({ loading: false, dialogOpen: false, newHouseholdName: '', householdConfirmed: true });
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
        const { dialogOpen, households, newHouseholdName } = this.state;

        return (
            <Dialog open={dialogOpen} onClose={() => this.setState({ dialogOpen: false })}>
                <DialogTitle>{households.length ? "Select or Create a Household" : "Create a Household"}</DialogTitle>
                <DialogContent>
                    <List>
                        {households.map(h => (
                            <ListItem key={h.id} onClick={() => this.handleSelectHousehold(h.id)}>
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
        const { loading, error } = this.state;
        if (loading) return <CircularProgress />;
        if (error) return <p>Error: {error}</p>;
        return this.renderDialogs();
    }
}

export default CheckforexistingHousehold;
