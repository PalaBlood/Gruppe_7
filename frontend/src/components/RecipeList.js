import React, { useEffect, useState } from 'react';
import { Button, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import FridgeAPI from '../API/SmartFridgeAPI';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import RecipeBO from '../API/RecipeBO';
import RecipeForm from './dialogs/RecipeForm';
import RecipeCard from './layout/RecipeCard';
import { getAuth } from 'firebase/auth';
import RecipeEntryBO from '../API/RecipeEntryBO';
import FridgeEntryBO from '../API/FridgeEntryBO';
/**Übersicht aller Rezepte sowie die Erstellung neuer, das löschen und Editieren von Rezepten */

//Sorgt dafür, dass verschiedene Maßeinheiten miteinander verglichen werden können
const conversionRates = {
    liters: { milliliters: 1000, liters: 1, centiliters: 100, l: 1, ml: 1000, cl: 100 },
    milliliters: { liters: 1 / 1000, milliliters: 1, centiliters: 1 / 10, l: 1 / 1000, cl: 1 / 10, ml: 1, cups: 1 / 250 },
    kilograms: { grams: 1000, kilograms: 1, g: 1000, kg: 1 },
    grams: { kilograms: 1 / 1000, grams: 1, kg: 1 / 1000, g: 1, cups: 1 / 250 },
    pieces: { pieces: 1 },
    cups: { cups: 1, milliliters: 250, ml: 250, grams: 250, g: 250 },
    pinch: { pinch: 1 },
    l: { l: 1, ml: 1000, cl: 100, milliliters: 1000, liters: 1, centiliters: 100 },
    ml: { l: 1 / 1000, cl: 1 / 10, ml: 1, cups: 1 / 250, liters: 1 / 1000, milliliters: 1, centiliters: 1 / 10 },
    kg: { g: 1000, kg: 1, grams: 1000, kilograms: 1 },
    g: { kg: 1 / 1000, g: 1, cups: 1 / 250, kilograms: 1 / 1000, grams: 1 },
    cl: { l: 1 / 100, ml: 10, cl: 1, liters: 1 / 100, milliliters: 10, centiliters: 1 },
    centiliters: { liters: 1 / 100, milliliters: 10, centiliters: 1, l: 1 / 100, ml: 10, cl: 1 },
    piece: { piece: 1 }
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
    const [recipeStatus, setRecipeStatus] = useState({});  // Neue State für Rezeptstatus hinzugefügt
    const navigate = useNavigate();



    useEffect(() => {
        fetchRecipes();
        fetchFridgeEntries();
    }, []);



    useEffect(() => {
        if (recipes.length > 0 && fridgeEntries.length > 0) {
            checkRecipeStatus();
        }
    }, [recipes, fridgeEntries]);  // Neue useEffect-Hook um Rezeptstatus zu überprüfen



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



    const checkRecipeStatus = async () => {
        const status = {};
        for (const recipe of recipes) {
            const recipeEntries = await FridgeAPI.getAPI().getRecipeEntriesByRecipeId(recipe.getId());
            const recipeEntryBOs = RecipeEntryBO.fromJSON(recipeEntries);
            const allIngredientsAvailable = recipeEntryBOs.every(recipeEntry => {
                const matchingFridgeEntry = fridgeEntries.find(fridgeEntry =>
                    fridgeEntry.getDesignation() === recipeEntry.getDesignation()
                );
                if (matchingFridgeEntry) {
                    const recipeQuantityInFridgeUnits = convertQuantity(recipeEntry.getQuantity(), recipeEntry.getUnit(), matchingFridgeEntry.getUnit());
                    return recipeQuantityInFridgeUnits !== null && matchingFridgeEntry.getQuantity() >= recipeQuantityInFridgeUnits;
                }
                return false;
            });
            status[recipe.getId()] = allIngredientsAvailable;
        }
        setRecipeStatus(status);  // Rezeptstatus aktualisieren
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
        const auth = getAuth();
        const currentUser = auth.currentUser;
        const creator = recipe.getCreator();
        if (currentUser.uid !== creator) {
            alert('You are not the creator of this recipe. You cannot edit it.');
            return;
        } else {
            setShowAddForm(true);
            setEditRecipe(recipe);
        }
    };


    const handleDeleteButtonClick = async (recipe) => {
        const auth = getAuth();
        const currentUser = auth.currentUser;
        const creator = recipe.getCreator();
        if (currentUser.uid !== creator) {
            alert('You are not the creator of this recipe. You cannot delete it.');
            return;
        } else {
            try {
                await FridgeAPI.getAPI().deleteRecipe(recipe.getId());
                fetchRecipes();
            } catch (error) {
                setError(error);
            }
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
                    sx={{ width: '250px', height: '50px', p:1 }}
                >
                    Create new recipe
                </Button>
            </Grid>
            {recipes.map((recipe) => (
                <Grid 
                    item 
                    xs={12} 
                    sm={8} 
                    md={8} 
                    key={recipe.getId()}
                >
                    <RecipeCard
                        recipe={recipe}
                        onEdit={handleEditButtonClick}
                        onDelete={handleDeleteButtonClick}
                        onViewEntries={handleViewEntriesButtonClick}
                        onCook={handleCookButtonClick}
                        isAvailable={recipeStatus[recipe.getId()]}  // Verfügbarkeit als Prop weitergeben
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
