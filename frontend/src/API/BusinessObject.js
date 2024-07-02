export default class BusinessObject {

  /**
   * Der Konstruktor.
   */
  constructor() {
      this.id = 0;
  }

  /**
   * Setzt die ID dieses BusinessObjects.
   * @param {Number} aId - die neue ID dieses BusinessObjects.
   */
  setId(aId) {
      this.id = aId;
  }

  /**
   * Gibt die ID dieses BusinessObjects zurück.
   * @return {Number} die ID dieses BusinessObjects.
   */
  getId() {
      return this.id;
  }

  /**
   * Konvertiert JavaScript-Objekte in Strings, was z.B. bei Logfiles hilfreich sein kann.
   * @return {String} die String-Repräsentation dieses Objekts.
   */
  toString() {
      let result = '';
      for (let prop in this) {
          result += prop + ': ' + this[prop] + ' ';
      }
      return result;
  }
}
