import FoodEntry from './FoodEntry.js';

export default class RecipeEntryBO extends FoodEntry {
   /** Konstruktion der RezeptID.
   * @param {String} recipeid - Fügt einem Rezept eine ID hinzu.
   */
    constructor(groceries_designation, quantity, unit, recipeId) {
        super(groceries_designation, quantity, unit);
        this.recipeId = recipeId;
    }

    /**
   * Setzen einer ID für das Rezept.
   * @param {String} recipeid - neuen ID des Rezeptes.
   */
    setRecipeId(recipeid) {
        this.recipeId = recipeid;
    }

    getRecipeId() {
        return this.recipeId;
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
