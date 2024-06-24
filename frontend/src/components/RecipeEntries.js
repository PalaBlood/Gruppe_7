import React, { Component } from 'react';
import { Button, Card, CardContent, CardActions, Typography, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FridgeAPI from '../API/SmartFridgeAPI';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import RecipeEntryBO from '../API/RecipeEntryBO';
import RecipeEntryForm from './dialogs/RecipeEntryForm';

class RecipeEntries extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipeEntries: [],
            showAddForm: false,
            loading: false,
            error: null,
            editEntry: null
        };
    }

    componentDidMount() {
        this.fetchRecipeEntries();
    }

    fetchRecipeEntries = async () => {
        this.setState({ loading: true });
        try {
            const entries = await FridgeAPI.getAPI().getRecipeEntries(this.props.recipeId);
            const recipeEntryBOs = RecipeEntryBO.fromJSON(entries);
            this.setState({ recipeEntries: recipeEntryBOs, loading: false });
        } catch (error) {
            console.error("Failed to fetch recipe entries:", error);
            this.setState({ error, loading: false });
        }
    };

    handleAddButtonClick = () => {
        this.setState({ showAddForm: true, editEntry: null });
    };

    handleFormClose = (newEntry) => {
        if (newEntry) {
            this.fetchRecipeEntries();
        }
        this.setState({ showAddForm: false });
    };

    handleEditButtonClick = (entry) => {
        this.setState({ showAddForm: true, editEntry: entry });
    };

    handleDeleteButtonClick = async (designation) => {
        try {
            await FridgeAPI.getAPI().deleteRecipeEntry(designation, this.props.recipeId);
            this.fetchRecipeEntries();  // Refresh the list after deletion
        } catch (error) {
            console.error("Failed to delete recipe entry:", error);
            this.setState({ error: `Failed to delete entry: ${designation}` });
        }
    };

    render() {
        const { recipeEntries, showAddForm, loading, error, editEntry } = this.state;

        if (loading) {
            return <LoadingProgress show={true} />;
        }

        if (error) {
            return <ContextErrorMessage error={error} contextErrorMsg="Failed to load recipe entries." />;
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
                        Add an Ingredient
                    </Button>
                </Grid>
                {recipeEntries.map((entry) => (
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
                    <RecipeEntryForm
                        show={showAddForm}
                        entry={editEntry}
                        onClose={this.handleFormClose}
                        recipeId={this.props.recipeId} // Pass the recipeId to the form
                    />
                )}
            </Grid>
        );
    }
}

export default RecipeEntries;
