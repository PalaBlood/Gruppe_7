import FoodEntry from "./FoodEntry";

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
}