/**
 * Ähnlich wie im Backend erstellen wir eine BusinessObject Klasse, von der alle anderen Klassen erben
 * Sie dient dazu jede Intanz mit einer ID zu belegen
 */
export default class BusinessObject {

    /**
     * The null constructor.
     */
    constructor() {
      this.id = 0;
    }
  
    /**
     * Sets the ID of this BusinessObject.
     * 
     * @param {*} aId - the new ID of this BusinessObject
     */
    setId(aId) {
      this.id = aId;
    }
  
    /**
     * Returns the ID of this BusinessObject.
     */
    getId() {
      return this.id;
    }
  
    /**
     * Java Objekte lassen sich in Strings konventierten, was z.B. bei Logfiles hilfreich sein kann
     */
    toString() {
      let result = '';
      for (var prop in this) {
        result += prop + ': ' + this[prop] + ' ';
      }
      return result;
    }
  }