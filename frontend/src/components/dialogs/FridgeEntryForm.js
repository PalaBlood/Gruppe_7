import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FridgeAPI from '../../API/SmartFridgeAPI';
import ContextErrorMessage from './ContextErrorMessage';
import LoadingProgress from './LoadingProgress';
import { getAuth } from 'firebase/auth';
import FridgeEntryBO from '../../API/FridgeEntryBO';

class FridgeEntryForm extends Component {
    constructor(props) {
        super(props);
        // Init the state
        let designation = '', quantity = '', unit = '', fridge_id = '';
        if (props.fridgeentry) {
            designation = props.fridgeentry.getDesignation();
            quantity = props.fridgeentry.getQuantity();
            unit = props.fridgeentry.getUnit();
            fridge_id = props.fridgeentry.getFridgeId();
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
            units: [],
            fridge_id: fridge_id,
            addingInProgress: false,
            updatingInProgress: false,
            addingError: null,
            updatingError: null,
            loadingFridgeId: true,
            fridgeIdError: null
        };

        this.baseState = { ...this.state };
    }

    async componentDidMount() {
        await this.handleFetchGoogleUserId();
        await this.fetchHouseholdUnits();
    }
    // Fetches the fridge ID of the currently signed in user
    handleFetchGoogleUserId = async () => {
        try {
            const auth = getAuth();
            const user = auth.currentUser;
            if (user) {
                console.log('Google User ID:', user.uid);
                const response = await FridgeAPI.getAPI().getFridgeIdByGoogleUserId(user.uid);
                this.setState({ fridge_id: response.fridge_id, loadingFridgeId: false });
            } else {
                console.log('No user is signed in.');
                this.setState({ loadingFridgeId: false });
            }
        } catch (error) {
            console.error('Error while fetching fridge ID:', error);
            this.setState({ fridgeIdError: error.message, loadingFridgeId: false });
        }
    };

    // Fetches the household units of the currently signed in user
    fetchHouseholdUnits = async () => {
        try {
            const auth = getAuth();
            const user = auth.currentUser;
            if (user) {
                const householdResponse = await FridgeAPI.getAPI().getHouseholdIdByGoogleUserId(user.uid);
                const unitsResponse = await FridgeAPI.getAPI().getUnitbyHouseholdId(householdResponse.household_id);
                this.setState({ units: unitsResponse.map(unitBO => unitBO.designation) });
            }
        } catch (e) {
            console.error('Error while fetching units:', e);
            this.setState({ error: { message: e.message } });
        }
    };

    // Adds a new fridge entry
    addFridgeEntry = async () => {
        const { designation, quantity, unit, fridge_id } = this.state;

        this.setState({ addingInProgress: true, addingError: null });

        const newFridgeEntry = new FridgeEntryBO(
            designation,
            quantity,
            unit,
            fridge_id,
        );

        FridgeAPI.getAPI().addFridgeEntry(newFridgeEntry).then(fridgeentry => {
            this.setState({ ...this.baseState });
            this.props.onClose(fridgeentry);
        }).catch(e => {
            console.error('Error while adding fridge entry:', e);
            this.setState({ addingInProgress: false, addingError: { message: e.message } });
        });
    }

    // Updates an existing fridge entry
    updateFridgeEntry = () => {
        const { designation, quantity, unit, fridge_id } = this.state;

        this.setState({ updatingInProgress: true, updatingError: null });

        const updatedFridgeEntry = {
            id: this.props.fridgeentry.id,
            fridge_id: fridge_id,
            groceries_designation: designation,
            quantity: quantity,
            unit: unit
        };

        FridgeAPI.getAPI().updateFridgeEntry(updatedFridgeEntry).then(fridgeentry => {
            this.setState({ ...this.baseState });
            this.props.onClose(fridgeentry);
        }).catch(e => {
            console.error('Error while updating fridge entry:', e);
            this.setState({ updatingInProgress: false, updatingError: e.message });
        });
    }
    // Handles the change of a text field
    textFieldValueChange = (event) => {
        const value = event.target.value;
        let error = value.trim().length === 0;

        this.setState({
            [event.target.id]: value,
            [event.target.id + 'ValidationFailed']: error,
            [event.target.id + 'Edited']: true
        });
    }
    // Handles the closing of the dialog
    handleClose = () => {
        this.setState(this.baseState);
        this.props.onClose(null);
    }
    // Renders the component
    render() {
        const { fridgeentry, show } = this.props;
        const { designation, designationValidationFailed, designationEdited, quantity, quantityValidationFailed, quantityEdited, unit, unitValidationFailed, unitEdited, units, addingInProgress, addingError, updatingInProgress, updatingError, loadingFridgeId, fridgeIdError } = this.state;

        let title = fridgeentry ? 'Update a Grocery' : 'Create or update one of your Groceries';
        let header = 'Enter Grocery Data';

        if (loadingFridgeId) {
            return <LoadingProgress show />;
        }

        if (fridgeIdError) {
            return <ContextErrorMessage error={fridgeIdError} contextErrorMsg={`Error fetching fridge ID`} />;
        }

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
                            <FormControl fullWidth margin="normal">
                                <InputLabel id="unit-label">Unit</InputLabel>
                                <Select
                                    labelId="unit-label"
                                    id="unit"
                                    value={unit}
                                    onChange={(e) => this.setState({ unit: e.target.value, unitEdited: true })}
                                    label="Unit"
                                >
                                    {units.map((unit) => (
                                        <MenuItem key={unit} value={unit}>
                                            {unit}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </form>
                        <LoadingProgress show={addingInProgress || updatingInProgress} />
                        {
                            fridgeentry ?
                                <ContextErrorMessage error={updatingError} contextErrorMsg={`The fridge entry ${fridgeentry.getId()} could not be updated.`} onReload={this.updateFridgeEntry} />
                                :
                                <ContextErrorMessage error={addingError} contextErrorMsg={`The fridge entry could not be added.`} onReload={this.addFridgeEntry} />
                        }
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color='secondary'>Cancel</Button>
                        {
                            fridgeentry ?
                                <Button disabled={designationValidationFailed || quantityValidationFailed || unitValidationFailed} variant='contained' onClick={this.updateFridgeEntry} color='primary'>Update</Button>
                                :
                                <Button disabled={designationValidationFailed || !designationEdited || quantityValidationFailed || !quantityEdited || unitValidationFailed || !unitEdited} variant='contained' onClick={this.addFridgeEntry} color='primary'>Add</Button>
                        }
                    </DialogActions>
                </Dialog>
            ) : null
        );
    }
}

FridgeEntryForm.propTypes = {
    fridgeentry: PropTypes.object,
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
}

export default FridgeEntryForm;
