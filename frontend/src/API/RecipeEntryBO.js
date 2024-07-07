import FoodEntry from './FoodEntry.js';

// Die Klasse RecipeEntryBO erbt von der FoodEntry-Klasse.
// Diese Klasse repräsentiert einen Eintrag in einem Rezept und erweitert FoodEntry um die Eigenschaft recipe_id.
export default class RecipeEntryBO extends FoodEntry {
   /** Konstruktion der RezeptID.
   * @param {String} recipeid - Fügt einem Rezept eine ID hinzu.
   */
    constructor(groceries_designation, quantity, unit, recipe_id) {
        super(groceries_designation, quantity, unit); // Ruft den Konstruktor der übergeordneten Klasse (FoodEntry) auf.
        this.recipe_id = recipe_id; // ID des jeweiligen Rezepts.
    }

    /**
   * Setzen einer ID für das Rezept.
   * @param {String} recipeid - ID des jeweiligen Rezeptes, das mit dem Eintrag in Verbindung steht.
   */
    setRecipeId(recipeid) {
        this.recipe_id = recipeid;
    }

    /**
     * Gibt die Rezept-ID des Eintrags zurück.
     * @returns {String} - Rezept-ID des Eintrags.
     */
    getRecipeId() {
        return this.recipe_id;
    }
    // Statische Methode zum Erzeugen von RecipeEntryBO-Instanzen aus JSON-Daten.
    static fromJSON(recipeEntries) {
        // Überprüft, ob recipeEntries ein Array ist. Wenn nicht, wird es in ein Array umgewandelt.
        if (!Array.isArray(recipeEntries)) {
          recipeEntries = [recipeEntries];
        }
        // Erzeugt eine neue Instanz von RecipeEntryBO für jedes Element im Array.
        return recipeEntries.map(r => {
          let recipeEntry = new RecipeEntryBO(r.groceries_designation, r.quantity, r.unit, r.recipe_id);
          recipeEntry.setId(r.id); 
          return recipeEntry;
        });
      }
    }
