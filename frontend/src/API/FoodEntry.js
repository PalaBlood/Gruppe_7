import BusinessObject from "./BusinessObject.js";


export default class FoodEntry extends BusinessObject {

     /** Konstruktion eines neuen Lebensmittels 
   * @param {String} designation - der Name des Lebensmittels.
   * @param {String} quantity - die Menge der Lebensmittel.
   * @param {String} unit - die Einheit der Lebensmittel.
   */
    constructor (adesignation, aquantity, aunit) {
        super();
        this.designation = adesignation;
        this.quantity = aquantity;
        this.unit = aunit;
    }

     /**
   * Setzen eines neuen Namen der Lebensmittel.
   * 
   * @param {String} adesignation -  Name von Lebenmittel.
   */
    setdesignation (adesignation) {
        this.designation = adesignation;
    }

    getdesignation () {
        return this.designation;
    }


    /**
   * Setzen einer Mengenangabe der Lebensmittel.
   * 
   * @param {String} aquantity -   Mengenangabe für ein Lebensmittel.
   */
    setquantity(aquantity) {
        this.quantity = aquantity
    }

    getquantity () {
        return this.quantity
    }


    /**
   * Setzen einer neuen Maßeinheit für Lebensmittel.
   * 
   * @param {String} adesignation -  neue Maßeinheit für Lebenmittel.
   */
    setunit (aunit) {
        this.unit = aunit
    }

    getunit () {
        return this.unit
    }

    static fromJSON(foodentries) {
        let result = [];
    
        if (Array.isArray(foodentries)) {
          foodentries.forEach((f) => {
            Object.setPrototypeOf(f, FoodEntry.prototype);
            result.push(f);
          })
        } else {
          // Es handelt sich offenbar um ein singuläres Objekt
          let f = foodentries;
          Object.setPrototypeOf(f, FoodEntry.prototype);
          result.push(f);
        }
    
        return result;
      }
}