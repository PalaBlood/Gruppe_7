import BusinessObject from "./BusinessObject.js"

// Die Klasse FridgeBO erbt von der BusinessObject-Klasse.
// Diese Klasse repräsentiert ein Kühlschrank-Objekt.
export default class FridgeBO extends BusinessObject {
    // Konstruktor, der den Konstruktor der übergeordneten Klasse (BusinessObject) aufruft.
    constructor() {
        super();
    }

    // Statische Methode zum Erzeugen von FridgeBO-Instanzen aus JSON-Daten.
    static fromJSON(fridges) {
        let result = [];
        // Überprüft, ob fridges ein Array ist.
        if (Array.isArray(fridges)) {
            // Wenn fridges ein Array ist, iteriert durch jedes Element.
          fridges.forEach((f) => {
            // Setzt das Prototyp-Objekt des Elements auf FridgeBO.
            Object.setPrototypeOf(f, FridgeBO.prototype);
            result.push(f); // Fügt das Element zum Ergebnisarray hinzu.
          })
        } else {
          // Wenn fridges kein Array ist, behandelt es als singuläres Objekt.
          let f = fridges;
          // Setzt das Prototyp-Objekt des Objekts auf FridgeBO.
          Object.setPrototypeOf(f, FridgeBO.prototype);
          result.push(f); // Fügt das Objekt zum Ergebnisarray hinzu.
        }
        // Gibt das Ergebnisarray zurück.
        return result;
      }

}