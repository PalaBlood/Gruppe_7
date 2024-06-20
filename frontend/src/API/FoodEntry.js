import BusinessObject from "./BusinessObject.js";

export default class FoodEntry extends BusinessObject {
    constructor(groceries_designation, quantity, unit) {
        super();
        this.groceries_designation = groceries_designation;
        this.quantity = quantity;
        this.unit = unit;
    }

    setDesignation(designation) {
        this.groceries_designation = designation;
    }

    getDesignation() {
        return this.groceries_designation;
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
            let foodEntry = new FoodEntry(f.groceries_designation, f.quantity, f.unit);
            foodEntry.id = f.id;  //ID Direkt setzen
            return foodEntry;
        });
    }
}
