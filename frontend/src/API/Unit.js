import BusinessObject from "./BusinessObject";

export default class UnitBO extends BusinessObject {

  constructor(adesignation, ahoushold_id) {
    super();
    this.designation = adesignation;
    this.household_id = ahoushold_id;
  }

  getDesignation() {
    return this.designation;
  }

  setDesignation(adesignation) {
    this.designation = adesignation;
  }

  getHouseholdId() {
    return this.household_id;
  }

  setHouseholdId(ahoushold_id) {
    this.household_id = ahoushold_id;
  }

  static fromJSON(unit) {
    let result = [];

    if (Array.isArray(unit)) {
      unit.forEach((u) => {
        Object.setPrototypeOf(u, UnitBO.prototype);
        result.push(u);
      })
    } else {
      let u = unit;
      Object.setPrototypeOf(u, UnitBO.prototype);
      result.push(u);
    }

    return result;
  }
}