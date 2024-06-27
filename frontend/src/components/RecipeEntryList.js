import React, { useEffect, useState } from 'react';
import { Button, Grid, Typography, Card, CardContent, CardActions } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useParams } from 'react-router-dom';
import FridgeAPI from '../API/SmartFridgeAPI';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import RecipeEntryBO from '../API/RecipeEntryBO';
import RecipeEntryForm from './dialogs/RecipeEntryForm';
import RecipeEntryCard from './RecipeEntryCard';
import FridgeEntryBO from '../API/FridgeEntryBO';
import { getAuth } from 'firebase/auth';

function RecipeEntryList() {
    const { recipeId } = useParams();
    const [recipeEntries, setRecipeEntries] = useState([]);
    const [fridgeEntries, setFridgeEntries] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [editEntry, setEditEntry] = useState(null);

    useEffect(() => {
        fetchRecipeAndFridgeEntries();
    }, [recipeId]);

    const fetchRecipeAndFridgeEntries = async () => {
        setLoading(true);
        try {
            const recipeEntries = await FridgeAPI.getAPI().getRecipeEntriesByRecipeId(recipeId);
            console.log(recipeId)
            const recipeEntryBOs = RecipeEntryBO.fromJSON(recipeEntries);
            setRecipeEntries(recipeEntryBOs);

            const auth = getAuth();
            const user = auth.currentUser;
            const fridge_id = await FridgeAPI.getAPI().getFridgeIdByGoogleUserId(user.uid);
            const fridgeEntries = await FridgeAPI.getAPI().getFridgeEntriesbyFridgeId(fridge_id.fridge_id);
            const fridgeEntryBOs = FridgeEntryBO.fromJSON(fridgeEntries);
            setFridgeEntries(fridgeEntryBOs);

            setLoading(false);
        } catch (error) {
            console.error('Error fetching entries:', error);
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
            fetchRecipeAndFridgeEntries();
        }
    };

    const handleEditButtonClick = (entry) => {
        setShowAddForm(true);
        setEditEntry(entry);
    };

    const handleDeleteButtonClick = async (entry) => {
        try {
            let designation = entry.getDesignation();
            console.log("Vor API-Aufruf - Bezeichnung: ", designation, "ID: ", recipeId); // Debugging
            
            // API-Aufruf und Antwort loggen
            const response = await FridgeAPI.getAPI().deleteRecipeEntry(designation, recipeId);
            console.log("API Antwort: ", response);
            
            fetchRecipeAndFridgeEntries();
        } catch (error) {
            console.error("Fehler bei API-Aufruf: ", error);
            setError(error);
        }
    };
    

    const isEntryAvailableInFridge = (entry) => {
        return fridgeEntries.some(fridgeEntry =>
            fridgeEntry.getDesignation() === entry.getDesignation() &&
            fridgeEntry.getQuantity() >= entry.getQuantity() &&
            fridgeEntry.getUnit() === entry.getUnit()
        );
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
                        <Card>
                            <CardContent>
                                <Typography variant="h5" style={{ color: isEntryAvailableInFridge(entry) ? 'black' : 'red' }}>
                                    {entry.getDesignation()}
                                </Typography>
                                <Typography color="textSecondary" style={{ color: isEntryAvailableInFridge(entry) ? 'black' : 'red' }}>
                                    Quantity: {entry.getQuantity()} {entry.getUnit()}
                                    {!isEntryAvailableInFridge(entry) && ' (Not available in fridge)'}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={() => handleEditButtonClick(entry)}>Edit</Button>
                                <Button size="small" onClick={() => handleDeleteButtonClick(entry)}>Delete</Button>
                            </CardActions>
                        </Card>
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
