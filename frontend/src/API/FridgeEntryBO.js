import FoodEntry from "./FoodEntry";

export default class FridgeEntryBO extends FoodEntry {
    constructor(groceriesDesignation, quantity, unit, fridgeId) {
        super(groceriesDesignation, quantity, unit);
        this.fridgeId = fridgeId;
    }

    getFridgeId() {
        return this.fridgeId;
    }

    setFridgeId(fridgeId) {
        this.fridgeId = fridgeId;
    }

    static fromJSON(fridgeEntries) {
        return fridgeEntries.map(f => {
            let fridgeEntry = new FridgeEntryBO(f.groceriesDesignation, f.quantity, f.unit, f.fridgeId);
            fridgeEntry.id = f.id; // Angenommen, es gibt eine ID vom Typ BusinessObject
            return fridgeEntry;
        });
    }
}
