import BusinessObject from "./BusinessObject.js";

// Die Klasse RecipeBO erbt von der BusinessObject-Klasse.
// Diese Klasse repräsentiert ein Rezept mit Titel, Ersteller, Anzahl der Personen, Beschreibung und Haushalts-ID.
export default class RecipeBO extends BusinessObject {
    constructor(atitle, acreator, aNumberOfPersons, adescription, ahouseholdId) {
        super(); // Ruft den Konstruktor der übergeordneten Klasse (BusinessObject) auf.
        this.title = atitle; // Titel des Rezepts.
        this.creator = acreator; // Ersteller des Rezepts.
        this.numberOfPersons = aNumberOfPersons; // Anzahl der Personen.
        this.description = adescription; // Beschreibung des Rezepts.
        this.householdId = ahouseholdId; // ID des Haushalts.
    }
    // Setzt den Titel des Rezepts.
    setTitle(atitle) {
        this.title = atitle;
    }
    // Gibt den Titel des Rezepts zurück.
    getTitle() {
        return this.title;
    }
    // Setzt den Ersteller des Rezepts.
    setCreator(acreator) {
        this.creator = acreator;
    }
    // Gibt den Ersteller des Rezepts zurück.
    getCreator() {
        return this.creator;
    }
    // Setzt die Anzahl der Personen für das Rezept.
    setNumberOfPersons(aNumberOfPersons) {
        this.numberOfPersons = aNumberOfPersons;
    }
    // Gibt die Anzahl der Personen für das Rezept zurück.
    getNumberOfPersons() {
        return this.numberOfPersons;
    }
    // Setzt die Beschreibung des Rezepts.
    setDescription(adescription) {
        this.description = adescription;
    }
    // Gibt die Beschreibung des Rezepts zurück.
    getDescription() {
        return this.description;
    }
    // Setzt die Haushalts-ID des Rezepts.
    setHouseholdId(ahouseholdId) {
        this.householdId = ahouseholdId;
    }
    // Gibt die Haushalts-ID des Rezepts zurück.
    getHouseholdId() {
        return this.householdId;
    }
    // Statische Methode zum Erzeugen von RecipeBO-Instanzen aus JSON-Daten.
    static fromJSON(recipes) {
        let result = [];
        // Überprüft, ob recipes ein Array ist. Wenn ja, iteriert durch jedes Element.
        if (Array.isArray(recipes)) {
            recipes.forEach((r) => {
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
