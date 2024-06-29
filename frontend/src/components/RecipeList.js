import React, { useEffect, useState } from 'react';
import { Button, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import FridgeAPI from '../API/SmartFridgeAPI';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import RecipeBO from '../API/RecipeBO';
import RecipeForm from './dialogs/RecipeForm';
import RecipeCard from './RecipeCard';
import { getAuth } from 'firebase/auth';
import RecipeEntryBO from '../API/RecipeEntryBO';
import FridgeEntryBO from '../API/FridgeEntryBO';

const conversionRates = {
    liters: { milliliters: 1000, liters: 1 },
    milliliters: { liters: 1 / 1000, milliliters: 1 },
    kilograms: { grams: 1000, kilograms: 1 },
    grams: { kilograms: 1 / 1000, grams: 1 },
    pieces: { pieces: 1 },
    cups: { cups: 1 },
    pinch: { pinch: 1 },
};

function convertQuantity(quantity, fromUnit, toUnit) {
    if (conversionRates[fromUnit] && conversionRates[fromUnit][toUnit]) {
        return quantity * conversionRates[fromUnit][toUnit];
    }
    return null;
}

function RecipeList() {
    const [recipes, setRecipes] = useState([]);
    const [fridgeEntries, setFridgeEntries] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [editRecipe, setEditRecipe] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchRecipes();
        fetchFridgeEntries();
    }, []);

    const fetchRecipes = async () => {
        setLoading(true);
        const auth = getAuth();
        const currentUser = auth.currentUser;
        try {
            const household_id = await FridgeAPI.getAPI().getHouseholdIdByGoogleUserId(currentUser.uid);
            const recipes = await FridgeAPI.getAPI().getRecipesbyhouseholdId(household_id.household_id);
            const recipeBOs = RecipeBO.fromJSON(recipes);
            setRecipes(recipeBOs);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    const fetchFridgeEntries = async () => {
        setLoading(true);
        const auth = getAuth();
        const currentUser = auth.currentUser;
        try {
            const fridge_id = await FridgeAPI.getAPI().getFridgeIdByGoogleUserId(currentUser.uid);
            const fridgeEntries = await FridgeAPI.getAPI().getFridgeEntriesbyFridgeId(fridge_id.fridge_id);
            const fridgeEntryBOs = FridgeEntryBO.fromJSON(fridgeEntries);
            setFridgeEntries(fridgeEntryBOs);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    const handleAddButtonClick = () => {
        setShowAddForm(true);
        setEditRecipe(null);
    };

    const handleFormClose = (newRecipe) => {
        if (newRecipe) {
            fetchRecipes();
        }
        setShowAddForm(false);
    };

    const handleEditButtonClick = (recipe) => {
        setShowAddForm(true);
        setEditRecipe(recipe);
    };

    const handleDeleteButtonClick = async (recipe) => {
        try {
            await FridgeAPI.getAPI().deleteRecipe(recipe.getId());
            fetchRecipes();
        } catch (error) {
            setError(error);
        }
    };

    const handleViewEntriesButtonClick = (recipeId) => {
        navigate(`/recipes/entries/${recipeId}`);
    };

    const handleCookButtonClick = async (recipe) => {
        try {
            const missingIngredients = [];
            const recipeEntries = await FridgeAPI.getAPI().getRecipeEntriesByRecipeId(recipe.getId());
            const recipeEntryBOs = RecipeEntryBO.fromJSON(recipeEntries);

            for (const recipeEntry of recipeEntryBOs) {
                const matchingFridgeEntry = fridgeEntries.find(fridgeEntry =>
                    fridgeEntry.getDesignation() === recipeEntry.getDesignation()
                );

                if (matchingFridgeEntry) {
                    const recipeQuantityInFridgeUnits = convertQuantity(recipeEntry.getQuantity(), recipeEntry.getUnit(), matchingFridgeEntry.getUnit());

                    if (recipeQuantityInFridgeUnits === null || matchingFridgeEntry.getQuantity() < recipeQuantityInFridgeUnits) {
                        missingIngredients.push(recipeEntry);
                    }
                } else {
                    missingIngredients.push(recipeEntry);
                }
            }

            if (missingIngredients.length > 0) {
                console.log('Missing ingredients:', missingIngredients);
                alert('Not enough ingredients in fridge. Please check the console for missing ingredients.');
            } else {
                await FridgeAPI.getAPI().cookRecipe(recipe.getTitle());
                fetchFridgeEntries();
            }
        } catch (error) {
            console.error('Error during cooking process:', error);
            setError(error);
        }
    };

    if (loading) {
        return <LoadingProgress show={true} />;
    }

    if (error) {
        return <ContextErrorMessage error={error} contextErrorMsg="Failed to load recipes." />;
    }

    return (
        <Grid container spacing={2} style={{ padding: 20, justifyContent: "center", alignItems: "center" }}>
            <Grid item xs={12} style={{ textAlign: 'center' }}>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={handleAddButtonClick}
                >
                    Neues Rezept anlegen
                </Button>
            </Grid>
            {recipes.map((recipe) => (
                <Grid item xs={12} sm={8} md={8} key={recipe.getId()}>
                    <RecipeCard
                        recipe={recipe}
                        onEdit={handleEditButtonClick}
                        onDelete={handleDeleteButtonClick}
                        onViewEntries={handleViewEntriesButtonClick}
                        onCook={handleCookButtonClick}
                    />
                </Grid>
            ))}
            {showAddForm && (
                <RecipeForm
                    show={showAddForm}
                    recipeentry={editRecipe}
                    onClose={handleFormClose}
                />
            )}
        </Grid>
    );
}

export default RecipeList;
