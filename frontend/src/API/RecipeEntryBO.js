import FoodEntry from './FoodEntry.js';

export default class RecipeEntryBO extends FoodEntry{

    constructor(arecipeid){
        super();
        this.recipeid = arecipeid
    }

    setrecipeid(arecipeid){
        this.recipeid = arecipeid
    }

    getrecipeid() {
        return this.recipeid
    }

    static fromJSON(recipeentries) {
        let result = [];
    
        if (Array.isArray(recipeentries)) {
          users.forEach((r) => {
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



