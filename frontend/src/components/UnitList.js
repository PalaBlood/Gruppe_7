import React, { useState, useEffect } from 'react';
import FridgeAPI from '../API/SmartFridgeAPI';
import UnitBO from '../API/Unit';
import { getAuth } from 'firebase/auth';
import {
  Container,
  Typography,
  Box,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Snackbar,
  Alert,
  LinearProgress,
  Card
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const realUnits = ['liters', 'milliliters', 'kilogram', 'grams', 'pieces', 'cups', 'pinch'];

const UnitList = ({ householdId }) => {
  const [units, setUnits] = useState([]);
  const [newUnit, setNewUnit] = useState('');
  const [error, setError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUnits();
  }, []);

  const fetchUnits = async () => {
    setLoading(true);
    const auth = getAuth();
    const currentUser = auth.currentUser;
    const household_id = await FridgeAPI.getAPI().getHouseholdIdByGoogleUserId(currentUser.uid);
    try {
      const fetchedUnits = await FridgeAPI.getAPI().getUnitbyHouseholdId(household_id.household_id);
      setUnits(fetchedUnits);
    } catch (error) {
      console.error('Failed to fetch units:', error);
    }
    setLoading(false);
  };

  const handleAddUnit = async () => {
    if (!realUnits.includes(newUnit.toLowerCase())) {
      setError('Invalid unit. Please type in a real world Unit.');
      return;
    }

    const auth = getAuth();
    const currentUser = auth.currentUser;
    try {
      const household_id = await FridgeAPI.getAPI().getHouseholdIdByGoogleUserId(currentUser.uid);
      const unitBO = new UnitBO(newUnit, household_id.household_id);
      console.log(unitBO);

      await FridgeAPI.getAPI().addUnit(unitBO);
      fetchUnits();
      setNewUnit('');
      setError('');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Failed to add unit:', error);
      setError('Failed to add unit');
    }
  };

  const handleDeleteUnit = async (unitId) => {
    try {
      await FridgeAPI.getAPI().deleteUnit(unitId);
      fetchUnits();
    } catch (error) {
      console.error('Failed to delete unit:', error);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom style={{textAlign:'center', border: '1px solid #ccc', borderRadius: '5px', margin: '20px'}}>
        All available Units
      </Typography>
      {loading ? (
        <LinearProgress />
      ) : (
        <List>
          {units.map((unit) => (
            <ListItem style={{ border: '1px solid #ccc', borderRadius: '5px', marginBottom: '5px' }}
              key={unit.id}
              secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteUnit(unit.id)}>
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText primary={unit.designation} />
            </ListItem>
          ))}
        </List>
      )}
      <Box mt={4}>
        <Typography variant="h5" gutterBottom>
          Add Unit
        </Typography>
        <TextField
          label="New Unit"
          value={newUnit}
          onChange={(e) => setNewUnit(e.target.value)}
          fullWidth
          variant="outlined"
        />
        <Box mt={2}>
          <Button variant="contained" color="primary" onClick={handleAddUnit}>
            Add
          </Button>
        </Box>
        {error && (
          <Box mt={2}>
            <Alert severity="error">{error}</Alert>
          </Box>
        )}
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Unit added successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default UnitList;
