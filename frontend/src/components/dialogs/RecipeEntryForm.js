import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FridgeAPI from '../../API/SmartFridgeAPI';
import RecipeEntryBO from '../../API/RecipeEntryBO';
import ContextErrorMessage from './ContextErrorMessage';
import LoadingProgress from './LoadingProgress';
import { getAuth } from 'firebase/auth';

function RecipeEntryForm({ entry, show, onClose, recipeId }) {
    const [designation, setDesignation] = useState('');
    const [quantity, setQuantity] = useState('');
    const [unit, setUnit] = useState('');
    const [units, setUnits] = useState([]);
    const [addingInProgress, setAddingInProgress] = useState(false);
    const [updatingInProgress, setUpdatingInProgress] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHouseholdUnits = async () => {
            try {
                const auth = getAuth();
                const user = auth.currentUser;
                if (user) {
                    const householdResponse = await FridgeAPI.getAPI().getHouseholdIdByGoogleUserId(user.uid);
                    const unitsResponse = await FridgeAPI.getAPI().getUnitbyHouseholdId(householdResponse.household_id);
                    setUnits(unitsResponse.map(unitBO => unitBO.designation));
                }
            } catch (e) {
                handleError(e);
            }
        };

        fetchHouseholdUnits();

        if (entry) {
            setDesignation(entry.getDesignation());
            setQuantity(entry.getQuantity());
            setUnit(entry.getUnit());
        } else {
            setDesignation('');
            setQuantity('');
            setUnit('');
        }
    }, [entry]);

    const handleError = (e) => {
        console.error(e);
        setError({ message: e.message });
    };

    const addRecipeEntry = async () => {
        if (!designation || !quantity || !unit) {
            setError({ message: 'All fields are required' });
            return;
        }

        setAddingInProgress(true);
        setError(null);

        const newRecipeEntry = new RecipeEntryBO(designation, quantity, unit, recipeId);

        try {
            const recipeEntry = await FridgeAPI.getAPI().addRecipeEntry(newRecipeEntry);
            onClose(recipeEntry);
        } catch (e) {
            handleError(e);
        } finally {
            setAddingInProgress(false);
        }
    };

    const updateRecipeEntry = async () => {
        if (!designation || !quantity || !unit) {
            setError({ message: 'All fields are required' });
            return;
        }

        setUpdatingInProgress(true);
        setError(null);

        const updatedRecipeEntry = new RecipeEntryBO(designation, quantity, unit, recipeId);
        updatedRecipeEntry.setId(entry.getId());
        updatedRecipeEntry.setRecipeId(recipeId);

        try {
            const recipeEntry = await FridgeAPI.getAPI().updateRecipeEntry(updatedRecipeEntry);
            console.log(recipeEntry)
            onClose(recipeEntry);
        } catch (e) {
            handleError(e);
        } finally {
            setUpdatingInProgress(false);
        }
    };

    const handleClose = () => {
        onClose(null);
    };

    return (
        show && (
            <Dialog open={show} onClose={handleClose} maxWidth='xs'>
                <DialogTitle>
                    {entry ? 'Update an ingredient' : 'Create an ingredient'}
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {'Enter ingredient data'}
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
                    <FormControl fullWidth margin="dense">
                        <InputLabel id="unit-label">Unit</InputLabel>
                        <Select
                            labelId="unit-label"
                            id="unit"
                            value={unit}
                            onChange={(e) => setUnit(e.target.value)}
                            label="Unit"
                        >
                            {units.map((unit) => (
                                <MenuItem key={unit} value={unit}>
                                    {unit}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <LoadingProgress show={addingInProgress || updatingInProgress} />
                    <ContextErrorMessage
                        error={error}
                        contextErrorMsg={entry ? `The recipe entry ${entry.getId()} could not be updated.` : 'The recipe entry could not be added.'}
                        onReload={entry ? updateRecipeEntry : addRecipeEntry}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={entry ? updateRecipeEntry : addRecipeEntry} color="primary">
                        {entry ? 'Update' : 'Add'}
                    </Button>
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
