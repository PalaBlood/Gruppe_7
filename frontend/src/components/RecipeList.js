import React, { Component } from 'react';
import { Button, Card, CardContent, CardActions, Typography, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import FridgeAPI from '../API/SmartFridgeAPI';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import RecipeBO from '../API/RecipeBO';
import RecipeForm from './dialogs/RecipeForm';
import RecipeCard from './RecipeCard.js';

function RecipeList() {
    /*
    *Initialisierung des State: React.useState([]) initialisiert eine State-Variable namens recipes mit einem leeren Array als Startwert.

    *State-Setter-Funktion: useState gibt auch eine Funktion zurück, die verwendet wird, um diesen State zu aktualisieren. Diese Funktion wird setRecipes genannt.
    */
    const [recipes, setRecipes] = React.useState([]); //wir sagen es handelt sich um ein Array. Sobald setRecipes daten empfängt, werden diese dort eingespeichert 
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
        try {
            const recipes = await FridgeAPI.getAPI().getRecipes(); 
            const recipeBOs = RecipeBO.fromJSON(recipes);
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
        navigate(`/recipes/${recipeId}/entries`);
    };

    
    if (loading) {
        return <LoadingProgress show={true} />;
    }

    if (error) {
        return <ContextErrorMessage error={error} contextErrorMsg="Failed to load recipes." />;
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
                    Add a Recipe
                </Button>
            </Grid>
            {recipes.map((recipe) => (
                <Grid item xs={12} sm={6} md={4} key={recipe.getId()}>
                    <RecipeCard
                        recipe={recipe} //weitergabe des Objekts an RecipeCard.js
                        onEdit={handleEditButtonClick}
                        onDelete={handleDeleteButtonClick}
                        onViewEntries={handleViewEntriesButtonClick}
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
