import React from 'react';
import { Card, CardContent, CardActions, Typography, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function RecipeEntryCard({ RecipeEntry, onEdit, onDelete }) {
    if (!RecipeEntry) {
        return null; // oder ein Platzhalter, wenn RecipeEntry nicht vorhanden ist
    }

    return(
        <Card>
            <CardContent>
                <Typography variant='h5'>{RecipeEntry.getDesignation()}</Typography>
                <Typography color={'textSecondary'}>
                    Menge: {RecipeEntry.getQuantity()} {RecipeEntry.getUnit()}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" startIcon={<EditIcon />} onClick={() => onEdit(RecipeEntry)}>Eintrag bearbeiten</Button>
                <Button size="small" startIcon={<DeleteIcon />} onClick={() => onDelete(RecipeEntry)}>Eintrag löschen</Button>
            </CardActions>
        </Card>
    );
}

export default RecipeEntryCard;
