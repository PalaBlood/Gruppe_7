import FoodEntry from "./FoodEntry";

export default class FridgeEntryBO extends FoodEntry {
    constructor(designation, quantity, unit, fridgeId) {
        super(designation, quantity, unit);
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
            let fridgeEntry = new FridgeEntryBO(f.designation, f.quantity, f.unit, f.fridgeId);
            fridgeEntry.id = f.id;
            return fridgeEntry;
        });
    }
}
