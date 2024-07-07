import BusinessObject from "./BusinessObject.js";

export default class HouseholdBO extends BusinessObject {


    /** Konstruktion eines neuen Haushalts 
   * @param {String} aname - der Name des Haushalts.
   */ 
    constructor(aname, afridgeid, apassword) {
        super();
        this.name = aname
        this.fridge_id = afridgeid
        this.password = apassword
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

    setfridge_id(afridgeid) {
      this.afridgeid = afridgeid
    }

    getfridgeid() {
      return this.afridgeid
    }

    setpassword(apassword) {
      this.apassword = apassword
    }

    getpassword() {
      return this.apassword
    }

    static fromJSON(households) {
      let result = [];
      /**
       * Wir erstellen aus jedem Objekt von User eine Json.
       *  
       */
  
      if (Array.isArray(households)) {
        households.forEach((h) => {
          Object.setPrototypeOf(h, HouseholdBO.prototype);
          result.push(h);
        })
      } else {
        // Sollte es ein Singelton Objekt sein
        let h = households;
        Object.setPrototypeOf(h, HouseholdBO.prototype);
        result.push(h);
      }
  
      return result;
    }
}