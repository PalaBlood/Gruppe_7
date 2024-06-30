
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

            command = ("""INSERT INTO recipe (id, recipe_title, number_of_persons, creator, recipe_description, 
                        household_id)
                        VALUES (%s, %s, %s, %s, %s, %s)""")
            data = (recipe.get_id(), recipe.get_title(), recipe.get_number_of_persons(), recipe.get_creator(),
                    recipe.get_description(), recipe.get_household_id())
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



    def update_recipe(self, recipe):
        """Update an existing recipe in the database."""
        print(recipe)
        cursor = self._cnx.cursor()
        print(recipe)
        command = """UPDATE recipe
                       SET recipe_title = %s, number_of_persons = %s, creator = %s, recipe_description = %s
                       WHERE id = %s"""
        data = (recipe.get_title(), recipe.get_number_of_persons(), recipe.get_creator(), recipe.get_description(),
                recipe.get_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()



    def update_recipe_entry(self, recipe_entry):
        print(recipe_entry)
        """Update an existing recipe entry in the database."""
        cursor = self._cnx.cursor()
        command = """UPDATE recipe_groceries
                     SET recipe_id = %s, groceries_designation = %s, quantity = %s, unit = %s
                     WHERE recipe_id = %s AND groceries_designation = %s"""
        data = (recipe_entry.get_recipe_id(), recipe_entry.get_groceries_designation(), recipe_entry.get_quantity,
                recipe_entry.get_unit)
        self._cnx.commit()
        cursor.close()




    def insert_recipe_entry(self, recipe_entry):
        cursor = self._cnx.cursor()
        cursor.execute("SELECT quantity FROM recipe_groceries WHERE groceries_designation = %s AND recipe_id = %s",
                    (recipe_entry.get_groceries_designation(), recipe_entry.get_recipe_id()))
        result = cursor.fetchone()

        if result:
            # Update the existing entry
            existing_quantity = float(result[0])
            new_quantity = existing_quantity + float(recipe_entry.get_quantity())
            cursor.execute(
                "UPDATE recipe_groceries SET quantity = %s WHERE groceries_designation = %s AND recipe_id = %s",
                (new_quantity, recipe_entry.get_groceries_designation(), recipe_entry.get_recipe_id()))
        else:
            # Insert the new entry
            command = """INSERT INTO recipe_groceries (recipe_id, groceries_designation, quantity, unit)
                        VALUES (%s, %s, %s, %s)"""
            data = (recipe_entry.get_recipe_id(), recipe_entry.get_groceries_designation(), recipe_entry.get_quantity(), recipe_entry.get_unit())
            cursor.execute(command, data)
            
        self._cnx.commit()
        cursor.close()

        


    def find_recipe_by_id(self, recipe_id):
        """Find a Recipe by its ID."""
        cursor = self._cnx.cursor()
        cursor.execute("SELECT id, recipe_title, number_of_persons, creator, recipe_description, household_id FROM recipe WHERE id = %s", (recipe_id,))
        result = cursor.fetchone()
        if result:
            recipe = Recipe()
            recipe.set_id(result[0])
            recipe.set_title(result[1])
            recipe.set_number_of_persons(result[2])
            recipe.set_creator(result[3])
            recipe.set_description(result[4])
            recipe.set_household_id(result[5])
            cursor.close()
            return recipe

        cursor.close()
        return None



    def find_recipes_by_household_id(self, household_id):
        """Find all recipes by household ID."""
        cursor = self._cnx.cursor()
        cursor.execute("SELECT id, recipe_title, number_of_persons, creator, recipe_description, household_id FROM recipe WHERE household_id = %s", (household_id,))
        rows = cursor.fetchall()

        recipes = []
        for row in rows:
            recipe = Recipe()
            recipe.set_id(row[0])
            recipe.set_title(row[1])
            recipe.set_number_of_persons(row[2])
            recipe.set_creator(row[3])
            recipe.set_description(row[4])
            recipe.set_household_id(row[5])
            recipes.append(recipe)

        cursor.close()
        return recipes



    def find_entries_by_recipe_id(self, recipe_id):
        """Find all entries by recipe ID."""
        cursor = self._cnx.cursor()
        cursor.execute("SELECT recipe_id, groceries_designation, quantity, unit FROM recipe_groceries WHERE recipe_id = %s", (recipe_id,))
        rows = cursor.fetchall()

        entries = []
        for row in rows:
            # Initialize the RecipeEntry
            entry = RecipeEntry()
            entry.set_recipe_id(row[0])
            entry.set_groceries_designation(row[1])
            entry.set_quantity(row[2])
            entry.set_unit(row[3])
            entries.append(entry)

        cursor.close()
        return entries



    def find_all_entries(self):
        """Find all entries in the database."""
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT recipe_id, groceries_designation, quantity, unit FROM recipe_groceries")
        tuples = cursor.fetchall()

        for (recipe_id, groceries_designation, quantity, unit) in tuples:
            recipe_entry = RecipeEntry(recipe_id,groceries_designation,quantity,unit)
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
        cursor.execute("SELECT id, recipe_title, number_of_persons, creator, recipe_description, household_id FROM recipe")
        tuples = cursor.fetchall()

        for (id, title, number_of_persons, creator, description, household_id) in tuples:
            print(f"Debug: {id}, {title}, {number_of_persons}, {creator}, {description}, {household_id}")  # Debug-Ausgabe
            recipe = Recipe()
            recipe.set_id(id)
            recipe.set_title(title)
            recipe.set_number_of_persons(number_of_persons)
            recipe.set_creator(creator)
            recipe.set_description(description)
            recipe.set_household_id(household_id)
            result.append(recipe)

        cursor.close()
        return result



    def delete_recipe_entry(self, entry):
        """Delete a RecipeEntry object from the database."""
        cursor = self._cnx.cursor()
        command = "DELETE FROM recipe_groceries WHERE recipe_id = %s AND groceries_designation = %s"
        cursor.execute(command, (entry.get_recipe_id(), entry.get_groceries_designation()))
        self._cnx.commit()
        cursor.close()



    def delete_recipe(self, recipe):
        """Delete a Recipe object."""
        # Zuerst alle zugehörigen RecipeEntries löschen
        entries = self.find_entries_by_recipe_id(recipe.get_id())
        for entry in entries:
            self.delete_recipe_entry(entry)

        # Dann das Rezept löschen
        cursor = self._cnx.cursor()
        command = "DELETE FROM recipe WHERE id = %s"
        cursor.execute(command, (recipe.get_id(),))
        self._cnx.commit()
        cursor.close()



    def find_recipe_id_by_title(self, title):

        cursor = self._cnx.cursor()
        command = "SELECT id FROM recipe WHERE recipe_title = %s"
        cursor.execute(command, (title,))
        result = cursor.fetchone()
        return result



    def find_entries_by_recipe_id_and_groceries_designation(self, groceries_designation, recipe_id):
        """Find all entries by recipe ID."""
        cursor = self._cnx.cursor()
        cursor.execute(
            "SELECT recipe_id, groceries_designation, quantity, unit FROM recipe_groceries WHERE groceries_designation = %s AND recipe_id = %s",
            (groceries_designation, recipe_id,))
        result = cursor.fetchone()

        if result:
            recipe_entry = RecipeEntry()
            recipe_entry.set_recipe_id(result[0])
            recipe_entry.set_groceries_designation(result[1])
            recipe_entry.set_quantity(result[2])
            cursor.close()
            return recipe_entry
        cursor.close()
        return None



