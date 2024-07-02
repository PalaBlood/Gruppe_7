import React, { Component } from 'react';
import { Button, Card, CardContent, CardActions, Typography, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FridgeAPI from '../API/SmartFridgeAPI';
import FridgeEntryForm from './dialogs/FridgeEntryForm';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import FridgeEntryBO from '../API/FridgeEntryBO';
import { getAuth } from 'firebase/auth';


// FridgeEntriesComponent is a class component managing all fridge entries of the current user.
class FridgeEntriesComponent extends Component {

    // Init the state
    constructor(props) {
        super(props);
        this.state = {
            fridgeEntries: [],
            showAddForm: false,
            loading: false,
            error: null,
            editEntry: null 
        };
    }
    // Fetches all fridge entries of the current user
    componentDidMount() {
        this.fetchFridgeEntries();
    }

    fetchFridgeEntries = async () => {
        const auth = getAuth();
        const user = auth.currentUser;
        const fridge_id = await FridgeAPI.getAPI().getFridgeIdByGoogleUserId(user.uid);
        this.setState({ loading: true });
        try {
            const entries = await FridgeAPI.getAPI().getFridgeEntriesbyFridgeId(fridge_id.fridge_id);
            const fridgeEntryBOs = FridgeEntryBO.fromJSON(entries);
            this.setState({ fridgeEntries: fridgeEntryBOs, loading: false });
        } catch (error) {
            console.error("Failed to fetch fridge entries:", error);
            this.setState({ error, loading: false });
        }
    };
    // Handles the click on the add button
    handleAddButtonClick = () => {
        this.setState({ showAddForm: true, editEntry: null });
    };
    // Handles the closing of the add/edit form
    handleFormClose = (newEntry) => {
        if (newEntry) {
            this.fetchFridgeEntries();
        }
        this.setState({ showAddForm: false });
    };
    // Handles the click on the edit button
    handleEditButtonClick = (entry) => {
        this.setState({ showAddForm: true, editEntry: entry });
    };
    // Handles the click on the delete button
    handleDeleteButtonClick = async (designation) => {
        try {
            await FridgeAPI.getAPI().deleteFridgeEntry(designation);
            this.fetchFridgeEntries(); 
        } catch (error) {
            console.error("Failed to delete fridge entry:", error);
            this.setState({ error: `Failed to delete entry: ${designation}` });
        }
    };
    // Renders the component
    render() {
        const { fridgeEntries, showAddForm, loading, error, editEntry } = this.state;

        if (loading) {
            return <LoadingProgress show={true} />;
        }

        if (error) {
            return <ContextErrorMessage error={error} contextErrorMsg="Failed to load fridge entries." />;
        }

        return (
            <Grid container spacing={2} style={{ padding: 20 }}>
                <Grid item xs={12} style={{ textAlign:'center'}}>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}
                        onClick={this.handleAddButtonClick}
                    >
                        Add a Grocery
                    </Button>
                </Grid>
                {fridgeEntries.map((entry) => (
                    <Grid item xs={12} sm={6} md={4} key={entry.getId()}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5">{entry.getDesignation()}</Typography>
                                <Typography color="textSecondary">
                                    Quantity: {entry.getQuantity()} {entry.getUnit()}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" startIcon={<EditIcon />} onClick={() => this.handleEditButtonClick(entry)}>Edit</Button>
                                <Button size="small" startIcon={<DeleteIcon />} onClick={() => this.handleDeleteButtonClick(entry.getDesignation())}>Delete</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
                {showAddForm && (
                    <FridgeEntryForm
                        show={showAddForm}
                        fridgeentry={editEntry}
                        onClose={this.handleFormClose}
                    />
                )}
            </Grid>
        );
    }
}

export default FridgeEntriesComponent;
