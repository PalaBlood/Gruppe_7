import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FridgeAPI from '../../API/SmartFridgeAPI';
import RecipeEntryBO from '../../API/RecipeEntryBO';
import ContextErrorMessage from './ContextErrorMessage';
import LoadingProgress from './LoadingProgress';

class RecipeEntryForm extends Component {
    constructor(props) {
        super(props);

        let designation = '', quantity = '', unit = '', recipeId = '';
        if (props.recipeEntry) {
            designation = props.recipeEntry.getDesignation();
            quantity = props.recipeEntry.getQuantity();
            unit = props.recipeEntry.getUnit();
            recipeId = props.recipeEntry.getRecipeId();
        }

        this.state = {
            designation: designation,
            designationValidationFailed: false,
            designationEdited: false,
            quantity: quantity,
            quantityValidationFailed: false,
            quantityEdited: false,
            unit: unit,
            unitValidationFailed: false,
            unitEdited: false,
            recipeId: recipeId,
            addingInProgress: false,
            updatingInProgress: false,
            addingError: null,
            updatingError: null,
        };

        this.baseState = {...this.state};
    }

    addRecipeEntry = async () => {
        const { designation, quantity, unit, recipeId } = this.state;

        this.setState({ addingInProgress: true, addingError: null });

        const newRecipeEntry = new RecipeEntryBO(designation, quantity, unit, recipeId);

        FridgeAPI.getAPI().addRecipeEntry(newRecipeEntry).then(recipeEntry => {
            this.setState({ ...this.baseState });
            this.props.onClose(recipeEntry);
        }).catch(e => {
            console.error('Error while adding recipe entry:', e);
            this.setState({ addingInProgress: false, addingError: { message: e.message } });
        });
    }

    updateRecipeEntry = () => {
        const { designation, quantity, unit, recipeId } = this.state;

        this.setState({ updatingInProgress: true, updatingError: null });

        let updatedRecipeEntry = new RecipeEntryBO({
            id: this.props.recipeEntry.id,
            groceries_designation: designation,
            quantity: quantity,
            unit: unit,
            recipe_id: recipeId
        });

        FridgeAPI.getAPI().updateRecipeEntry(updatedRecipeEntry).then(recipeEntry => {
            this.setState({ ...this.baseState });
            this.props.onClose(recipeEntry);
        }).catch(e => {
            console.error('Error while updating recipe entry:', e);
            this.setState({ updatingInProgress: false, updatingError: e.message });
        });
    }

    textFieldValueChange = (event) => {
        const value = event.target.value;
        let error = value.trim().length === 0;

        this.setState({
            [event.target.id]: value,
            [event.target.id + 'ValidationFailed']: error,
            [event.target.id + 'Edited']: true
        });
    }

    handleClose = () => {
        this.setState(this.baseState);
        this.props.onClose(null);
    }

    render() {
        const { recipeEntry, show } = this.props;
        const { designation, designationValidationFailed, designationEdited, quantity, quantityValidationFailed, quantityEdited, unit, unitValidationFailed, unitEdited, addingInProgress, addingError, updatingInProgress, updatingError } = this.state;

        let title = recipeEntry ? 'Update an Ingredient' : 'Create or update an Ingredient';
        let header = recipeEntry ? `Recipe Entry ID: ${recipeEntry.getId()}` : 'Enter Ingredient Data';

        return (
            show ? (
                <Dialog open={show} onClose={this.handleClose} maxWidth='xs'>
                    <DialogTitle id='form-dialog-title'>{title}
                        <IconButton sx={{ position: 'absolute', right: 1, top: 1, color: 'grey[500]' }} onClick={this.handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>{header}</DialogContentText>
                        <form sx={{ width: '100%' }} noValidate autoComplete='off'>
                            <TextField autoFocus type='text' required fullWidth margin='normal' id='designation' label='Designation:' value={designation}
                                onChange={this.textFieldValueChange} error={designationValidationFailed}
                                helperText={designationValidationFailed ? 'The designation must contain at least one character' : ' '} />
                            <TextField type='text' required fullWidth margin='normal' id='quantity' label='Quantity:' value={quantity}
                                onChange={this.textFieldValueChange} error={quantityValidationFailed}
                                helperText={quantityValidationFailed ? 'The quantity must contain at least one character' : ' '} />
                            <TextField type='text' required fullWidth margin='normal' id='unit' label='Unit:' value={unit}
                                onChange={this.textFieldValueChange} error={unitValidationFailed}
                                helperText={unitValidationFailed ? 'The unit must contain at least one character' : ' '} />
                        </form>
                        <LoadingProgress show={addingInProgress || updatingInProgress} />
                        {
                            recipeEntry ?
                                <ContextErrorMessage error={updatingError} contextErrorMsg={`The recipe entry ${recipeEntry.getId()} could not be updated.`} onReload={this.updateRecipeEntry} />
                                :
                                <ContextErrorMessage error={addingError} contextErrorMsg={`The recipe entry could not be added.`} onReload={this.addRecipeEntry} />
                        }
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color='secondary'>Cancel</Button>
                        {
                            recipeEntry ?
                                <Button disabled={designationValidationFailed || quantityValidationFailed || unitValidationFailed} variant='contained' onClick={this.updateRecipeEntry} color='primary'>Update</Button>
                                :
                                <Button disabled={designationValidationFailed || !designationEdited || quantityValidationFailed || !quantityEdited || unitValidationFailed || !unitEdited} variant='contained' onClick={this.addRecipeEntry} color='primary'>Add</Button>
                        }
                    </DialogActions>
                </Dialog>
            ) : null
        );
    }
}

RecipeEntryForm.propTypes = {
    recipeEntry: PropTypes.object,
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
}

export default RecipeEntryForm;
