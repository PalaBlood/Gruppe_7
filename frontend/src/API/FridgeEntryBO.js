import FoodEntry from "./FoodEntry";

export default class FridgeEntry extends FoodEntry {

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