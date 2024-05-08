from server.db.Mapper import Mapper
from server.bo.Recipe import Recipe
"""
Der Mapper ist noch in bearbeitung, orientiert euch nicht daran, ich bin 
mir noch unsicher, ob das so funktionieren wird!!
"""
class RecipeMapper(Mapper):
    def __init__(self):
        super().__init__()

    def find_all(self):
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * FROM Recipe")
        tuples = cursor.fetchall()


        for (id, title, number_of_persons, creator) in tuples:
            recipe = Recipe()
            recipe.set_id(id)
            recipe.set_number_of_persons(number_of_persons)
            recipe.set_title(title)
            recipe.set_creator(creator)

            # Hier Lebensmitteleinträge für das Rezept laden und hinzufügen
            food_entries = self.find_food_entries_for_recipe(id)
            for food_entry in food_entries:
                recipe.add_entry(food_entry)

            result.append(recipe)

        self._cnx.commit()
        cursor.close()

        return result

    def find_food_entries_for_recipe(self, recipe_id):
        # Implementiere Logik zum Laden von Lebensmitteleinträgen für ein bestimmtes Rezept
        #Hier könnte man eine Logik implementieren, die alle FoodEntry aus einer anderen Relation raussucht und hier einspeichert
        #Die Funktion könnte dann unter anderem bei "find_all" aufgerufen werden, um alle FoodEntrys des jeweiligen Rezeptes zu laden.
        pass

