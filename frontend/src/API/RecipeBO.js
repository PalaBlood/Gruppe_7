import BusinessObject from "./BusinessObject.js";

export default class RecipeBO extends BusinessObject {

    /** Konstruktion eines Rezeptes.
     * @param {String} atitle - Fügt dem Rezept einen Titel zu.
     * @param {String} acreator - Fügt dem Rezept einen Ersteller zu.
     * @param {String} aNumberOfPersons - Fügt dem Rezept die Anzahl der Personen zu.
     * @param {String} adescription - Fügt dem Rezept eine Beschreibung zu.
     * @param {String} ahouseholdId - Fügt dem Rezept die Haushalts-ID zu.
     */
    constructor(atitle, acreator, aNumberOfPersons, adescription, ahouseholdId) { //hier sollten wir eher ohne direkte Eingaben arbeiten
        super();
        this.title = atitle;
        this.creator = acreator;
        this.numberOfPersons = aNumberOfPersons;
        this.description = adescription;
        this.householdId = ahouseholdId;
    }

    /**
     * Setzen eines neuen Titel für das Rezept.
     * @param {String} atitle - neuen Titel des Rezeptes.
     */
    setTitle(atitle) {
        this.title = atitle;
    }

    getTitle() {
        return this.title;
    }

    /**
     * Setzen eines neuen Erstellers für das Rezept.
     * @param {String} acreator - neuer Ersteller des Rezeptes.
     */
    setCreator(acreator) {
        this.creator = acreator;
    }

    getCreator() {
        return this.creator;
    }

    /**
     * Setzen der Anzahl der Personen für das Rezept.
     * @param {Number} aNumberOfPersons - neue Anzahl der Personen.
     */
    setNumberOfPersons(aNumberOfPersons) {
        this.numberOfPersons = aNumberOfPersons;
    }

    getNumberOfPersons() {
        return this.numberOfPersons;
    }

    /**
     * Setzen einer neuen Beschreibung für das Rezept.
     * @param {String} adescription - neue Beschreibung des Rezeptes.
     */
    setDescription(adescription) {
        this.description = adescription;
    }

    getDescription() {
        return this.description;
    }

    /**
     * Setzen der Haushalts-ID für das Rezept.
     * @param {String} ahouseholdId - neue Haushalts-ID.
     */
    setHouseholdId(ahouseholdId) {
        this.householdId = ahouseholdId;
    }

    getHouseholdId() {
        return this.householdId;
    }

    /**
     * Erstellen einer RecipeBO-Instanz aus einem JSON-Objekt.
     * @param {Object} recipes - JSON-Objekt oder Array von JSON-Objekten.
     * @return {RecipeBO[]} Array von RecipeBO-Instanzen.
     */
    static fromJSON(recipes) {
        let result = [];

        if (Array.isArray(recipes)) {
            recipes.forEach((r) => {
                Object.setPrototypeOf(r, RecipeBO.prototype);
                result.push(r);
            });
        } else {
            let r = recipes;
            Object.setPrototypeOf(r, RecipeBO.prototype);
            result.push(r);
        }

        return result;
    }
}
