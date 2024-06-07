import FoodEntry from "./FoodEntry.js";

export default class FridgeEntryBO extends FoodEntry {

    constructor(afridgeid) {
        super();
        this.fridgeid = afridgeid
    }

    getfridgeid () {
        return this.fridgeid
    }

    setfridgeid(afridgeid) {
        this.fridgeid = afridgeid
    }

    static fromJSON(fridgeentries) {
        let result = [];
    
        if (Array.isArray(fridgeentries)) {
          fridgeentries.forEach((f) => {
            Object.setPrototypeOf(a, FridgeEntryBO.prototype);
            result.push(f);
          })
        } else {
          // Es handelt sich offenbar um ein singuläres Objekt
          let f = fridgeentries;
          Object.setPrototypeOf(f, FridgeEntryBO.prototype);
          result.push(f);
        }
    
        return result;
}
}