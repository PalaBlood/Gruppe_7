import BusinessObject from "./BusinessObject";

// Die Klasse UnitBO erbt von der BusinessObject-Klasse.
// Diese Klasse repräsentiert eine Einheit mit Bezeichnung und Haushalts-ID.
export default class UnitBO extends BusinessObject {

  constructor(adesignation, ahoushold_id) {
    super(); // Ruft den Konstruktor der übergeordneten Klasse (BusinessObject) auf.
    this.designation = adesignation; // Bezeichnung der Einheit.
    this.household_id = ahoushold_id; // ID des Haushalts.
  }

  // Gibt die Bezeichnung der Einheit zurück.
  getDesignation() {
    return this.designation;
  }

  // Setzt eine neue Bezeichnung für die Einheit.
  setDesignation(adesignation) {
    this.designation = adesignation;
  }

  // Gibt die Haushalts-ID der Einheit zurück.
  getHouseholdId() {
    return this.household_id;
  }

  // Setzt eine neue Haushalts-ID für die Einheit.
  setHouseholdId(ahoushold_id) {
    this.household_id = ahoushold_id;
  }

  // Statische Methode zum Erzeugen von UnitBO-Instanzen aus JSON-Daten.
  static fromJSON(unit) {
    let result = [];
    // Überprüft, ob unit ein Array ist. Wenn ja, iteriert durch jedes Element.
    if (Array.isArray(unit)) {
      unit.forEach((u) => {
        Object.setPrototypeOf(u, UnitBO.prototype);
        result.push(u);
      })
    } else {
      // Wenn unit kein Array ist, behandelt es als singuläres Objekt.
      let u = unit;
      Object.setPrototypeOf(u, UnitBO.prototype);
      result.push(u);
    }

    return result;
  }
}