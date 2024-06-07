import BusinessObject from "./BusinessObject.js";


export default class RecipeBO extends BusinessObject {

    constructor(atitle, acreator, adescription) {
        super();
        this.title = atitle;
        this.creator = acreator;
        this.description = adescription;
        
    }
    
    settitle(atitle) {
        this.title = atitle
    }

    gettitle() {
        return this.title
    }

    setcreator(acreator) {
        this.creator = acreator
    }

    getcreator() {
        return this.creator
    }

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