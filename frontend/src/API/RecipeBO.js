import BusinessObject from "./BusinessObject";


export default class RecipeBO extends BusinessObject {

    constructor(atitle, acreator, adescription) {
        super();
        this.title = atitle;
        this.creator = acreator;
        this.description = adescription;
        
    }

    
} 