import UserBO from "./UserBO.js";
import FoodEntry from "./FoodEntry.js";
import RecipeBO from "./RecipeBO.js";
import RecipeEntryBO from "./RecipeEntryBO.js";
import FridgeEntryBO from "./FridgeEntryBO.js";
import HouseholdBO from "./HouseholdBO.js";
import FridgeBO from "./FridgeBO.js";



export default class FridgeAPI {

    static #api = null

    //python backend --> main.py, müssen wir noch reinschreiben, erzeugt sicherheit

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



}






// Get the singleton API instance
const api = FridgeAPI.getAPI();

// Now use this instance to get users
api.getUsers().then(users => {
    console.log(users);  // Do something with the users
}).catch(error => {
    console.error("Failed to fetch users:", error);
});
