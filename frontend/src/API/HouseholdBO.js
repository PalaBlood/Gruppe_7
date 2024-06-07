import BusinessObject from "./BusinessObject.js";

export default class HouseholdBO extends BusinessObject() {

    constructor(aname) {
        super();
        this.name = aname
    }

    setname(aname) {
        this.name = aname
    }

    getname () {
        return this.name
    }

    static fromJSON(households) {
        let result = [];
    
        if (Array.isArray(households)) {
          households.forEach((h) => {
            Object.setPrototypeOf(h, HouseholdBO.prototype);
            result.push(h);
          })
        } else {
          // Es handelt sich offenbar um ein singuläres Objekt
          let h = households;
          Object.setPrototypeOf(u, HouseholdBO.prototype);
          result.push(h);
        }
    
        return result;
      }
}