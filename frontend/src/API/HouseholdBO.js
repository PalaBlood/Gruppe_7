import BusinessObject from "./BusinessObject.js";

// Die Klasse HouseholdBO erbt von der BusinessObject-Klasse.
// Diese Klasse repräsentiert einen Haushalt mit Name, Kühlschrank-ID und Passwort.
export default class HouseholdBO extends BusinessObject {


    /** Konstruktion eines neuen Haushalts 
   * @param {String} aname - der Name des Haushalts.
   */ 
    constructor(aname, afridgeid, apassword) {
        super(); // Ruft den Konstruktor der übergeordneten Klasse (BusinessObject) auf.
        this.name = aname // Name des Haushalts.
        this.fridge_id = afridgeid // Kühlschrank-ID des Haushalts.
        this.password = apassword // Passwort des Haushalts.
    }


    /**
   * Setzen einer neuen Namen für den Haushalt.
   * 
   * @param {String} aname -  neuen Namen des Haushaltes.
   */
    setname(aname) {
        this.name = aname
    }
    // Gibt den Namen des Haushalts zurück.
    getname () {
        return this.name
    }
    // Setzt eine neue Kühlschrank-ID für den Haushalt.
    setfridge_id(afridgeid) {
      this.afridgeid = afridgeid
    }
    // Gibt die Kühlschrank-ID des Haushalts zurück.
    getfridgeid() {
      return this.afridgeid
    }
    // Setzt ein neues Passwort für den Haushalt.
    setpassword(apassword) {
      this.apassword = apassword
    }
    // Gibt das Passwort des Haushalts zurück.
    getpassword() {
      return this.apassword
    }

    // Statische Methode zum Erzeugen von HouseholdBO-Instanzen aus JSON-Daten.
    static fromJSON(households) {
      let result = [];
      /**
       * Wir erstellen aus jedem Objekt von User eine Json.
       *  
       */
      // Überprüft, ob households ein Array ist. Wenn ja, iteriert durch jedes Element.
      if (Array.isArray(households)) {
        households.forEach((h) => {
          Object.setPrototypeOf(h, HouseholdBO.prototype);
          result.push(h);
        })
      } else {
        // Wenn households kein Array ist, behandelt es als singuläres Objekt.
        let h = households;
        Object.setPrototypeOf(h, HouseholdBO.prototype);
        result.push(h);
      }
  
      return result;
    }
}