import React from 'react';
import { Button, Card, CardContent, CardActions, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PropTypes from 'prop-types';
/**Optische Anpassungen zu den Kühlschrankeinträgen können hier verwirklicht werden */


const FridgeEntryCard = ({ entry, onEdit, onDelete }) => (
    <Card>
        <CardContent>
            <Typography variant="h5">{entry.getDesignation()}</Typography>
            <Typography color="textSecondary">
                Quantity: {entry.getQuantity()} {entry.getUnit()}
            </Typography>
        </CardContent>
        <CardActions>
            <Button size="small" startIcon={<EditIcon />} onClick={() => onEdit(entry)}>Edit</Button>
            <Button size="small" startIcon={<DeleteIcon />} onClick={() => onDelete(entry.getDesignation())}>Delete</Button>
        </CardActions>
    </Card>
);

FridgeEntryCard.propTypes = {
    entry: PropTypes.object.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default FridgeEntryCard;
