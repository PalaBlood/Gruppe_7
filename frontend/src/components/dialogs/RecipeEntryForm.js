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

        let designation = '', quantity = '', unit = '';
        if (props.entry) {
            designation = props.entry.getDesignation();
            quantity = props.entry.getQuantity();
            unit = props.entry.getUnit();
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
            addingInProgress: false,
            updatingInProgress: false,
            addingError: null,
            updatingError: null,
        };

        this.baseState = { ...this.state };
    }

    addRecipeEntry = async () => {
        const { designation, quantity, unit } = this.state;
        const { recipeId } = this.props;  // Get recipeId from props

        this.setState({ addingInProgress: true, addingError: null });

        const newRecipeEntry = new RecipeEntryBO(designation, quantity, unit);
        newRecipeEntry.setRecipeId(recipeId);

        FridgeAPI.getAPI().addRecipeEntry(newRecipeEntry).then(recipeEntry => {
            this.setState({ ...this.baseState });
            this.props.onClose(recipeEntry);
        }).catch(e => {
            console.error('Error while adding recipe entry:', e);
            this.setState({ addingInProgress: false, addingError: { message: e.message } });
        });
    }

    updateRecipeEntry = () => {
        const { designation, quantity, unit } = this.state;
        const { recipeId } = this.props;  // Get recipeId from props

        this.setState({ updatingInProgress: true, updatingError: null });

        let updatedRecipeEntry = new RecipeEntryBO(designation, quantity, unit);
        updatedRecipeEntry.setId(this.props.entry.getId());
        updatedRecipeEntry.setRecipeId(recipeId);

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
        const { entry, show } = this.props;
        const { designation, designationValidationFailed, designationEdited, quantity, quantityValidationFailed, quantityEdited, unit, unitValidationFailed, unitEdited, addingInProgress, addingError, updatingInProgress, updatingError } = this.state;

        let title = entry ? 'Update an Ingredient' : 'Create an Ingredient';
        let header = entry ? `Recipe Entry ID: ${entry.getId()}` : 'Enter Ingredient Data';

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
                            entry ?
                                <ContextErrorMessage error={updatingError} contextErrorMsg={`The recipe entry ${entry.getId()} could not be updated.`} onReload={this.updateRecipeEntry} />
                                :
                                <ContextErrorMessage error={addingError} contextErrorMsg={`The recipe entry could not be added.`} onReload={this.addRecipeEntry} />
                        }
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color='secondary'>Cancel</Button>
                        {
                            entry ?
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
    entry: PropTypes.object,
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    recipeId: PropTypes.number.isRequired  // Ensure recipeId is passed as a prop
}

export default RecipeEntryForm;
