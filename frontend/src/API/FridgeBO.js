import BusinessObject from "./BusinessObject.js"

export default class FridgeBO extends BusinessObject {

    constructor() {
        super();
    }

    static fromJSON(fridges) {
        let result = [];
    
        if (Array.isArray(fridges)) {
          fridges.forEach((f) => {
            Object.setPrototypeOf(f, FridgeBO.prototype);
            result.push(f);
          })
        } else {
          // Es handelt sich offenbar um ein singuläres Objekt
          let f = fridges;
          Object.setPrototypeOf(f, FridgeBO.prototype);
          result.push(f);
        }
    
        return result;
      }

}