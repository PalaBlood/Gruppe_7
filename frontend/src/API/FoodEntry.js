import BusinessObject from "./BusinessObject.js";

// Die Klasse FoodEntry erbt von der BusinessObject-Klasse.
// Diese Klasse repräsentiert einen Eintrag für Lebensmittel mit Bezeichnung, Menge und Einheit.
export default class FoodEntry extends BusinessObject {
    // Der Konstruktor initialisiert eine neue Instanz der FoodEntry-Klasse mit den übergebenen Parametern.
    constructor(groceries_designation, quantity, unit) {
        super(); // Ruft den Konstruktor der übergeordneten Klasse (BusinessObject) auf.
        this.groceries_designation = groceries_designation; // Bezeichnung der Lebensmittel.
        this.quantity = quantity; // Menge der Lebensmittel.
        this.unit = unit; // Einheit der Menge.
    }

    // Methode zum Setzen der Bezeichnung der Lebensmittel.
    setDesignation(designation) {
        this.groceries_designation = designation;
    }

    // Methode zum Abrufen der Bezeichnung der Lebensmittel.
    getDesignation() {
        return this.groceries_designation;
    }

    // Methode zum Setzen der Menge der Lebensmittel.
    setQuantity(quantity) {
        this.quantity = quantity;
    }

    // Methode zum Abrufen der Menge der Lebensmittel.
    getQuantity() {
        return this.quantity;
    }

    // Methode zum Setzen der Einheit der Menge.
    setUnit(unit) {
        this.unit = unit;
    }

    // Methode zum Abrufen der Einheit der Menge.
    getUnit() {
        return this.unit;
    }

    
    // Statische Methode zum Erzeugen von FoodEntry-Instanzen aus einem JSON-Array.
    static fromJSON(foodEntries) {
        return foodEntries.map(f => {
            // Erzeugt eine neue Instanz von FoodEntry basierend auf den JSON-Daten.
            let foodEntry = new FoodEntry(f.groceries_designation, f.quantity, f.unit);
            foodEntry.setId(f.id);  // ID Direkt setzen
            return foodEntry;
        });
    }
}


