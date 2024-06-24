import React from 'react';
import { Card, CardContent, CardActions, Typography, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';;

function RecipeCard({ recipe, onEdit, onDelete, onViewEntries }) {
    
    return (
        <Card>
            
            <CardContent>
                <Typography variant="h5">{recipe.getTitle()}</Typography>
                <Typography color="textSecondary">
                    Portionen: {recipe.getNumberOfPersons()} <br />
                    Beschreibung: {recipe.getDescription()}
                </Typography>
            </CardContent>

            <CardActions>
                <Button size="small" startIcon={<EditIcon />} onClick={() => onEdit(recipe)}>Rezept bearbeiten</Button>
                <Button size="small" startIcon={<DeleteIcon />} onClick={() => onDelete(recipe)}>Entfernen</Button>
                <Button size="small" onClick={() => onViewEntries(recipe.getId())}>Zeige Zutaten</Button>
            </CardActions>

        </Card>
    );
}

export default RecipeCard;
