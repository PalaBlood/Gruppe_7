import React from 'react';
import { Card, CardContent, CardActions, Typography, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PropTypes from 'prop-types';


function RecipeEntryCard({ recipeEntry, onEdit, onDelete, isEntryAvailableInFridge }) {
    if (!recipeEntry) {
        return null;
    }

    return (
        <Card>
            <CardContent>
                <Typography variant="h5" style={{ color: isEntryAvailableInFridge(recipeEntry) ? 'black' : 'red' }}>
                    {recipeEntry.getDesignation()}
                </Typography>
                <Typography color="textSecondary" style={{ color: isEntryAvailableInFridge(recipeEntry) ? 'black' : 'red' }}>
                    Quantity: {recipeEntry.getQuantity()} {recipeEntry.getUnit()}
                    {!isEntryAvailableInFridge(recipeEntry) && ' (Item not available)'}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" startIcon={<EditIcon />} onClick={() => onEdit(recipeEntry)}>Edit</Button>
                <Button size="small" startIcon={<DeleteIcon />} onClick={() => onDelete(recipeEntry)}>Delete</Button>
            </CardActions>
        </Card>
    );
}

RecipeEntryCard.propTypes = {
    recipeEntry: PropTypes.object.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    isEntryAvailableInFridge: PropTypes.func.isRequired
};

export default RecipeEntryCard;
