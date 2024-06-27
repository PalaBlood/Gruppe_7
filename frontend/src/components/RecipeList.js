import React, { Component } from 'react';
import { Button, Card, CardContent, CardActions, Typography, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import FridgeAPI from '../API/SmartFridgeAPI';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import RecipeBO from '../API/RecipeBO';
import RecipeForm from './dialogs/RecipeForm';
import RecipeCard from './RecipeCard.js';
import { getAuth } from 'firebase/auth';


function RecipeList() {
    const [recipes, setRecipes] = React.useState([]);
    const [showAddForm, setShowAddForm] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [editRecipe, setEditRecipe] = React.useState(null);
    const navigate = useNavigate();

    React.useEffect(() => {
        fetchRecipes();
    }, []);

    const fetchRecipes = async () => {
        setLoading(true);
        const auth = getAuth();
        const currentUser = auth.currentUser;
        try {
            const household_id = await FridgeAPI.getAPI().getHouseholdIdByGoogleUserId(currentUser.uid);
            const recipes = await FridgeAPI.getAPI().getRecipesbyhouseholdId(household_id.household_id);
            const recipeBOs = RecipeBO.fromJSON(recipes);
            console.log(recipeBOs)
            setRecipes(recipeBOs);
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
        navigate(`/recipes/entries/${recipeId}`); // RecipeId wird hier übergeben
    };

    if (loading) {
        return <LoadingProgress show={true} />;
    }

    if (error) {
        return <ContextErrorMessage error={error} contextErrorMsg="Failed to load recipes." />;
    }

    return (
        <Grid container spacing={2} style={{ padding: 20, justifyContent: "center", alignItems: "center"  }}>
            <Grid item xs={12}>
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
                        onViewEntries={handleViewEntriesButtonClick} // Weitergabe der Funktion
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
