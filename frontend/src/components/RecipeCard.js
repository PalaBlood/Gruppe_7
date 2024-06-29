import React from 'react';
import { Card, CardContent, CardActions, Typography, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import KitchenIcon from '@mui/icons-material/Kitchen';
import OutdoorGrillIcon from '@mui/icons-material/OutdoorGrill';

function RecipeCard({ recipe, onEdit, onDelete, onViewEntries, onCook }) {
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
                <Button size="small" startIcon={<KitchenIcon />} onClick={() => onViewEntries(recipe.getId())}>Zeige Zutaten</Button>
                <Button size="small" startIcon={<OutdoorGrillIcon />} onClick={() => onCook(recipe)}>Cook Recipe</Button>
            </CardActions>
        </Card>
    );
}

export default RecipeCard;
