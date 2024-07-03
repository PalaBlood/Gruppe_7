import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FridgeAPI from '../../API/SmartFridgeAPI';
import RecipeBO from '../../API/RecipeBO';
import ContextErrorMessage from './ContextErrorMessage';
import LoadingProgress from './LoadingProgress';
import { getAuth } from 'firebase/auth';

function RecipeForm({ recipeentry, show, onClose }) {
    const [title, setTitle] = useState('');
    const [titleValidationFailed, setTitleValidationFailed] = useState(false);
    const [titleEdited, setTitleEdited] = useState(false);
    const [numberOfPersons, setNumberOfPersons] = useState('');
    const [numberOfPersonsValidationFailed, setNumberOfPersonsValidationFailed] = useState(false);
    const [numberOfPersonsEdited, setNumberOfPersonsEdited] = useState(false);
    const [creator, setCreator] = useState('');
    const [description, setDescription] = useState('');
    const [descriptionValidationFailed, setDescriptionValidationFailed] = useState(false);
    const [descriptionEdited, setDescriptionEdited] = useState(false);
    const [householdId, setHouseholdId] = useState('');
    const [addingInProgress, setAddingInProgress] = useState(false);
    const [updatingInProgress, setUpdatingInProgress] = useState(false);
    const [addingError, setAddingError] = useState(null);
    const [updatingError, setUpdatingError] = useState(null);
    const [loadingHouseholdId, setLoadingHouseholdId] = useState(true);
    const [householdIdError, setHouseholdIdError] = useState(null);

    
    useEffect(() => {
        if (recipeentry) {
            setTitle(recipeentry.getTitle());
            setNumberOfPersons(recipeentry.getNumberOfPersons());
            setCreator(recipeentry.getCreator());
            setDescription(recipeentry.getDescription());
            setHouseholdId(recipeentry.getHouseholdId());
        }
        handleFetchGoogleUserId();
    }, [recipeentry]);



    const handleFetchGoogleUserId = async () => {
        try {
            const auth = getAuth();
            const user = auth.currentUser;
            if (user) {
                const response = await FridgeAPI.getAPI().getHouseholdIdByGoogleUserId(user.uid);
                setCreator(user.uid);
                setHouseholdId(response.household_id);
                setLoadingHouseholdId(false);
            } else {
                setLoadingHouseholdId(false);
            }
        } catch (error) {
            setHouseholdIdError(error.message);
            setLoadingHouseholdId(false);
        }
    };



    const addRecipe = async () => {
        setAddingInProgress(true);
        setAddingError(null);
        const newRecipe = new RecipeBO(title, creator, numberOfPersons, description, householdId);

        try {
            const recipe = await FridgeAPI.getAPI().addRecipe(newRecipe);
            onClose(recipe);
        } catch (e) {
            setAddingError({ message: e.message });
        } finally {
            setAddingInProgress(false);
        }
    };



    const updateRecipe = async () => {
        setUpdatingInProgress(true);
        setUpdatingError(null);
        const updatedRecipe = new RecipeBO(title, creator, numberOfPersons, description, householdId);
        updatedRecipe.setId(recipeentry.getId());

        try {
            const recipe = await FridgeAPI.getAPI().updateRecipe(updatedRecipe);
            onClose(recipe);
        } catch (e) {
            setUpdatingError({ message: e.message });
        } finally {
            setUpdatingInProgress(false);
        }
    };




    const textFieldValueChange = (event) => {
        //Sorgt dafür, dass falsche Eingaben vom User erkannt werden
        const { id, value } = event.target;
        const trimmedValue = value.trim();
        const isEdited = trimmedValue.length > 0;

        switch (id) {
            case 'title':
                setTitle(value);
                setTitleValidationFailed(trimmedValue.length === 0);//False wenn keine Eingabe gemacht wurde
                setTitleEdited(isEdited);
                break;
            case 'numberOfPersons':
                setNumberOfPersons(value);
                setNumberOfPersonsValidationFailed(isNaN(value) || trimmedValue.length === 0); //Falsch, wenn es nicht um keinen numierschen Wert oder kein Eintrag gemacht wurde
                setNumberOfPersonsEdited(isEdited);
                break;
            case 'description':
                setDescription(value);
                setDescriptionValidationFailed(trimmedValue.length === 0); //usw. 
                setDescriptionEdited(isEdited);
                break;
            default:
                break;
        }
    };



    const handleClose = () => {
        onClose(null);
    };



    const komponent_title = recipeentry ? 'Bearbeite ein Rezept' : 'Füge ein neues Rezept hinzu';
    const header = recipeentry ? `Reuept ID: ${recipeentry.getId()}` : 'Gebe deine Rezeptdaten ein ';

    if (loadingHouseholdId) {
        return <LoadingProgress show />;
    }

    if (householdIdError) {
        return <ContextErrorMessage error={householdIdError} contextErrorMsg={`Error fetching household ID`} />;
    }

    return (
        show ? (
            <Dialog open={show} onClose={handleClose} maxWidth='xs'>
                <DialogTitle id='form-dialog-title'>{komponent_title}
                    <IconButton sx={{ position: 'absolute', right: 1, top: 1, color: 'grey[500]' }} onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>{header}</DialogContentText>
                    <form sx={{ width: '100%' }} noValidate autoComplete='off'>
                        <TextField autoFocus type='text' required fullWidth margin='normal' id='title' label='Titel:' value={title}
                            onChange={textFieldValueChange} error={titleValidationFailed}
                            helperText={titleValidationFailed ? 'Der Titel muss mindestens einen Buchstaben enthalten' : ' '} />
                        <TextField type='number' required fullWidth margin='normal' id='numberOfPersons' label='Anzahl der Personen:' value={numberOfPersons}
                            onChange={textFieldValueChange} error={numberOfPersonsValidationFailed}
                            helperText={numberOfPersonsValidationFailed ? 'Die Anzahl muss eine Zahl sein' : ' '} />
                        <TextField type='text' required fullWidth margin='normal' id='description' label='Beschreibung:' value={description}
                            onChange={textFieldValueChange} error={descriptionValidationFailed}
                            helperText={descriptionValidationFailed ? 'Die Beschreibung muss mindestens einen Buchstaben enthalten' : ' '} />
                    </form>
                    <LoadingProgress show={addingInProgress || updatingInProgress} />
                    {
                        recipeentry ?
                            <ContextErrorMessage error={updatingError} contextErrorMsg={`Das Rezept ${recipeentry.getId()} konnte nicht aktualisiert werden.`} onReload={updateRecipe} />
                            :
                            <ContextErrorMessage error={addingError} contextErrorMsg={`Das Rezept konnte nicht hinzugefügt werden.`} onReload={addRecipe} />
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color='secondary'>Abbrechen</Button>
                    {
                        recipeentry ?
                            <Button disabled={titleValidationFailed || numberOfPersonsValidationFailed || descriptionValidationFailed} variant='contained' onClick={updateRecipe} color='primary'>Aktualisieren</Button>
                            :
                            <Button disabled={titleValidationFailed || !titleEdited || numberOfPersonsValidationFailed || !numberOfPersonsEdited || descriptionValidationFailed || !descriptionEdited} variant='contained' onClick={addRecipe} color='primary'>Hinzufügen</Button>
                    }
                </DialogActions>
            </Dialog>
        ) : null
    );
}

RecipeForm.propTypes = {
    recipeentry: PropTypes.object,
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default RecipeForm;
