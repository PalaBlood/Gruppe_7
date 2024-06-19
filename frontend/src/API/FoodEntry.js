import BusinessObject from "./BusinessObject.js";

export default class FoodEntry extends BusinessObject {
    constructor(designation, quantity, unit) {
        super();
        this.designation = designation;
        this.quantity = quantity;
        this.unit = unit;
    }

    setDesignation(designation) {
        this.designation = designation;
    }

    getDesignation() {
        return this.designation;
    }

    setQuantity(quantity) {
        this.quantity = quantity;
    }

    getQuantity() {
        return this.quantity;
    }

    setUnit(unit) {
        this.unit = unit;
    }

    getUnit() {
        return this.unit;
    }

    static fromJSON(foodEntries) {
        return foodEntries.map(f => {
            let foodEntry = new FoodEntry(f.designation, f.quantity, f.unit);
            foodEntry.id = f.id;  // Set the ID directly
            return foodEntry;
        });
    }
}
