import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SmartFridgeAPI from '../../API/SmartFridgeAPI';
import FridgeEntryBO from '../../API/FridgeEntryBO';
import ContextErrorMessage from './ContextErrorMessage';
import LoadingProgress from './LoadingProgress';

/**
 * Shows a modal form dialog for a FridgeEntry in prop fridgeentry. If the fridgeentry is set, the dialog is configured
 * as an edit dialog and the text fields of the form are filled from the given FridgeEntry object.
 * If the fridgeentry is null, the dialog is configured as a new fridge entry dialog and the textfields are empty.
 * In dependency of the edit/new state, the respective backend calls are made to update or create a fridge entry.
 * After that, the function of the onClose prop is called with the created/update FridgeEntry object as parameter.
 * When the dialog is canceled, onClose is called with null.
 *
 * @see See Material-UIs [Dialog](https://mui.com/material-ui/react-dialog/)
 * @see See Material-UIs [TextField](https://mui.com/material-ui/react-text-field/)
 */
class FridgeEntryForm extends Component {

  constructor(props) {
    super(props);

    let designation = '', quantity = '', unit = '';
    if (props.fridgeentry) {
      designation = props.fridgeentry.getDesignation();
      quantity = props.fridgeentry.getQuantity();
      unit = props.fridgeentry.getUnit();
    }

    // Init the state
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
      updatingError: null
    };
    // save this state for canceling
    this.baseState = {...this.state};
  }

  /** Adds the fridge entry */
  addFridgeEntry = () => {
    let newFridgeEntry = new FridgeEntryBO(this.state.designation, this.state.quantity, this.state.unit);
    SmartFridgeAPI.getAPI().addFridgeEntry(newFridgeEntry).then(fridgeentry => {
      this.setState(this.baseState);
      this.props.onClose(fridgeentry);
    }).catch(e =>
      this.setState({
        addingInProgress: false,
        addingError: e
      })
    );

    this.setState({
      addingInProgress: true,
      addingError: null
    });
  }

  /** Updates the fridge entry */
  updateFridgeEntry = () => {
    let updatedFridgeEntry = Object.assign(new FridgeEntryBO(), this.props.fridgeentry);
    updatedFridgeEntry.setDesignation(this.state.designation);
    updatedFridgeEntry.setQuantity(this.state.quantity);
    updatedFridgeEntry.setUnit(this.state.unit);
    SmartFridgeAPI.getAPI().updateFridgeEntry(updatedFridgeEntry).then(fridgeentry => {
      this.setState({
        updatingInProgress: false,
        updatingError: null
      });
      this.baseState.designation = this.state.designation;
      this.baseState.quantity = this.state.quantity;
      this.baseState.unit = this.state.unit;
      this.props.onClose(updatedFridgeEntry);
    }).catch(e =>
      this.setState({
        updatingInProgress: false,
        updatingError: e
      })
    );

    this.setState({
      updatingInProgress: true,
      updatingError: null
    });
  }

  /** Handles value changes of the forms textfields and validates them */
  textFieldValueChange = (event) => {
    const value = event.target.value;
    let error = value.trim().length === 0;

    this.setState({
      [event.target.id]: value,
      [event.target.id + 'ValidationFailed']: error,
      [event.target.id + 'Edited']: true
    });
  }

  /** Handles the close / cancel button click event */
  handleClose = () => {
    this.setState(this.baseState);
    this.props.onClose(null);
  }

  /** Renders the component */
  render() {
    const { fridgeentry, show } = this.props;
    const { designation, designationValidationFailed, designationEdited, quantity, quantityValidationFailed, quantityEdited, unit, unitValidationFailed, unitEdited, addingInProgress, addingError, updatingInProgress, updatingError } = this.state;

    let title = fridgeentry ? 'Update a fridge entry' : 'Create a new fridge entry';
    let header = fridgeentry ? `Fridge Entry ID: ${fridgeentry.getID()}` : 'Enter fridge entry data';

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
              fridgeentry ?
                <ContextErrorMessage error={updatingError} contextErrorMsg={`The fridge entry ${fridgeentry.getID()} could not be updated.`} onReload={this.updateFridgeEntry} />
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

/** PropTypes */
FridgeEntryForm.propTypes = {
  /** The FridgeEntry to be edited */
  fridgeentry: PropTypes.object,
  /** If true, the form is rendered */
  show: PropTypes.bool.isRequired,
  /**
   * Handler function which is called when the dialog is closed.
   * Sends the edited or created FridgeEntry as parameter or null if cancel was pressed.
   */
  onClose: PropTypes.func.isRequired,
}

export default FridgeEntryForm;
