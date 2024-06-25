import FoodEntry from './FoodEntry.js';

export default class RecipeEntryBO extends FoodEntry {
   /** Konstruktion der RezeptID.
   * @param {String} recipeid - Fügt einem Rezept eine ID hinzu.
   */
    constructor(groceries_designation, quantity, unit, recipeid) {
        super(groceries_designation, quantity, unit);
        this.recipeid = recipeid;
    }

    /**
   * Setzen einer ID für das Rezept.
   * @param {String} recipeid - neuen ID des Rezeptes.
   */
    setRecipeId(recipeid) {
        this.recipeid = recipeid;
    }

    getRecipeId() {
        return this.recipeid;
    }

    static fromJSON(entries) {
        let result = [];
        if (Array.isArray(entries)) {
            entries.forEach((entry) => {
                Object.setPrototypeOf(entry, RecipeEntryBO.prototype);
                result.push(entry);
            })
        } else {
            let entry = entries;
            Object.setPrototypeOf(entry, RecipeEntryBO.prototype);
            result.push(entry);
        }
        return result;
    }
}
