import React, { useEffect, useState } from 'react';
import { Button, Grid, Typography, Card, CardContent, CardActions } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Pfeilsymbol importieren
import { useNavigate, useParams } from 'react-router-dom';
import FridgeAPI from '../API/SmartFridgeAPI';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import RecipeEntryBO from '../API/RecipeEntryBO';
import RecipeEntryForm from './dialogs/RecipeEntryForm';
import RecipeEntryCard from './layout/RecipeEntryCard';
import FridgeEntryBO from '../API/FridgeEntryBO';
import { getAuth } from 'firebase/auth';
/**Übersicht aller Zutaten eines Rezeptes */

//Sorgt dafür, dass verschiedene Maßeinheiten miteinander verglichen werden können
const conversionRates = {
    liters: {
        milliliters: 1000,
        liters: 1,
        centiliters: 100,
        l: 1,
        ml: 1000,
        cl: 100
    },
    milliliters: {
        liters: 1 / 1000,
        milliliters: 1,
        centiliters: 1 / 10,
        l: 1 / 1000,
        cl: 1 / 10,
        ml: 1,
        cups: 1 / 250
    },
    kilograms: {
        grams: 1000,
        kilograms: 1,
        g: 1000,
        kg: 1
    },
    grams: {
        kilograms: 1 / 1000,
        grams: 1,
        kg: 1 / 1000,
        g: 1,
        cups: 1 / 250
    },
    pieces: {
        pieces: 1
    },
    cups: {
        cups: 1,
        milliliters: 250,
        ml: 250,
        grams: 250,
        g: 250
    },
    pinch: {
        pinch: 1
    },
    l: {
        l: 1,
        ml: 1000,
        cl: 100,
        milliliters: 1000,
        liters: 1,
        centiliters: 100,
    },
    ml: {
        l: 1 / 1000,
        cl: 1 / 10,
        ml: 1,
        cups: 1 / 250,
        liters: 1 / 1000,
        milliliters: 1,
        centiliters: 1 / 10
    },
    kg: {
        g: 1000,
        kg: 1,
        grams: 1000,
        kilograms: 1
    },
    g: {
        kg: 1 / 1000,
        g: 1,
        cups: 1 / 250,
        kilograms: 1 / 1000,
        grams: 1
    },
    cl: {
        l: 1 / 100,
        ml: 10,
        cl: 1,
        liters: 1 / 100,
        milliliters: 10,
        centiliters: 1,
    },
    centiliters: {
        liters: 1 / 100,
        milliliters: 10,
        centiliters: 1,
        l: 1 / 100,
        ml: 10,
        cl: 1
    },
    piece: {
        piece: 1
    }
};



function RecipeEntryList() {
    const { recipeId } = useParams();
    const navigate = useNavigate(); // useNavigate Hook verwenden
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

            // API call and response logging
            const response = await FridgeAPI.getAPI().deleteRecipeEntry(designation, recipeId);

            fetchRecipeAndFridgeEntries();
        } catch (error) {
            console.error("Error during API call: ", error);
            setError(error);
        }
    };


    const isEntryAvailableInFridge = (entry) => {
        return fridgeEntries.some(fridgeEntry => {
            if (fridgeEntry.getDesignation() === entry.getDesignation()) {
                const convertedQuantity = convertQuantity(entry.getQuantity(), entry.getUnit(), fridgeEntry.getUnit());
                return convertedQuantity !== null && fridgeEntry.getQuantity() >= convertedQuantity;
            }
            return false;
        });
    };


    function convertQuantity(quantity, fromUnit, toUnit) {
        if (conversionRates[fromUnit] && conversionRates[fromUnit][toUnit]) {
            return quantity * conversionRates[fromUnit][toUnit];
        }
        return null;
    }

    if (loading) {
        return <LoadingProgress show={true} />;
    }

    if (error) {
        return <ContextErrorMessage error={error} contextErrorMsg="Failed to load ingredients." />;
    }

    return (

        <Grid container spacing={2} style={{ padding: 20, textAlign: 'center' }}>

            <Grid item xs={12}>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<ArrowBackIcon />} // Pfeilsymbol hinzufügen
                    onClick={() => navigate(-1)} // Zurück navigieren
                    sx={{ width: '200px', height: '50px' }}
                    
                >
                    Back to Recipes
                </Button>
            </Grid>

            <Grid item xs={12}>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={handleAddButtonClick}
                    sx={{ width: '200px', height: '50px' }}
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
                            recipeEntry={entry}
                            fridgeEntries={fridgeEntries}
                            onEdit={handleEditButtonClick}
                            onDelete={handleDeleteButtonClick}
                            isEntryAvailableInFridge={isEntryAvailableInFridge}
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
