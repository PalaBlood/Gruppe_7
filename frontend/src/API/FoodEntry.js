import BusinessObject from "./BusinessObject.js";


export default class FoodEntry extends BusinessObject {

    constructor (adesignation, aquantity, aunit) {
        super();
        this.designation = adesignation;
        this.quantity = aquantity;
        this.unit = aunit;
    }

    setdesignation (adesignation) {
        this.designation = adesignation;
    }

    getdesignation () {
        return this.designation;
    }

    setquantity(aquantity) {
        this.quantity = aquantity
    }

    getquantity () {
        return this.quantity
    }

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