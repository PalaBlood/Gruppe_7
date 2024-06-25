import React, { useEffect, useState } from 'react';
import { Button, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useParams } from 'react-router-dom';
import FridgeAPI from '../API/SmartFridgeAPI';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import RecipeEntryBO from '../API/RecipeEntryBO';
import RecipeEntryForm from './dialogs/RecipeEntryForm';
import RecipeEntryCard from './RecipeEntryCard';

function RecipeEntryList() {
    const { recipeId } = useParams();
    const [recipeEntries, setRecipeEntries] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [editEntry, setEditEntry] = useState(null);

    useEffect(() => {
        console.log(`Fetching recipe entries for recipeId: ${recipeId}`);
        fetchRecipeEntries();
    }, [recipeId]);

    const fetchRecipeEntries = async () => {
        setLoading(true);
        try {
            console.log('Calling FridgeAPI.getRecipeEntriesByRecipeId');
            const entries = await FridgeAPI.getAPI().getRecipeEntriesByRecipeId(recipeId);
            console.log('Entries fetched:', entries);
            const recipeEntryBOs = RecipeEntryBO.fromJSON(entries);
            setRecipeEntries(recipeEntryBOs);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching recipe entries:', error);
            setError(error);
            setLoading(false);
        }
    };

    const handleAddButtonClick = () => {
        setShowAddForm(true);
        setEditEntry(null);
    };

    const handleFormClose = (newEntry) => {
        setShowAddForm(false);
        if (newEntry) {
            fetchRecipeEntries(); // State neu laden
        }
    };

    const handleEditButtonClick = (entry) => {
        setShowAddForm(true);
        setEditEntry(entry);
    };

    const handleDeleteButtonClick = async (entry) => {
        try {
            await FridgeAPI.getAPI().deleteRecipeEntry(entry.getId());
            fetchRecipeEntries();
        } catch (error) {
            setError(error);
        }
    };

    if (loading) {
        return <LoadingProgress show={true} />;
    }

    if (error) {
        return <ContextErrorMessage error={error} contextErrorMsg="Failed to load ingredients." />;
    }

    return (
        <Grid container spacing={2} style={{ padding: 20 }}>
            <Grid item xs={12}>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={handleAddButtonClick}
                >
                    Add Ingredient
                </Button>
            </Grid>
            {recipeEntries.length === 0 ? (
                <Grid item xs={12}>
                    <p>No ingredients found. Add a new ingredient to get started.</p>
                </Grid>
            ) : (
                recipeEntries.map((entry) => (
                    <Grid item xs={12} sm={6} md={4} key={entry.getId()}>
                        <RecipeEntryCard
                            RecipeEntry={entry}
                            onEdit={handleEditButtonClick}
                            onDelete={handleDeleteButtonClick}
                        />
                    </Grid>
                ))
            )}
            {showAddForm && (
                <RecipeEntryForm
                    show={showAddForm}
                    entry={editEntry}
                    onClose={handleFormClose}
                    recipeId={parseInt(recipeId)}
                />
            )}
        </Grid>
    );
}

export default RecipeEntryList;
