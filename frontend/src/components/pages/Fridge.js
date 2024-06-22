/*import React, { Component } from 'react';
import SmartFridgeAPI from '../../API/SmartFridgeAPI';
import FridgeEntryForm from '../dialogs/FridgeEntryForm';

class Fridge extends Component {
  state = {
    showForm: false,
    fridgeEntry: null,
  };

  handleOpenForm = () => {
    //ladet die Komponente FridgeEntryForm
    this.setState({ showForm: true });
  };

  handleCloseForm = (entry) => {
    //schließt die Komponente FridgeEntry Form
    if (entry) {
      console.log('Entry saved:', entry);
    }
    this.setState({ showForm: false, fridgeEntry: null });
  };

  render() {
    const { showForm, fridgeEntry } = this.state;

    return (
      <div>
        <button onClick={this.handleOpenForm}>Füge ein Lebensmittel hinzu</button>
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

export default Fridge;*/
