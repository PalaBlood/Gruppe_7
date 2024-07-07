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
  LinearProgress
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

//Liste der realen Einheiten, die in der SmartFridge App verwendet werden dürfen
const realUnits = ['liters', 'milliliters', 'kilograms', 'grams', 'pieces', 'cups', 'pinch', 'ml', 'l','g', 'kg', 'cl', 'centiliters', 'piece'];

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
      setUnits(fetchedUnits || []); //Es muss sichergestellt werden, dass es sich hier um ein Array handelt
    } catch (error) {
      console.error('Failed to fetch units:', error);
      setUnits([]); //Im Fehlerfall "units" als leere Liste setzen
    }
    setLoading(false);
  };
// Funktion zum Hinzufügen einer neuen Einheit
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
// Funktion zum Löschen einer Einheit
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
// Darstellung der Einheitenliste
  return (
    <Container>
      <Typography variant="h4" gutterBottom style={{ display: 'flex', justifyContent: 'center', textAlign: 'center', border: '1px solid #ccc', borderRadius: '5px', margin: '20px' }}>
        All available units
      </Typography>
      {loading ? (
        <LinearProgress />
      ) : units.length === 0 ? ( //Überprüfung, ob die Liste leer ist, um einen Fehler zu vermeiden, sollten keine Einträge in der DB vorhanden sein. 
        <Typography variant="body1" style={{ textAlign: 'center', marginTop: '20px' }}>
          No units available.
        </Typography>
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
          <Button variant="contained" color="primary" onClick={handleAddUnit} sx={{ width: '150px', height: '40px' }}>
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
