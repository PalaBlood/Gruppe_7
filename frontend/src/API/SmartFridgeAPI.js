import UserBO from "./UserBO";
import FoodEntry from "./FoodEntry";
import RecipeBO from "./RecipeBO";
import RecipeEntryBO from "./RecipeEntryBO";
import FridgeEntryBO from "./FridgeEntryBO";
import HouseholdBO from "./HouseholdBO";
import FridgeBO from "./FridgeBO";


class FridgeAPI {

    static #api = null

    //python backend --> main.py, müssen wir noch reinschreiben, erzeugt sicherheit



    /**
     * Da sich der Präfix häufig mal ändern kann, setzen wir hier einen Fest
     * und setzen diese für jede Methode unten ein. 
     * 
     * Ebenfalls müssen wir nicht jedes mal bei jeder FetchAdvanded-Methode die URl Übergeben, sondern
     * z.B. getFridgeEntriesURL
     */
    #fridgeserverbaseurl = 'http://127.0.0.1:5000/fridge';


    // FridgeEntry related
    #getFridgeEntriesURL = () => `${this.#fridgeserverbaseurl}/FridgeEntries`;
    #addFridgeEntryURL = () => `${this.#fridgeserverbaseurl}/FridgeEntries`;
    #getFridgeEntryURL = (groceries_designation) => `${this.#fridgeserverbaseurl}/FridgeEntry/${groceries_designation}`;
    #updateFridgeEntryURL = (groceries_designation) => `${this.#fridgeserverbaseurl}/FridgeEntry/${groceries_designation}`;
    #deleteFridgeEntryURL = (groceries_designation) => `${this.#fridgeserverbaseurl}/FridgeEntry/${groceries_designation}`;


    // RecipeEntry related
    #getRecipeEntriesURL = () => `${this.#fridgeserverbaseurl}/RecipeEntries`;
    #addRecipeEntryURL = () => `${this.#fridgeserverbaseurl}/RecipeEntries`;
    #getRecipeEntryURL = (groceries_designation) => `${this.#fridgeserverbaseurl}/RecipeEntry/${groceries_designation}`;
    #updateRecipeEntryURL = (groceries_designation) => `${this.#fridgeserverbaseurl}/RecipeEntry/${groceries_designation}`;
    #deleteRecipeEntryURL = (groceries_designation) => `${this.#fridgeserverbaseurl}/RecipeEntry/${groceries_designation}`;
    

    // Fridge related
    #getFridgesURL = () => `${this.#fridgeserverbaseurl}/Fridge`;
    #addFridgeURL = () => `${this.#fridgeserverbaseurl}/Fridge`;
    

    //user related
    #getUsersURL = () => `${this.#fridgeserverbaseurl}/users`;
    #addUserURL = () => `${this.#fridgeserverbaseurl}/users`;
    #getUserURL = (id) => `${this.#fridgeserverbaseurl}/users/${id}`;
    #updateUserURL = (id) => `${this.#fridgeserverbaseurl}/users/${id}`;
    #deleteUserURL = (id) =>  `${this.#fridgeserverbaseurl}/users/${id}`;
    #searchUserURL = (nick_name) => `${this.#fridgeserverbaseurl}/users/${nick_name}`;
    #searchUserbygoogleIDURL = (google_id) => `${this.#fridgeserverbaseurl}/user-by-google-id/${google_id}`;


    // Recipe related
    #getRecipesURL = () => `${this.#fridgeserverbaseurl}/RecipeList`;
    #addRecipeURL = () => `${this.#fridgeserverbaseurl}/RecipeList`;
    #getRecipeURL = (id) => `${this.#fridgeserverbaseurl}/Recipe/${id}`;
    #updateRecipeURL = (id) => `${this.#fridgeserverbaseurl}/Recipe/${id}`;
    #deleteRecipeURL = (id) => `${this.#fridgeserverbaseurl}/Recipe/${id}`;


    // Household related
    #getHouseholdsURL = () => `${this.#fridgeserverbaseurl}/Household`;
    #addHouseholdURL = () => `${this.#fridgeserverbaseurl}/Household`;
    #getHouseholdURL = (id) => `${this.#fridgeserverbaseurl}/Household/${id}`;
    #updateHouseholdURL = (id) => `${this.#fridgeserverbaseurl}/Household/${id}`;
    #deleteHouseholdURL = (id) => `${this.#fridgeserverbaseurl}/Household/${id}`;


    //COOKING A RECIPE: subsctracts the associated ingredients from fridge entries
    #cookfunctionurl = (recipe_title) => `${this.#fridgeserverbaseurl}/COOK/${recipe_title}`;

    static getAPI() {
        if (this.#api == null) {
            this.#api = new FridgeAPI();
        }
        return this.#api
    }

    #fetchAdvanced = (url, init) => fetch(url, init)
        .then(res => {
            if(!res.ok) {
                throw Error(`${res.status} ${res.statusText}`);
            }
            return res.json();
        }
        )

    getUsers() {
        return this.#fetchAdvanced(this.#getUsersURL()).then((responseJSON) => {
            let userBOs = UserBO.fromJSON(responseJSON);
            return new Promise(function(resolve) {
                resolve(userBOs);
            })
        })    
    }
    getHouseholds() {
        return this.#fetchAdvanced(this.#getHouseholdsURL()).then((responseJSON) => {
            let householdBOs = HouseholdBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(householdBOs);
            })
        })
    }

    getFridgeEntries() {
        return this.#fetchAdvanced(this.#getFridgeEntriesURL()).then((responseJSON) => {
            let fridgentryBOs = FridgeEntryBO.fromJSON(responseJSON);
            return new Promise(function(resolve) {
                resolve(fridgentryBOs);
            })
        })
    }

    getRecipeEntries() {
        return this.#fetchAdvanced(this.#getRecipeEntriesURL()).then((responseJSON) => {
            let recipeentryBOs = RecipeEntryBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(recipeentryBOs);
            })
        })
    }

    getRecipes() {
        return this.#fetchAdvanced(this.#getRecipesURL()).then((responseJSON) => {
            let recipeBOs = RecipeBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(recipeBOs);
            })
        })
    }

    getFridges() {
        return this.#fetchAdvanced(this.#getFridgesURL()).then((responseJSON) => {
            let fridgesBOs = FridgeBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(fridgesBOs);
            })
        })
    }
    getUserbyId(id) {
        return this.#fetchAdvanced(this.#getUserURL(id)).then((responseJSON) => {
            let userBO = UserBO.fromJSON(responseJSON);
            return new Promise(function(resolve) {
                resolve(userBO)
            })
        }
    )
    }

    getUserbyGoogleUserId(google_user_id) {
        return this.#fetchAdvanced(this.#searchUserbygoogleIDURL(google_user_id)).then((responseJSON) => {
            let userBO = UserBO.fromJSON(responseJSON);
            return new Promise(function(resolve) {
                resolve(userBO)
            })
        })
    }

    getUserbyNickname(nick_name) {
        return this.#fetchAdvanced(this.#searchUserURL(nick_name)).then((responsejSON) => {
            let userBO = UserBO.fromJSON(responsejSON);
            return new Promise(function(resolve) {
                resolve(userBO)
            })
        })
    }
    //fetched alle user eines bestimmten haushaltes
    getUsersbyHouseholdID(id) {
        return this.#fetchAdvanced(this.#getHouseholdURL(id)).then((responseJSON) => {
            let householdBO = HouseholdBO.fromJSON(responseJSON);
            return new Promise(function(resolve) {
                resolve(householdBO);
            });
        });
    }

    getRecipeByID(id) {
        return this.#fetchAdvanced(this.#getRecipeURL(id)).then((responseJSON) => {
            let recipeBO = RecipeBO.fromJSON(responseJSON);
            return new Promise(function(resolve) {
                resolve(recipeBO);
            });
        });
    }

    getRecipeEntriesByGroceriesDesignation(groceries_designation) {
        return this.#fetchAdvanced(this.#getRecipeEntryURL(groceries_designation)).then((responseJSON) => {
            let recipeEntryBO = RecipeEntryBO.fromJSON(responseJSON);
            return new Promise(function(resolve) {
                resolve(recipeEntryBO);
            });
        });
    }

    getFridgeEntriesByGroceriesDesignation(groceries_designation) {
        return this.#fetchAdvanced(this.#getFridgeEntryURL(groceries_designation)).then((responseJSON) => {
            let fridgeEntryBO = FridgeEntryBO.fromJSON(responseJSON);
            return new Promise(function(resolve) {
                resolve(fridgeEntryBO);
            });
        });
    }
    
    
    addUser(userBO) {
        return this.#fetchAdvanced(this.#addUserURL(), {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type':'application/json',
            },
            body: JSON.stringify(userBO)
        }).then((responseJSON) => {
            let responseUserBO = UserBO.fromJSON(responseJSON)[0];

            return new Promise(function (resolve) {
                resolve(responseUserBO);
            })
        })
    }

    
    addFridgeEntry(fridgeEntryBO) {
        return this.#fetchAdvanced(this.#addFridgeEntryURL(), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(fridgeEntryBO)
        }).then(responseJSON => {
            return FridgeEntryBO.fromJSON(responseJSON)[0];
        });
    }


    addRecipeEntry(recipeEntryBO) {
        return this.#fetchAdvanced(this.#addRecipeEntryURL(), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(recipeEntryBO)
        }).then(responseJSON => {
            return RecipeEntryBO.fromJSON(responseJSON)[0];
        });
    }


    addRecipe(recipeBO) {
        return this.#fetchAdvanced(this.#addRecipeURL(), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(recipeBO)
        }).then(responseJSON => {
            return RecipeBO.fromJSON(responseJSON)[0];
        });
    }


    addHousehold(householdBO) {
        return this.#fetchAdvanced(this.#addHouseholdURL(), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(householdBO)
        }).then(responseJSON => {
            return HouseholdBO.fromJSON(responseJSON)[0];
        });
    }


    addFridge(fridgeBO) {
        return this.#fetchAdvanced(this.#addFridgeURL(), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(fridgeBO)
        }).then(responseJSON => {
            return FridgeBO.fromJSON(responseJSON)[0];
        });
    }

    updateUser(userBO) {
        return this.#fetchAdvanced(this.#updateUserURL(userBO.getID()), {
            method:'PUT',
            headers: {
                'Accept':'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(userBO)
        }).then((responseJSON) => {
            let responseUserBO = UserBO.fromJSON(responseJSON)[0];
        return new Promise(function(resolve) {
            resolve(responseUserBO);
        })
    })
    }

    deleteUser(UserID) {
        return this.#fetchAdvanced(this.#deleteUserURL(UserID), {
            method:'DELETE'

        }).then((responseJSON) => {

            let responseUserBO = UserBO.fromJSON(responseJSON)[0];

            return new Promise(function(resolve){
                resolve(responseUserBO);
            })
        })
    }

    updateFridgeEntry(fridgeEntryBO) {
        return this.#fetchAdvanced(this.#updateFridgeEntryURL(fridgeEntryBO.getGroceriesDesignation()), {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(fridgeEntryBO)
        }).then(responseJSON => FridgeEntryBO.fromJSON(responseJSON)[0]);
    }
    
    deleteFridgeEntry(groceriesDesignation) {
        return this.#fetchAdvanced(this.#deleteFridgeEntryURL(groceriesDesignation), {
            method: 'DELETE'
        }).then(() => ({ message: "Fridge entry deleted successfully", groceriesDesignation }));
    }

    updateRecipe(recipeBO) {
        return this.#fetchAdvanced(this.#updateRecipeURL(recipeBO.getId()), {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(recipeBO)
        }).then(responseJSON => RecipeBO.fromJSON(responseJSON)[0]);
    }
    
    deleteRecipe(id) {
        return this.#fetchAdvanced(this.#deleteRecipeURL(id), {
            method: 'DELETE'
        }).then(() => ({ message: "Recipe deleted successfully", id }));
    }
    
    updateHousehold(householdBO) {
        return this.#fetchAdvanced(this.#updateHouseholdURL(householdBO.getId()), {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(householdBO)
        }).then(responseJSON => HouseholdBO.fromJSON(responseJSON)[0]);
    }
    
    deleteHousehold(id) {
        return this.#fetchAdvanced(this.#deleteHouseholdURL(id), {
            method: 'DELETE'
        }).then(() => ({ message: "Household deleted successfully", id }));
    }
    
    updateRecipeEntry(recipeEntryBO) {
        return this.#fetchAdvanced(this.#updateRecipeEntryURL(recipeEntryBO.getGroceriesDesignation()), {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(recipeEntryBO)
        }).then(responseJSON => {
            return RecipeEntryBO.fromJSON(responseJSON)[0];
        }).catch(error => {
            console.error('Failed to update recipe entry:', recipeEntryBO, error);
            throw new Error('Error updating recipe entry');
        });
    }

    deleteRecipeEntry(groceriesDesignation) {
        return this.#fetchAdvanced(this.#deleteRecipeEntryURL(groceriesDesignation), {
            method: 'DELETE'
        }).then(() => ({ message: "Recipe entry deleted successfully", groceriesDesignation }))
        .catch(error => {
            console.error('Failed to delete recipe entry:', groceriesDesignation, error);
            throw new Error('Error deleting recipe entry');
        });
    }

    cookRecipe(recipe_title) {
        return this.#fetchAdvanced(this.#cookfunctionurl(recipe_title), {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
        }).then((responseJSON => {
            return responseJSON;
        }))
    }
    
    

}


export default FridgeAPI;



//API TESTEN


