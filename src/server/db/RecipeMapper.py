from server.db.Mapper import Mapper
from server.bo.Recipe import Recipe

class RecipeMapper(Mapper):
    def __init__(self):
        super().__init__()

    def find_all(self):
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * FROM Recipe")
        tuples = cursor.fetchall()
        cursor.close()

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

        return result

    def find_food_entries_for_recipe(self, recipe_id):
        # Implementiere Logik zum Laden von Lebensmitteleinträgen für ein bestimmtes Rezept
        pass

