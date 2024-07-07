import FoodEntry from "./FoodEntry";

// Die Klasse FridgeEntryBO erbt von der FoodEntry-Klasse.
// Diese Klasse repräsentiert einen Eintrag für den Kühlschrank und erweitert FoodEntry um die Eigenschaft fridgeId.
export default class FridgeEntryBO extends FoodEntry {
    // Der Konstruktor initialisiert eine neue Instanz der FridgeEntryBO-Klasse mit den übergebenen Parametern.
    constructor(groceries_designation, quantity, unit, fridgeId) {
        super(groceries_designation, quantity, unit); // Ruft den Konstruktor der übergeordneten Klasse (FoodEntry) auf.
        this.fridgeId = fridgeId; // ID des Kühlschranks.
    }
    // Methode zum Abrufen der Kühlschrank-ID.
    getFridgeId() {
        return this.fridgeId;
    }
    // Methode zum Setzen der Kühlschrank-ID.
    setFridgeId(fridgeId) {
        this.fridgeId = fridgeId;
    }

    
    // Statische Methode zum Erzeugen von FridgeEntryBO-Instanzen aus JSON-Daten.
    static fromJSON(fridgeEntries) {
        // Überprüft, ob fridgeEntries ein Array ist. Wenn nicht, wird es in ein Array umgewandelt.
        if (!Array.isArray(fridgeEntries)) {
            fridgeEntries = [fridgeEntries];
        }
        // Erzeugt eine neue Instanz von FridgeEntryBO für jedes Element im Array.
        return fridgeEntries.map(f => {
            let fridgeEntry = new FridgeEntryBO(f.groceries_designation, f.quantity, f.unit, f.fridge_id);
            fridgeEntry.setId(f.id);  // Setzt die ID direkt
            return fridgeEntry;
        });
    }
}
