import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FridgeAPI from '../../API/SmartFridgeAPI';
import FridgeEntryBO from '../../API/FridgeEntryBO';
import ContextErrorMessage from './ContextErrorMessage';
import LoadingProgress from './LoadingProgress';
import { getAuth } from 'firebase/auth';

class FridgeEntryForm extends Component {

  constructor(props) {
    super(props);

    let designation = '', quantity = '', unit = '', fridge_id = '';
    if (props.fridgeentry) {
      designation = props.fridgeentry.getDesignation();
      quantity = props.fridgeentry.getQuantity();
      unit = props.fridgeentry.getUnit();
      fridge_id = props.fridgeentry.getFridgeId();
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
      fridge_id: fridge_id,
      addingInProgress: false,
      updatingInProgress: false,
      addingError: null,
      updatingError: null,
      loadingFridgeId: true,
      fridgeIdError: null
    };
    // save this state for canceling
    this.baseState = {...this.state};
  }

  async componentDidMount() {
    await this.handleFetchGoogleUserId();
  }

  handleFetchGoogleUserId = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        console.log('Google User ID:', user.uid);
        const response = await FridgeAPI.getAPI().getFridgeIdByGoogleUserId(user.uid);
        this.setState({ fridge_id: response.fridge_id, loadingFridgeId: false });
      } else {
        console.log('Kein Benutzer ist angemeldet.');
        this.setState({ loadingFridgeId: false });
      }
    } catch (error) {
      console.error('Error while fetching fridge ID:', error);
      this.setState({ fridgeIdError: error.message, loadingFridgeId: false });
    }
  };

  addFridgeEntry = async () => {
    const { designation, quantity, unit, fridge_id } = this.state;

    this.setState({ addingInProgress: true, addingError: null });

    const newFridgeEntry = new FridgeEntryBO(designation, quantity, unit, fridge_id);

    FridgeAPI.getAPI().addFridgeEntry(newFridgeEntry).then(fridgeentry => {
      this.setState({ ...this.baseState });
      this.props.onClose(fridgeentry);
    }).catch(e => {
      console.error('Error while adding fridge entry:', e);
      this.setState({ addingInProgress: false, addingError: e.message });
    });
  }

  updateFridgeEntry = () => {
    const { designation, quantity, unit, fridge_id } = this.state;

    this.setState({ updatingInProgress: true, updatingError: null });

    let updatedFridgeEntry = new FridgeEntryBO({
      id: this.props.fridgeentry.id,
      groceries_designation: designation,
      quantity: quantity,
      unit: unit,
      fridge_id: fridge_id
    });

    FridgeAPI.getAPI().updateFridgeEntry(updatedFridgeEntry).then(fridgeentry => {
      this.setState({ ...this.baseState });
      this.props.onClose(fridgeentry);
    }).catch(e => {
      console.error('Error while updating fridge entry:', e);
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
    const { fridgeentry, show } = this.props;
    const { designation, designationValidationFailed, designationEdited, quantity, quantityValidationFailed, quantityEdited, unit, unitValidationFailed, unitEdited, addingInProgress, addingError, updatingInProgress, updatingError, loadingFridgeId, fridgeIdError } = this.state;

    let title = fridgeentry ? 'Update a fridge entry' : 'Create a new fridge entry';
    let header = fridgeentry ? `Fridge Entry ID: ${fridgeentry.getID()}` : 'Enter fridge entry data';

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
              <TextField type='text' required fullWidth margin='normal' id='unit' label='Unit:' value={unit}
                onChange={this.textFieldValueChange} error={unitValidationFailed}
                helperText={unitValidationFailed ? 'The unit must contain at least one character' : ' '} />
            </form>
            <LoadingProgress show={addingInProgress || updatingInProgress} />
            {
              fridgeentry ?
                <ContextErrorMessage error={updatingError} contextErrorMsg={`The fridge entry ${fr

idgeentry.getID()} could not be updated.`} onReload={this.updateFridgeEntry} />
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