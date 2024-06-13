import FoodEntry from "./FoodEntry";

export default class FridgeEntryBO extends FoodEntry {


      /** Konstruktion eines neuen Lebensmitteleintrages im Kühlschrank. FridgeEntry erbt von FoodEntry. 
   * @param {String} afridgeid - Die ID ordnet die Eintragung zu einem Fridge zu.
   */
    constructor(afridgeid) {
        super();
        this.fridgeid = afridgeid
    }
     
    getfridgeid () {
        return this.fridgeid
    }

    /**
   * Setzen einer neuen FridgeID.
   * 
   * @param {String} afridgeid -  neue ID.
   */
    setfridgeid(afridgeid) {
        this.fridgeid = afridgeid
    }

    static fromJSON(fridgeentries) {
        let result = [];
    
        if (Array.isArray(fridgeentries)) {
          fridgeentries.forEach((f) => {
            Object.setPrototypeOf(f, FridgeEntryBO.prototype);
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