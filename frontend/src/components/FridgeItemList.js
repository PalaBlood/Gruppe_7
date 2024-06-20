import React, { Component } from 'react';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FridgeAPI from '../API/SmartFridgeAPI';
import FridgeEntryForm from './dialogs/FridgeEntryForm';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import FridgeEntryBO from '../API/FridgeEntryBO';

class FridgeEntriesComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fridgeEntries: [],
            showAddForm: false,
            loading: false,
            error: null
        };
    }

    componentDidMount() {
        this.fetchFridgeEntries();
    }

    fetchFridgeEntries = async () => {
        this.setState({ loading: true });
        try {
            const api = FridgeAPI.getAPI();
            const entries = await api.getFridgeEntries();
            console.log("Fetched entries:", entries); // Debugging
            const fridgeEntryBOs = FridgeEntryBO.fromJSON(entries);
            fridgeEntryBOs.forEach(entry => {
                console.log("Entry designation:", entry.getDesignation()); // Debugging
            });
            this.setState({ fridgeEntries: fridgeEntryBOs, loading: false });
        } catch (error) {
            console.error("Failed to fetch fridge entries:", error);
            this.setState({ error, loading: false });
        }
    };

    handleAddButtonClick = () => {
        this.setState({ showAddForm: true });
    };

    handleFormClose = (newEntry) => {
        if (newEntry) {
            this.fetchFridgeEntries(); // Refresh entries after adding or updating
        }
        this.setState({ showAddForm: false });
    };

    render() {
        const { fridgeEntries, showAddForm, loading, error } = this.state;

        if (loading) {
            return <LoadingProgress show={true} />;
        }

        if (error) {
            return <ContextErrorMessage error={error} contextErrorMsg="Failed to load fridge entries." />;
        }

        return (
            <div>
                <h1>Fridge Entries</h1>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={this.handleAddButtonClick}
                >
                    Add Fridge Entry
                </Button>
                <div>
                    {fridgeEntries.map((entry, index) => (
                        <div key={entry.getId() || index} style={styles.entryBlock}>
                            <h2>{entry.getDesignation()}</h2>
                            <p>Quantity: {entry.getQuantity()} {entry.getUnit()}</p>
                        </div>
                    ))}
                </div>
                <FridgeEntryForm
                    show={showAddForm}
                    onClose={this.handleFormClose}
                />
            </div>
        );
    }
}

const styles = {
    entryBlock: {
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '16px',
        margin: '8px 0',
        backgroundColor: '#f9f9f9'
    }
};

export default FridgeEntriesComponent;
