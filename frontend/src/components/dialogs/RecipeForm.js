import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FridgeAPI from '../../API/SmartFridgeAPI';
import RecipeBO from '../../API/RecipeBO';
import ContextErrorMessage from './ContextErrorMessage';
import LoadingProgress from './LoadingProgress';
import { getAuth } from 'firebase/auth';

class RecipeForm extends Component {
    constructor(props) {
        super(props);

        let title = '', numberOfPersons = '', creator = '', description = '', householdId = '';
        
        if (props.recipeentry) { // Wird aufgerufen, falls ein bestehender Eintrag editiert wird.
            title = props.recipeentry.getTitle();
            numberOfPersons = props.recipeentry.getNumberOfPersons();
            creator = props.recipeentry.getCreator();
            description = props.recipeentry.getDescription();
            householdId = props.recipeentry.getHouseholdId();
        }

        this.state = {
            title: title,
            titleValidationFailed: false,
            titleEdited: false,
            numberOfPersons: numberOfPersons,
            numberOfPersonsValidationFailed: false,
            numberOfPersonsEdited: false,
            creator: creator,
            description: description,
            descriptionValidationFailed: false,
            descriptionEdited: false,
            householdId: householdId,
            addingInProgress: false,
            updatingInProgress: false,
            addingError: null,
            updatingError: null,
            loadingHouseholdId: true,
            householdIdError: null
        };

        this.baseState = { ...this.state };
    }

    async componentDidMount() {
        await this.handleFetchGoogleUserId();
    }

    handleFetchGoogleUserId = async () => {
        /*Google Id wird ausgelesen und anhand dieser wird die household_id ausgelesen
        und in der DB als attribut in recipe_groceries gespeichert. Das Attribut 'creator' 
        erhält die google_user_id*/
        try {
            const auth = getAuth(); 
            const user = auth.currentUser; //beinhaltet informationen über den aktuellen User
            if (user) {
                console.log('Google User ID:', user.uid);//debuggen
                const response = await FridgeAPI.getAPI().getHouseholdIdByGoogleUserId(user.uid); //übergibt dei google Id 
                console.log(response)//debuggen
                this.setState({ creator: user.uid, householdId: response.household_id, loadingHouseholdId: false });
            } else {
                console.log('Kein Benutzer ist angemeldet.');
                this.setState({ loadingHouseholdId: false });
            }
        } catch (error) {
            console.error('Error while fetching household ID:', error);
            this.setState({ householdIdError: error.message, loadingHouseholdId: false });
        }
    };

    addRecipe = async () => {
        const { title,  creator, numberOfPersons, description, householdId } = this.state;

        this.setState({ addingInProgress: true, addingError: null });

        const newRecipe = new RecipeBO(title, creator, numberOfPersons, description, householdId); //RecipeBo umschreiben und hier dann Setter verwenden

        FridgeAPI.getAPI().addRecipe(newRecipe).then(recipe => {
            this.setState({ ...this.baseState });
            this.props.onClose(recipe);
        }).catch(e => {
            console.error('Error while adding recipe:', e);
            this.setState({ addingInProgress: false, addingError: { message: e.message } });
        });
    };

    updateRecipe = async () => {
        const { title, numberOfPersons, creator, description, householdId } = this.state;

        this.setState({ updatingInProgress: true, updatingError: null });

        const updatedRecipe = new RecipeBO(title, numberOfPersons, creator, description, householdId);
        updatedRecipe.setId(this.props.recipeentry.getId());

        FridgeAPI.getAPI().updateRecipe(updatedRecipe).then(recipe => {
            this.setState({ ...this.baseState });
            this.props.onClose(recipe);
        }).catch(e => {
            console.error('Error while updating recipe:', e);
            this.setState({ updatingInProgress: false, updatingError: { message: e.message } });
        });
    };

    textFieldValueChange = (event) => {
        const value = event.target.value;
        let error = value.trim().length === 0;

        this.setState({
            [event.target.id]: value,
            [event.target.id + 'ValidationFailed']: error,
            [event.target.id + 'Edited']: true
        });
    };

    handleClose = () => {
        this.setState(this.baseState);
        this.props.onClose(null);
    };

    render() {
        const { recipe, show } = this.props;
        const { title, titleValidationFailed, titleEdited, numberOfPersons, numberOfPersonsValidationFailed, numberOfPersonsEdited, description, descriptionValidationFailed, descriptionEdited, addingInProgress, addingError, updatingInProgress, updatingError, loadingHouseholdId, householdIdError } = this.state;

        let komponent_title = recipe ? 'Update a Recipe' : 'Create a new Recipe';
        let header = recipe ? `Recipe ID: ${recipe.getId()}` : 'Enter Recipe Data';

        if (loadingHouseholdId) {
            return <LoadingProgress show />;
        }

        if (householdIdError) {
            return <ContextErrorMessage error={householdIdError} contextErrorMsg={`Error fetching household ID`} />;
        }

        return (
            show ? (
                <Dialog open={show} onClose={this.handleClose} maxWidth='xs'>
                    <DialogTitle id='form-dialog-title'>{komponent_title}
                        <IconButton sx={{ position: 'absolute', right: 1, top: 1, color: 'grey[500]' }} onClick={this.handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>{header}</DialogContentText>
                        <form sx={{ width: '100%' }} noValidate autoComplete='off'>
                            <TextField autoFocus type='text' required fullWidth margin='normal' id='title' label='Title:' value={title}
                                onChange={this.textFieldValueChange} error={titleValidationFailed}
                                helperText={titleValidationFailed ? 'The title must contain at least one character' : ' '} />
                            <TextField type='number' required fullWidth margin='normal' id='numberOfPersons' label='Number of Persons:' value={numberOfPersons}
                                onChange={this.textFieldValueChange} error={numberOfPersonsValidationFailed}
                                helperText={numberOfPersonsValidationFailed ? 'The number of persons must be a valid number' : ' '} />
                            <TextField type='text' required fullWidth margin='normal' id='description' label='Description:' value={description}
                                onChange={this.textFieldValueChange} error={descriptionValidationFailed}
                                helperText={descriptionValidationFailed ? 'The description must contain at least one character' : ' '} />
                        </form>
                        <LoadingProgress show={addingInProgress || updatingInProgress} />
                        {
                            recipe ?
                                <ContextErrorMessage error={updatingError} contextErrorMsg={`The recipe ${recipe.getId()} could not be updated.`} onReload={this.updateRecipe} />
                                :
                                <ContextErrorMessage error={addingError} contextErrorMsg={`The recipe could not be added.`} onReload={this.addRecipe} />
                        }
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color='secondary'>Cancel</Button>
                        {
                            recipe ?
                                <Button disabled={titleValidationFailed || numberOfPersonsValidationFailed || descriptionValidationFailed} variant='contained' onClick={this.updateRecipe} color='primary'>Update</Button>
                                :
                                <Button disabled={titleValidationFailed || !titleEdited || numberOfPersonsValidationFailed || !numberOfPersonsEdited || descriptionValidationFailed || !descriptionEdited} variant='contained' onClick={this.addRecipe} color='primary'>Add</Button>
                        }
                    </DialogActions>
                </Dialog>
            ) : null
        );
    }
}

RecipeForm.propTypes = {
    recipeentry: PropTypes.object,
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default RecipeForm;
