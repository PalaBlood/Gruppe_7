import React, { useState, useEffect } from 'react';
import { Button, Card, CardContent, CardActions, Typography, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FridgeAPI from '../API/SmartFridgeAPI';
import FridgeEntryForm from './dialogs/FridgeEntryForm';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import FridgeEntryBO from '../API/FridgeEntryBO';
import { getAuth } from 'firebase/auth';

const FridgeEntriesComponent = () => {
    const [fridgeEntries, setFridgeEntries] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [editEntry, setEditEntry] = useState(null);

    useEffect(() => {
        fetchFridgeEntries();
    }, []);

    const fetchFridgeEntries = async () => {
        const auth = getAuth();
        const user = auth.currentUser;
        const fridge_id = await FridgeAPI.getAPI().getFridgeIdByGoogleUserId(user.uid);
        setLoading(true);
        try {
            const entries = await FridgeAPI.getAPI().getFridgeEntriesbyFridgeId(fridge_id.fridge_id);
            const fridgeEntryBOs = FridgeEntryBO.fromJSON(entries);
            setFridgeEntries(fridgeEntryBOs);
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch fridge entries:", error);
            setError(error);
            setLoading(false);
        }
    };

    const handleAddButtonClick = () => {
        setShowAddForm(true);
        setEditEntry(null);
    };

    const handleFormClose = (newEntry) => {
        if (newEntry) {
            fetchFridgeEntries();
        }
        setShowAddForm(false);
    };

    const handleEditButtonClick = (entry) => {
        setShowAddForm(true);
        setEditEntry(entry);
    };

    const handleDeleteButtonClick = async (designation) => {
        try {
            await FridgeAPI.getAPI().deleteFridgeEntry(designation);
            fetchFridgeEntries();
        } catch (error) {
            console.error("Failed to delete fridge entry:", error);
            setError(`Failed to delete entry: ${designation}`);
        }
    };

    if (loading) {
        return <LoadingProgress show={true} />;
    }

    if (error) {
        return <ContextErrorMessage error={error} contextErrorMsg="Failed to load fridge entries." />;
    }

    return (
        <Grid container spacing={2} style={{ padding: 20 }}>
            <Grid item xs={12} style={{ textAlign: 'center' }}>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={handleAddButtonClick}
                >
                    Add Grocery
                </Button>
            </Grid>
            {fridgeEntries.map((entry) => (
                <Grid item xs={12} sm={6} md={4} key={entry.getId()}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5">{entry.getDesignation()}</Typography>
                            <Typography color="textSecondary">
                                Quantity: {entry.getQuantity()} {entry.getUnit()}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" startIcon={<EditIcon />} onClick={() => handleEditButtonClick(entry)}>Edit</Button>
                            <Button size="small" startIcon={<DeleteIcon />} onClick={() => handleDeleteButtonClick(entry.getDesignation())}>Delete</Button>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
            {showAddForm && (
                <FridgeEntryForm
                    show={showAddForm}
                    fridgeentry={editEntry}
                    onClose={handleFormClose}
                />
            )}
        </Grid>
    );
};

export default FridgeEntriesComponent; 

