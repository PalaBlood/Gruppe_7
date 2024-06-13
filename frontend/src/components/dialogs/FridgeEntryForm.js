import React, { Component } from "react";
import PropTypes from "prop-types";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import SmartFridgeAPI from '../../API/SmartFridgeAPI'
import FridgeEntryBO  from '../../API/FridgeEntryBO'; // Korrigierter Importpfad
import ContextErrorMessage from "./ContextErrorMessage";
import LoadingProgress from "./LoadingProgress";

class FridgeEntryForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      grocerie: "",
      quantity: 0,
      unit: "",
      updatingInProgress: false,
      addingError: null,
      updatingError: null
    };

    this.baseState = this.state;

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addFridgeEntry = this.addFridgeEntry.bind(this);
  }

  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  addFridgeEntry() {
    this.setState({ updatingInProgress: true });
    let newFridgeEntry = new FridgeEntryBO(this.state.grocerie, this.state.quantity, this.state.unit);

    SmartFridgeAPI.getAPI().addFridgeEntry(newFridgeEntry).then(entry => {
      this.setState(this.baseState);
      this.props.onClose(entry);
    }).catch(e => {
      this.setState({
        updatingInProgress: false,
        addingError: e
      });
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.addFridgeEntry();
  }

  render() {
    const { open, onClose } = this.props;
    const { grocerie, quantity, unit, updatingInProgress, addingError } = this.state;

    return (
      <Dialog open={open} onClose={() => onClose(null)}>
        <DialogTitle>Add a new Fridge Entry</DialogTitle>
        <DialogContent>
          <form onSubmit={this.handleSubmit}>
            <TextField
              label="Grocerie"
              type="text"
              name="grocerie"
              value={grocerie}
              onChange={this.handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Quantity"
              type="number"
              name="quantity"
              value={quantity}
              onChange={this.handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Unit"
              type="text"
              name="unit"
              value={unit}
              onChange={this.handleInputChange}
              fullWidth
              margin="normal"
            />
            {updatingInProgress && <LoadingProgress />}
            {addingError && <ContextErrorMessage error={addingError} contextErrorMsg="Something went wrong while adding the entry." />}
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onClose(null)} color="secondary">
            Cancel
          </Button>
          <Button onClick={this.handleSubmit} color="primary" disabled={updatingInProgress}>
            Add Entry
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

FridgeEntryForm.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default FridgeEntryForm;
