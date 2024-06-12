import FoodEntry from './FoodEntry.js';

export default class RecipeEntryBO extends FoodEntry{



   /** Konstruktion der RezeptID.
   * @param {String} arecipeid - Fügt einem Rezept eine ID hinzu.
   */
    constructor(arecipeid){
        super();
        this.recipeid = arecipeid
    }


    
    /**
   * Setzen einer ID für das Rezept.
   * @param {String} atitle -  neuen ID des Rezeptes.
   */
    setrecipeid(arecipeid){
        this.recipeid = arecipeid
    }

    getrecipeid() {
        return this.recipeid
    }

    static fromJSON(recipeentries) {
        let result = [];
    
        if (Array.isArray(recipeentries)) {
          recipeentries.forEach((r) => {
            Object.setPrototypeOf(r, RecipeEntryBO.prototype);
            result.push(r);
          })
        } else {
          // Es handelt sich offenbar um ein singuläres Objekt
          let r = recipeentries;
          Object.setPrototypeOf(r, RecipeEntryBO.prototype);
          result.push(r);
        }
    
        return result;
      }
}



