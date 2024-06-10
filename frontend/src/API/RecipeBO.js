import BusinessObject from "./BusinessObject.js";


export default class RecipeBO extends BusinessObject {


       /** Konstruktion eines Rezeptes.
   * @param {String} atitle - Fügt dem Rezept einen Titel zu.
   * @param {String} acreator - Fügt dem Rezept einen Ersteller zu.
   * @param {String} adescription - Fügt dem Rezept eine Beschreibung zu.
   */
    constructor(atitle, acreator, adescription) {
        super();
        this.title = atitle;
        this.creator = acreator;
        this.description = adescription;
        
    }
    

    /**
   * Setzen eines neuen Titel für das Rezept.
   * @param {String} atitle -  neuen Titel des Rezeptes.
   */
    settitle(atitle) {
        this.title = atitle
    }

    gettitle() {
        return this.title
    }


      /**
   * Setzen eines neuen Ersteller für das Rezept.
   * @param {String} acreator -  neuer Ersteller des Rezeptes.
   */
    setcreator(acreator) {
        this.creator = acreator
    }

    getcreator() {
        return this.creator
    }


      /**
   * Setzen einer neuen Beschreibung für das Rezept.
   * @param {String} adescription -  neue Beschreibung des Rezeptes.
   */
    setdescription(adescription) {
        this.description = adescription
    }

    getdescription() {
        return this.adescription
    }
    
    static fromJSON(recipes) {
        let result = [];
    
        if (Array.isArray(recipes)) {
          recipes.forEach((r) => {
            Object.setPrototypeOf(r, RecipeBO.prototype);
            result.push(r);
          })
        } else {
          // Es handelt sich offenbar um ein singuläres Objekt
          let r = recipes;
          Object.setPrototypeOf(r, RecipeBO.prototype);
          result.push(r);
        }
    
        return result;
} 
}