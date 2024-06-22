import FoodEntry from "./FoodEntry";

export default class FridgeEntryBO extends FoodEntry {
    constructor(groceries_designation, quantity, unit, fridgeId) {
        super(groceries_designation, quantity, unit);
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
            let fridgeEntry = new FridgeEntryBO(f.groceries_designation, f.quantity, f.unit, f.fridge_id);
            fridgeEntry.setId(f.id); 
            return fridgeEntry;
        });
    }
}
