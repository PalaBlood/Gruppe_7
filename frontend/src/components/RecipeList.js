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

class RecipeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: [],
            showAddForm: false,
            loading: false,
            error: null,
            editRecipe: null
        };
    }

    componentDidMount() {
        this.fetchRecipes();
    }

    fetchRecipes = async () => {
        this.setState({ loading: true });
        try {
            const recipes = await FridgeAPI.getAPI().getRecipes();
            console.log('Fetched Recipes:', recipes); // Debugging
            const recipeBOs = RecipeBO.fromJSON(recipes);
            console.log('Converted Recipes:', recipeBOs); // Debugging
            this.setState({ recipes: recipeBOs, loading: false });
        } catch (error) {
            console.error("Failed to fetch recipes:", error);
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

    handleDeleteButtonClick = async (recipeId) => {
        try {
            await FridgeAPI.getAPI().deleteRecipe(recipeId);
            this.fetchRecipes();  //Ladet die Recipes nach dem Löschvorhang neu
        } catch (error) {
            console.error("Failed to delete recipe:", error);
            this.setState({ error });
        }
    };
   

    render() {
        const { recipes, showAddForm, loading, error, editRecipe } = this.state;

        if (loading) {
            return <LoadingProgress show={true} />;
        }

        if (error) {
            return <ContextErrorMessage error={error} contextErrorMsg="Failed to load recipes." />;
        }

        console.log('Recipes in render:', recipes); // Debugging

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
                                <Button size="small" startIcon={<DeleteIcon />} onClick={() => this.handleDeleteButtonClick(recipe.getId())}>Delete</Button>
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
