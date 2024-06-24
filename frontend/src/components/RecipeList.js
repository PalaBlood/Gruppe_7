import React, { Component } from 'react';
import { Button, Card, CardContent, CardActions, Typography, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FridgeAPI from '../API/SmartFridgeAPI';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import RecipeBO from '../API/RecipeBO';
import RecipeForm from './dialogs/RecipeForm';
import RecipeEntries from './RecipeEntries'; // Import the new component

class RecipeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: [],
            showAddForm: false,
            loading: false,
            error: null,
            editRecipe: null,
            selectedRecipeId: null  // New state to store the selected recipe ID
        };
    }

    componentDidMount() {
        this.fetchRecipes();
    }

    fetchRecipes = async () => {
        this.setState({ loading: true });
        try {
            const recipes = await FridgeAPI.getAPI().getRecipes();
            const recipeBOs = RecipeBO.fromJSON(recipes);
            this.setState({ recipes: recipeBOs, loading: false });
        } catch (error) {
            this.setState({ error, loading: false });
        }
    };

    handleAddButtonClick = () => {
        this.setState({ showAddForm: true, editRecipe: null });
    };

    handleFormClose = (newRecipe) => {
        if (newRecipe) {
            this.fetchRecipes();
        }
        this.setState({ showAddForm: false });
    };

    handleEditButtonClick = (recipe) => {
        this.setState({ showAddForm: true, editRecipe: recipe });
    };

    handleDeleteButtonClick = async (recipe) => {
        try {
            await FridgeAPI.getAPI().deleteRecipe(recipe.getId());
            this.fetchRecipes();
        } catch (error) {
            this.setState({ error });
        }
    };

    handleViewGroceriesButtonClick = (recipeId) => {
        this.setState({ selectedRecipeId: recipeId });  // Set the selected recipe ID
    };

    render() {
        const { recipes, showAddForm, loading, error, editRecipe, selectedRecipeId } = this.state;

        if (loading) {
            return <LoadingProgress show={true} />;
        }

        if (error) {
            return <ContextErrorMessage error={error} contextErrorMsg="Failed to load recipes." />;
        }

        // If a recipe is selected, render the RecipeEntriesComponent
        if (selectedRecipeId) {
            return <RecipeEntries recipeId={selectedRecipeId} />;
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
                        Add a Recipe
                    </Button>
                </Grid>
                {recipes.map((recipe) => (
                    <Grid item xs={12} sm={6} md={4} key={recipe.getId()}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5">{recipe.getTitle()}</Typography>
                                <Typography color="textSecondary">
                                    Number of Persons: {recipe.getNumberOfPersons()} <br/>
                                    Description: {recipe.getDescription()}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" startIcon={<EditIcon />} onClick={() => this.handleEditButtonClick(recipe)}>Edit</Button>
                                <Button size="small" startIcon={<DeleteIcon />} onClick={() => this.handleDeleteButtonClick(recipe)}>Delete</Button>
                                <Button size="small" onClick={() => this.handleViewGroceriesButtonClick(recipe.getId())}>View Groceries</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
                {showAddForm && (
                    <RecipeForm
                        show={showAddForm}
                        recipeentry={editRecipe}
                        onClose={this.handleFormClose}
                    />
                )}
            </Grid>
        );
    }
}

export default RecipeList;
