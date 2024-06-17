import React, { Component } from 'react';
import SmartFridgeAPI from '../../API/SmartFridgeAPI';
import FridgeEntryForm from '../dialogs/FridgeEntryForm';

class Test extends Component {
  state = {
    showForm: false,
    fridgeEntry: null,
  };

  handleOpenForm = () => {
    this.setState({ showForm: true });
  };

  handleCloseForm = (entry) => {
    if (entry) {
      // Process the entry
      console.log('Entry saved:', entry);
    }
    this.setState({ showForm: false, fridgeEntry: null });
  };

  render() {
    const { showForm, fridgeEntry } = this.state;

    return (
      <div>
        <button onClick={this.handleOpenForm}>Add Fridge Entry</button>
        {showForm && (
          <FridgeEntryForm
            show={showForm}
            fridgeentry={fridgeEntry}
            onClose={this.handleCloseForm}
          />
        )}
      </div>
    );
  }
}

export default Test;
