import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FridgeAPI from '../../API/SmartFridgeAPI';
import RecipeEntryBO from '../../API/RecipeEntryBO';
import ContextErrorMessage from './ContextErrorMessage';
import LoadingProgress from './LoadingProgress';

function RecipeEntryForm({ entry, show, onClose, recipeId }) {
    const [designation, setDesignation] = useState(entry ? entry.getDesignation() : '');
    const [quantity, setQuantity] = useState(entry ? entry.getQuantity() : '');
    const [unit, setUnit] = useState(entry ? entry.getUnit() : '');
    const [addingInProgress, setAddingInProgress] = useState(false);
    const [updatingInProgress, setUpdatingInProgress] = useState(false);
    const [addingError, setAddingError] = useState(null);
    const [updatingError, setUpdatingError] = useState(null);

    
    const addRecipeEntry = async () => {
        setAddingInProgress(true);
        setAddingError(null);

        const newRecipeEntry = new RecipeEntryBO(designation, quantity, unit, recipeId); //Rezept-ID wird hier verwendet
        console.log('New Recipe Entry:', newRecipeEntry);  //Debugging

        try {
        
            const recipeEntry = await FridgeAPI.getAPI().addRecipeEntry(newRecipeEntry);
            onClose(recipeEntry);
        } catch (e) {
            setAddingError({ message: e.message });
        } finally {
            setAddingInProgress(false)
        }
    };

    const updateRecipeEntry = async () => {
        setUpdatingInProgress(true);
        setUpdatingError(null);

        const updatedRecipeEntry = new RecipeEntryBO(designation, quantity, unit, recipeId);
        updatedRecipeEntry.setId(entry.getId());
        updatedRecipeEntry.setRecipeId(recipeId);

        try {
            const recipeEntry = await FridgeAPI.updateRecipeEntry(updatedRecipeEntry);
            onClose(recipeEntry);
        } catch (e) {
            setUpdatingInProgress(false);
            setUpdatingError({ message: e.message });
        }
    };

    const handleClose = () => {
        onClose(null)
    };

    return (
        show && (
            <Dialog open={show} onClose={handleClose} maxWidth='xs'>
                <DialogTitle>
                    {entry ? 'Update an Ingredient' : 'Create an Ingredient'}
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {entry ? `Recipe Entry ID: ${entry.getId()}` : 'Enter Ingredient Data'}
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="designation"
                        label="Designation"
                        type="text"
                        fullWidth
                        value={designation}
                        onChange={(e) => setDesignation(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="quantity"
                        label="Quantity"
                        type="text"
                        fullWidth
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="unit"
                        label="Unit"
                        type="text"
                        fullWidth
                        value={unit}
                        onChange={(e) => setUnit(e.target.value)}
                    />
                    <LoadingProgress show={addingInProgress || updatingInProgress} />
                    {entry ? (
                        <ContextErrorMessage
                            error={updatingError}
                            contextErrorMsg={`The recipe entry ${entry.getId()} could not be updated.`}
                            onReload={updateRecipeEntry}
                        />
                    ) : (
                        <ContextErrorMessage
                            error={addingError}
                            contextErrorMsg={`The recipe entry could not be added.`}
                            onReload={addRecipeEntry}
                        />
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    {entry ? (
                        <Button onClick={updateRecipeEntry} color="primary">
                            Update
                        </Button>
                    ) : (
                        <Button onClick={addRecipeEntry} color="primary">
                            Add
                        </Button>
                    )}
                </DialogActions>
            </Dialog>
        )
    );
}

RecipeEntryForm.propTypes = {
    entry: PropTypes.object,
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    recipeId: PropTypes.number.isRequired,
};

export default RecipeEntryForm;
