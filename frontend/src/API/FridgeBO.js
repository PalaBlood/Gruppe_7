import BusinessObject from "./BusinessObject"

export default class FridgeBO extends BusinessObject {

    constructor() {
        super()
    }

    static fromJSON(frdiges) {
        let result = [];
    
        if (Array.isArray(fridges)) {
          users.forEach((f) => {
            Object.setPrototypeOf(a, FridgeBO.prototype);
            result.push(f);
          })
        } else {
          // Es handelt sich offenbar um ein singuläres Objekt
          let f = fridges;
          Object.setPrototypeOf(u, FridgeBO.prototype);
          result.push(f);
        }
    
        return result;
      }

}