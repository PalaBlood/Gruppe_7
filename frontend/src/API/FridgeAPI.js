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

    #fridgeserverbaseurl = '/fridge';






//fridgeentry related
    #


//recipeentry related




//fridge related



//user related
#getUserURL = () => `${this.#fridgeserverbaseurl}/users`;
#addUserURL = () => `${this.#fridgeserverbaseurl}/users`;
#getUserURL = (id) => `${this.#fridgeserverbaseurl}/users/${id}`;
#updateUserURL = (id) => `${this.#fridgeserverbaseurl}/users/${id}`;
#deleteUserURL = (id) =>  `${this.#fridgeserverbaseurl}/users/${id}`;
#searchUserURL = (nick_name) => `${this.#fridgeserverbaseurl}/users/${nick_name}`;




//recipe related



//household related




}