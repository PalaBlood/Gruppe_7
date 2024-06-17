import BusinessObject from "./BusinessObject.js";

export default class HouseholdBO extends BusinessObject {


    /** Konstruktion eines neuen Haushalts 
   * @param {String} designation - der Name des Haushalts.
   */ 
    constructor(aname, afridgeid) {
        super();
        this.name = aname
        this.fridge_id = afridgeid
    }


    /**
   * Setzen einer neuen Namen für den Haushalt.
   * 
   * @param {String} aname -  neuen Namen des Haushaltes.
   */
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
          Object.setPrototypeOf(h, HouseholdBO.prototype);
          result.push(h);
        }
    
        return result;
      }
}