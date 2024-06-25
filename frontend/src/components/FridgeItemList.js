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


class FridgeEntriesComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fridgeEntries: [],
            showAddForm: false,
            loading: false,
            error: null,
            editEntry: null // To store the entry being edited
        };
    }

    componentDidMount() {
        this.fetchFridgeEntries();
    }

    fetchFridgeEntries = async () => {
        const auth = getAuth()
        const user = auth.currentUser
        const fridge_id = await FridgeAPI.getAPI().getFridgeIdByGoogleUserId(user.uid)
        console.log(fridge_id)
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

    handleAddButtonClick = () => {
        this.setState({ showAddForm: true, editEntry: null });
    };

    handleFormClose = (newEntry) => {
        if (newEntry) {
            this.fetchFridgeEntries();
        }
        this.setState({ showAddForm: false });
    };

    handleEditButtonClick = (entry) => {
        this.setState({ showAddForm: true, editEntry: entry });
    };

    handleDeleteButtonClick = async (designation) => {
        try {
            await FridgeAPI.getAPI().deleteFridgeEntry(designation);
            this.fetchFridgeEntries();  // Refresh the list after deletion
        } catch (error) {
            console.error("Failed to delete fridge entry:", error);
            this.setState({ error: `Failed to delete entry: ${designation}` });
        }
    };

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
                <Grid item xs={12}>
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
                        entry={editEntry}
                        onClose={this.handleFormClose}
                    />
                )}
            </Grid>
        );
    }
}

export default FridgeEntriesComponent;
