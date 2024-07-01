import FoodEntry from './FoodEntry.js';

export default class RecipeEntryBO extends FoodEntry {
   /** Konstruktion der RezeptID.
   * @param {String} recipeid - Fügt einem Rezept eine ID hinzu.
   */
    constructor(groceries_designation, quantity, unit, recipe_id) {
        super(groceries_designation, quantity, unit);
        this.recipe_id = recipe_id;
    }

    /**
   * Setzen einer ID für das Rezept.
   * @param {String} recipeid - ID des jeweiligen Rezeptes, das mit dem Eintrag in Verbindung steht.
   */
    setRecipeId(recipeid) {
        this.recipe_id = recipeid;
    }

    getRecipeId() {
        return this.recipe_id;
    }

    static fromJSON(recipeEntries) {
        if (!Array.isArray(recipeEntries)) {
          recipeEntries = [recipeEntries];
        }
        
        return recipeEntries.map(r => {
          let recipeEntry = new RecipeEntryBO(r.groceries_designation, r.quantity, r.unit, r.recipe_id);
          recipeEntry.setId(r.id); 
          return recipeEntry;
        });
      }
    }
