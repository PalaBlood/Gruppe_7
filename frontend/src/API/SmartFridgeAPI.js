import UserBO from "./UserBO";
import FoodEntry from "./FoodEntry";
import RecipeBO from "./RecipeBO";
import RecipeEntryBO from "./RecipeEntryBO";
import FridgeEntryBO from "./FridgeEntryBO";
import HouseholdBO from "./HouseholdBO";
import FridgeBO from "./FridgeBO";
import UnitBO from "./Unit";
import { json } from "react-router-dom";


class FridgeAPI {

    //Singleton pattern
    static #api = null

    //python backend --> main.py, müssen wir noch reinschreiben, erzeugt sicherheit



    /**
     * Da sich der Präfix häufig mal ändern kann, setzen wir hier einen Fest
     * und setzen diese für jede Methode unten ein. 
     * 
     * Ebenfalls müssen wir nicht jedes mal bei jeder FetchAdvanded-Methode die URl Übergeben, sondern
     * z.B. getFridgeEntriesURL
     */

    /**  */
    #fridgeserverbaseurl = '/fridge';

    //Hier werden die URL's für die verschiedenen Methoden definiert
    // FridgeEntry related
    #getFridgeEntriesURL = () => `${this.#fridgeserverbaseurl}/FridgeEntries`;
    #addFridgeEntryURL = () => `${this.#fridgeserverbaseurl}/FridgeEntries`;
    #getFridgeEntryURL = (groceries_designation) => `${this.#fridgeserverbaseurl}/FridgeEntry/${groceries_designation}`;
    #updateFridgeEntryURL = (groceries_designation) => `${this.#fridgeserverbaseurl}/FridgeEntry/${groceries_designation}`;
    #deleteFridgeEntryURL = (groceries_designation) => `${this.#fridgeserverbaseurl}/FridgeEntry/${groceries_designation}`;
    #getFridgeEntriesbyFridgeID = (fridge_id) => `${this.#fridgeserverbaseurl}/FridgeEntries/${fridge_id}`;



    // RecipeEntry related
    #getRecipeEntriesURL = () => `${this.#fridgeserverbaseurl}/RecipeEntries`;
    #addRecipeEntryURL = () => `${this.#fridgeserverbaseurl}/RecipeEntries`;
    #getRecipeEntryURL = (groceries_designation) => `${this.#fridgeserverbaseurl}/RecipeEntry/${groceries_designation}`;
    #getRecipeEntriesByRecipeIdURL = (recipe_id) => `${this.#fridgeserverbaseurl}/RecipeEntries/${recipe_id}`;
    #updateRecipeEntryURL = (groceries_designation, recipe_id) => `${this.#fridgeserverbaseurl}/RecipeEntry/${groceries_designation}/${recipe_id}`;
    #deleteRecipeEntryURL = (groceries_designation, recipe_id) => `${this.#fridgeserverbaseurl}/RecipeEntry/${groceries_designation}/${recipe_id}`;
    
    

    // Fridge related
    #getFridgesURL = () => `${this.#fridgeserverbaseurl}/Fridge`;
    #addFridgeURL = () => `${this.#fridgeserverbaseurl}/Fridge`;
    #getFridgeIdByGoogleUserIdURL = (google_user_id) => `${this.#fridgeserverbaseurl}/fridge-id-by-google-id/${google_user_id}`;


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
    #getHouseholdIdByGoogleUserIdURL = (google_user_id) => `${this.#fridgeserverbaseurl}/household-id-by-google-id/${google_user_id}`;
    #getRecipesbyhouseholdIdURL = (household_id) => `${this.#fridgeserverbaseurl}/RecipeList/${household_id}`;


    // Household related
    #getHouseholdsURL = () => `${this.#fridgeserverbaseurl}/Household`;
    #addHouseholdURL = () => `${this.#fridgeserverbaseurl}/Household`;
    #getHouseholdUsersbyIDURL = (id) => `${this.#fridgeserverbaseurl}/Household/${id}`;
    #getHouseholdbyIDURl = (id) => `${this.#fridgeserverbaseurl}/HouseholdbyID/${id}`
    #updateHouseholdURL = (id) => `${this.#fridgeserverbaseurl}/Household/${id}`;
    #deleteHouseholdURL = (id) => `${this.#fridgeserverbaseurl}/Household/${id}`;

    //Unit related
    #getUnitsbyIdURL = (id) => `${this.#fridgeserverbaseurl}/Unit/${id}`;
    #deleteUnitURL = (id) => `${this.#fridgeserverbaseurl}/Unit/${id}`;
    #getUnitsbyIdandDesignationURL = (id, designation) => `${this.#fridgeserverbaseurl}/Unit}/${designation}/${id}`;
    #addUnitURL = () => `${this.#fridgeserverbaseurl}/Unit`;

    //Hier wird die URL für die Cook Funktion definiert
    #cookfunctionurl = (recipe_title) => `${this.#fridgeserverbaseurl}/COOK/${recipe_title}`;
    // getAPI Methode, um Singleton Pattern zu gewährleisten
    static getAPI() {
        if (this.#api == null) {
            this.#api = new FridgeAPI();
        }
        return this.#api
    }
    //fetchAdvanced Methode, um die Fetch Methode zu erweitern und Fehler abzufangen
    #fetchAdvanced = (url, init) => fetch(url, init)
        .then(res => {
            if(!res.ok) {
                throw Error(`${res.status} ${res.statusText}`);
            }
            return res.json();
        }
        )
    //Hier werden die Methoden definiert, die wir in der App verwenden

    //Diese Methode holt alle User aus der Datenbank
    getUsers() {
        return this.#fetchAdvanced(this.#getUsersURL()).then((responseJSON) => {
            let userBOs = UserBO.fromJSON(responseJSON);
            return new Promise(function(resolve) {
                resolve(userBOs);
            })
        })    
    }

    //Diese Methode fügt eine Unit hinzu
    addUnit(unitBO) { 
        return this.#fetchAdvanced(this.#addUnitURL(), { 
            method: 'POST', 
            headers: { 
                'Accept': 'application/json, text/plain', 
                'Content-Type': 'application/json', 
            }, 
            body: JSON.stringify(unitBO) 
        }).then(responseJSON => { 
            return responseJSON; 
        }).catch(error => { 
            console.error('Failed to add unit:', error); 
            throw new Error('Error adding unit'); 
        });
    }

    //Methode, bei der man eine Unit anhand der ID aus der Datenbank holt
    getUnitbyHouseholdId(id) {
        return this.#fetchAdvanced(this.#getUnitsbyIdURL(id)).then((responseJSON) => {
            // Check if the response is correctly parsed
            let unitBO = UnitBO.fromJSON(responseJSON);
            return new Promise(function(resolve) {
                resolve(unitBO);
            });
        }).catch(error => {
            console.error('Error fetching unit by household ID:', error);
        });
    }
    
    //Methode um eine Unit zu löschen
    deleteUnit(id) { 
        return this.#fetchAdvanced(this.#deleteUnitURL(id), { 
            method: 'DELETE' 
        }).then(() => ({ message: "Unit deleted successfully", id }));
    }

    //Methde um alle Haushalte aus der Datenbank zu holen
    getHouseholds() {
        return this.#fetchAdvanced(this.#getHouseholdsURL()).then((responseJSON) => {
            let householdBOs = HouseholdBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(householdBOs);
            })
        })
    }

    //Methode um alle FridgeEntries aus der Datenbank zu holen
    getFridgeEntries() {
        return this.#fetchAdvanced(this.#getFridgeEntriesURL()).then((responseJSON) => {
            let fridgentryBOs = FridgeEntryBO.fromJSON(responseJSON);
            return new Promise(function(resolve) {
                resolve(fridgentryBOs);
            })
        })
    }
    //Methode um alle RecipeEntries aus der Datenbank zu holen
    getRecipeEntries() {
        return this.#fetchAdvanced(this.#getRecipeEntriesURL()).then((responseJSON) => {
            let recipeentryBOs = RecipeEntryBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(recipeentryBOs);
            })
        })
    }

    //Methode um alle Rezepte aus der Datenbank zu holen
    getRecipes() {
        return this.#fetchAdvanced(this.#getRecipesURL()).then((responseJSON) => {
            let recipeBOs = RecipeBO.fromJSON(responseJSON);
            return new Promise(function(resolve) {
                resolve(recipeBOs);
            });
        });
    }

    // Methode um alle Fridge aus der Datenbank zu holen
    getFridges() {
        return this.#fetchAdvanced(this.#fridgeserverbaseurl()).then((responseJSON) => {
            let fridgesBOs = FridgeBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(fridgesBOs);
            })
        })
    }

    // Methode, nach der man einen User anhand der ID aus der Datenbank holt
    getUserbyId(id) {
        return this.#fetchAdvanced(this.#getUserURL(id)).then((responseJSON) => {
            let userBO = UserBO.fromJSON(responseJSON);
            return new Promise(function(resolve) {
                resolve(userBO)
            })
        }
    )
    }

    //Methode, nach der man einen User anhand der Google ID aus der Datenbank holt
    getUserbyGoogleUserId(google_user_id) {
        return this.#fetchAdvanced(this.#searchUserbygoogleIDURL(google_user_id)).then((responseJSON) => {
            let userBO = UserBO.fromJSON(responseJSON);
            return new Promise(function(resolve) {
                resolve(userBO)
            })
        })
    }

    //User nach Nickname suchen
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
        return this.#fetchAdvanced(this.#getHouseholdUsersbyIDURL(id)).then((responseJSON) => {
            let householdBO = HouseholdBO.fromJSON(responseJSON);
            return new Promise(function(resolve) {
                resolve(householdBO);
            });
        });
    }

    //Methode, um einen Haushalt anhand der ID aus der Datenbank zu holen
    getHouseholdbyID(id) {
        return this.#fetchAdvanced(this.#getHouseholdbyIDURl(id)).then((responseJSON) =>{
            let householdBO = HouseholdBO.fromJSON(responseJSON);
            return new Promise(function(resolve) {
                resolve(householdBO)
            })
        })
    }

    //Methode, um ein Rezept anhand der ID aus der Datenbank zu holen
    getRecipeByID(id) {
        return this.#fetchAdvanced(this.#getRecipeURL(id)).then((responseJSON) => {
            let recipeBO = RecipeBO.fromJSON(responseJSON);
            return new Promise(function(resolve) {
                resolve(recipeBO);
            });
        });
    }
    //Methode, um ein alle RecipeEntries eines Rezeptes anhand der ID aus der Datenbank zu holen
    getRecipeEntriesByRecipeId(recipe_id) {
        return this.#fetchAdvanced(this.#getRecipeEntriesByRecipeIdURL(recipe_id))
            .then(responseJSON => {
                if (responseJSON.length === 0) {
                    return []; // Leere Liste zurückgeben, wenn keine Einträge gefunden werden
                }
                return RecipeEntryBO.fromJSON(responseJSON);
            })
            .catch(error => {
                console.error("Error fetching recipe entries:", error);
                throw error;
            });
    }

    //Methode, um alle FrigeEntries eines bestimmten Fridge aus der Datenbank zu holen
    getFridgeEntriesbyFridgeId(fridge_id) {
        return this.#fetchAdvanced(this.#getFridgeEntriesbyFridgeID(fridge_id)).then((responseJSON) => {
            let entries = FridgeBO.fromJSON(responseJSON);
            return new Promise(function(resolve) {
                resolve(entries);
            });
        });
    }

    //Methode, um alle Rezepte eines bestimmten Haushaltes aus der Datenbank zu holen
    getRecipesbyhouseholdId(household_id) {
        return this.#fetchAdvanced(this.#getRecipesbyhouseholdIdURL(household_id)).then((responseJSON) => {
            let recipes = RecipeBO.fromJSON(responseJSON);  
            return new Promise(function(resolve) {
                resolve(recipes);
            });
        });
    }

    //Methode, anhand der man die Fride_Id ahand der Google User ID aus der Datenbank holt
    getFridgeIdByGoogleUserId(google_user_id) {
        return this.#fetchAdvanced(this.#getFridgeIdByGoogleUserIdURL(google_user_id)).then(responseJSON => {
            return responseJSON;
        }).catch(error => {
            console.error('Failed to fetch fridge ID:', error);
            throw new Error('Error fetching fridge ID by Google User ID');
        });
    }

    //Methode, mit anhand welcher ein Haushalt per Google User ID aus der Datenbank geholt wird
    getHouseholdIdByGoogleUserId(google_user_id) {
        return this.#fetchAdvanced(this.#getHouseholdIdByGoogleUserIdURL(google_user_id)).then(responseJSON => {
            return responseJSON;
        }).catch(error => {
            console.error('Failed to fetch household ID:', error);
            throw new Error('Error fetching household ID by Google User ID');
        });
    }



    //Methode um einen User hinzuzufügen
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

    //Methode um einen FridgeEntry hinzuzuzufügen
    addFridgeEntry(fridgeEntryBO) {
        return this.#fetchAdvanced(this.#fridgeserverbaseurl + '/FridgeEntries', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fridge_id: fridgeEntryBO.getFridgeId(),
                groceries_designation: fridgeEntryBO.getDesignation(),
                quantity: fridgeEntryBO.getQuantity(),
                unit: fridgeEntryBO.getUnit()
            })
        }).then(responseJSON => {
            return FridgeEntryBO.fromJSON([responseJSON])[0];
        }).catch(error => {
            console.error('Failed to add fridge entry:', error);
            throw new Error(`Error adding fridge entry: ${error.message}`);
        });
    }
    //hinzufügen eines RecipeEntries
    addRecipeEntry(recipeEntryBO) {
        return this.#fetchAdvanced(this.#addRecipeEntryURL(), {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                recipe_id: recipeEntryBO.getRecipeId(),
                groceries_designation: recipeEntryBO.getDesignation(),
                quantity: recipeEntryBO.getQuantity(),
                unit: recipeEntryBO.getUnit()
            })
        }).then(responseJSON => {
            return RecipeEntryBO.fromJSON([responseJSON])[0];
        }).catch(error => {
            console.error('Failed to add fridge entry:', error);
            throw new Error(`Error adding fridge entry: ${error.message}`);
        });
    }


    // ein Rezept hinzufügen
    addRecipe(recipeBO) {
        return this.#fetchAdvanced(this.#fridgeserverbaseurl + '/RecipeList', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: recipeBO.getId(),
                title: recipeBO.getTitle(),  
                creator: recipeBO.getCreator(),
                number_of_persons: recipeBO.getNumberOfPersons(),
                description: recipeBO.getDescription(),  
                household_id: recipeBO.getHouseholdId()
            })
        }).then(responseJSON => {
            return RecipeBO.fromJSON(responseJSON)[0];
        });
    }
    


    //Methode um einen Haushalt hinzuzufügen
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
        }).catch(error => {
        console.error('Failed to add a recipe:', error);
        throw new Error('Error adding recipe: ${error.message}'); 
    })
    }

    //Methode um eine Fridge hinzuzufügen
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
    //User updaten
    updateUser(userBO) {
        return this.#fetchAdvanced(this.#updateUserURL(userBO.id), {
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
    //User löschen
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
    //FridgeEntry updaten
    updateFridgeEntry(fridgeEntryBO) {
        return this.#fetchAdvanced(this.#updateFridgeEntryURL(fridgeEntryBO.designation), {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(fridgeEntryBO)
        }).then(responseJSON => FridgeEntryBO.fromJSON(responseJSON)[0]);
    }

      //RecipeEntry updaten
      updateRecipeEntry(recipeEntryBO) {
        return this.#fetchAdvanced(this.#updateRecipeEntryURL(recipeEntryBO.getDesignation(), recipeEntryBO.getRecipeId()), {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(recipeEntryBO)
        }).then(responseJSON => RecipeEntryBO.fromJSON(responseJSON)[0]); 
        
    }
   
    

    //FridgeEntry löschen
    deleteFridgeEntry(groceriesDesignation) {
        return this.#fetchAdvanced(this.#deleteFridgeEntryURL(groceriesDesignation), {
            method: 'DELETE'
        }).then(() => ({ message: "Fridge entry deleted successfully", groceriesDesignation }));
    }



    //Rezept updaten
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



    //Rezept löschen
    deleteRecipe(id) {
        return this.#fetchAdvanced(this.#deleteRecipeURL(id), {
            method: 'DELETE'
        }).then(() => ({ message: "Recipe deleted successfully", id }));
    }
    
    //Haushalt updaten
    updateHousehold(householdBO) {
        return this.#fetchAdvanced(this.#updateHouseholdURL(householdBO.id), {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(householdBO)
        }).then(responseJSON => HouseholdBO.fromJSON(responseJSON)[0]);
    }
    //Haushalt löschen
    deleteHousehold(id) {
        return this.#fetchAdvanced(this.#deleteHouseholdURL(id), {
            method: 'DELETE'
        }).then(() => ({ message: "Household deleted successfully", id }));
    }

    //RezeptEntry löschen
    deleteRecipeEntry(groceriesDesignation, recipeId) {
        return this.#fetchAdvanced(this.#deleteRecipeEntryURL(groceriesDesignation, recipeId), {
            method: 'DELETE'
        }).then(() => ({ message: "Recipe entry deleted successfully", groceriesDesignation }))
        .catch(error => {
            console.error('Failed to delete recipe entry:', groceriesDesignation, error);
            throw new Error('Error deleting recipe entry');
        });
    }
    //Kochen eines Rezepts, subtrahiert die Zutaten aus der Fridge
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


