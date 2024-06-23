import BusinessObject from "./BusinessObject.js";

export default class RecipeBO extends BusinessObject {
    constructor(atitle, acreator, aNumberOfPersons, adescription, ahouseholdId) {
        super();
        this.title = atitle;
        this.creator = acreator;
        this.numberOfPersons = aNumberOfPersons;
        this.description = adescription;
        this.householdId = ahouseholdId;
    }

    setTitle(atitle) {
        this.title = atitle;
    }

    getTitle() {
        return this.title;
    }

    setCreator(acreator) {
        this.creator = acreator;
    }

    getCreator() {
        return this.creator;
    }

    setNumberOfPersons(aNumberOfPersons) {
        this.numberOfPersons = aNumberOfPersons;
    }

    getNumberOfPersons() {
        return this.numberOfPersons;
    }

    setDescription(adescription) {
        this.description = adescription;
    }

    getDescription() {
        return this.description;
    }

    setHouseholdId(ahouseholdId) {
        this.householdId = ahouseholdId;
    }

    getHouseholdId() {
        return this.householdId;
    }

    static fromJSON(recipes) {
        let result = [];
        if (Array.isArray(recipes)) {
            recipes.forEach((r) => {
                console.log('Processing recipe:', r);  // Debugging-Ausgabe
                let recipe = new RecipeBO(
                    r.title,
                    r.creator,
                    r.numberOfPersons,  // Verwende den richtigen Schlüssel
                    r.description,
                    r.householdId
                );
                recipe.setId(r.id);
                result.push(recipe);
            });
        } else {
            let r = recipes;
            console.log('Processing recipe:', r);  // Debugging-Ausgabe
            let recipe = new RecipeBO(
                r.title,
                r.creator,
                r.numberOfPersons,  // Verwende den richtigen Schlüssel
                r.description,
                r.householdId
            );
            recipe.setId(r.id);
            result.push(recipe);
        }
        return result;
    }
}
