
"""
from Gruppe_7.src.server.db.Mapper import Mapper
from Gruppe_7.src.server.bo.Recipe import Recipe
from Gruppe_7.src.server.db.GroceriesMapper import GroceriesMapper
from Gruppe_7.src.server.db.UserMapper import UserMapper
"""

from server.db.UserMapper import UserMapper
from server.db.Mapper import Mapper
from server.bo.Recipe import Recipe
from server.bo.RecipeEntry import RecipeEntry


class RecipeMapper(Mapper):
    
    def __init__(self):
        super().__init__()

    def insert_recipe(self, recipe):


            cursor = self._cnx.cursor()
            cursor.execute("SELECT MAX(id) AS maxid FROM recipe")
            tuples = cursor.fetchall()

            maxid = tuples[0][0] if tuples[0][0] is not None else 0
            recipe.set_id(maxid + 1)

            command = "INSERT INTO recipe (id, recipe_title, number_of_persons, creator, description) VALUES (%s, %s, %s, %s, %s)"
            data = (recipe.get_id(), recipe.get_title(), recipe.get_number_of_persons(), recipe.get_creator(), recipe.get_description())
            cursor.execute(command, data)

            self._cnx.commit()
            cursor.close()

            return recipe


    def get_existing_entry(self, recipe_id, groceries_designation):
        """Sollte der Eintrag schon existieren, so wird dieser geupdatet"""

        cursor = self._cnx.cursor()
        query = "SELECT quantity FROM recipe_groceries WHERE recipe_id = %s AND groceries_designation = %s"
        cursor.execute(query, (recipe_id, groceries_designation))
        result = cursor.fetchone()
        cursor.close()
        return result

    def update_recipe_entry(self, recipe_id, groceries_designation, quantity, unit):
        """Update an existing recipe entry in the database."""
        cursor = self._cnx.cursor()
        command = """UPDATE recipe_groceries
                     SET quantity = %s, unit = %s
                     WHERE recipe_id = %s AND groceries_designation = %s"""
        cursor.execute(command, (quantity, unit, recipe_id, groceries_designation))
        self._cnx.commit()
        cursor.close()

    def insert_recipe_entry(self, recipe_entry):
        """Insert or update a RecipeEntry object into the database."""
        cursor = self._cnx.cursor()
        cursor.execute("SELECT recipe_id FROM recipe LIMIT 1")
        result = cursor.fetchone()
        recipe_id = result[0]

        existing_entry = self.get_existing_entry(recipe_id, recipe_entry.get_groceries_designation())

        if existing_entry:
            # Update the existing entry
            new_quantity = existing_entry[0] + recipe_entry.get_quantity()
            self.update_recipe_entry(recipe_id, recipe_entry.get_groceries_designation(), new_quantity, recipe_entry.get_unit())
        else:
            # Insert the new entry
            command = """INSERT INTO recipe_groceries (recipe_id, groceries_designation, quantity, unit)
                         VALUES (%s, %s, %s, %s)"""
            data = (recipe_id, recipe_entry.get_groceries_designation(), recipe_entry.get_quantity(), recipe_entry.get_unit())
            cursor.execute(command, data)
            self._cnx.commit()
        cursor.close()

    def find_recipe_by_id(self, recipe_id):
        """Find a Recipe by its ID."""
        cursor = self._cnx.cursor()
        cursor.execute("SELECT id, recipe_title, number_of_persons, creator FROM recipe WHERE id = %s", (recipe_id,))
        result = cursor.fetchone()
        if result:
            recipe = Recipe()
            recipe.set_id(result[0])
            recipe.set_title(result[1])
            recipe.set_number_of_persons(result[2])
            recipe.set_creator(result[3])
            cursor.close()
            return recipe
        cursor.close()
        return None

    def find_entries_by_recipe_id(self, recipe_id):
        """Find all entries associated with a specific recipe ID."""
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT groceries_designation, quantity, unit FROM recipe_groceries WHERE recipe_id = %s",
                       (recipe_id,))
        entries = cursor.fetchall()
        for groceries_designation, quantity, unit in entries:
                entry = RecipeEntry()
                entry.set_recipe_id(recipe_id)
                entry.set_groceries_designation(groceries_designation)
                entry.set_quantity(quantity)
                entry.set_unit(unit)
                result.append(entry)
        cursor.close()
        return result

    def find_all_entries(self):
        """Find all entries in the database."""
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT id, groceries_designation, quantity, unit FROM recipe_groceries")
        tuples = cursor.fetchall()

        for (recipe_id, groceries_designation, quantity, unit) in tuples:
            recipe_entry = RecipeEntry()
            recipe_entry.set_recipe_id(recipe_id)
            recipe_entry.set_groceries_designation(groceries_designation)
            recipe_entry.set_quantity(quantity)
            recipe_entry.set_unit(unit)
            result.append(recipe_entry)

        self._cnx.commit()
        cursor.close()

        return result

    def find_all_recipes(self):
        """Auslesen aller Rezepte.

        :return Eine Sammlung mit Recipe-Objekten, die sämtliche Rezepte repräsentieren.
        """
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT id, recipe_title, number_of_persons, creator, description FROM recipe")
        tuples = cursor.fetchall()

        for (recipe_id, title, number_of_persons, creator, description) in tuples:
            recipe = Recipe()
            recipe.set_id(recipe_id)
            recipe.set_title(title)
            recipe.set_number_of_persons(number_of_persons)
            recipe.set_creator(creator)
            recipe.set_description(description)
            result.append(recipe)

        self._cnx.commit()
        cursor.close()

        return result

    def delete_recipe_entry(self, recipe_entry, recipe_id):
        """Delete a RecipeEntry object from the database."""
        cursor = self._cnx.cursor()
        command = "DELETE FROM recipe_groceries WHERE recipe_id = %s AND groceries_designation = %s"
        cursor.execute(command, (recipe_id, recipe_entry.get_groceries_designation()))
        self._cnx.commit()
        cursor.close()

    def delete(self, recipe):
        """Delete a Recipe object from the database."""
        cursor = self._cnx.cursor()
        command = "DELETE FROM recipe WHERE id = %s"
        cursor.execute(command, (recipe.get_id(),))
        self._cnx.commit()
        cursor.close()




