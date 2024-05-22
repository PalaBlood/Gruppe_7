
"""
from Gruppe_7.src.server.db.Mapper import Mapper
from Gruppe_7.src.server.bo.Recipe import Recipe
from Gruppe_7.src.server.db.GroceriesMapper import GroceriesMapper
from Gruppe_7.src.server.db.UserMapper import UserMapper
"""


from server.db.Mapper import Mapper
from server.bo.Recipe import Recipe
from server.db.GroceriesMapper import GroceriesMapper
from server.db.UserMapper import UserMapper

class RecipeMapper(Mapper):
    """Mapper-Klasse, die Recipe-Objekte auf eine relationale
    Datenbank abbildet. Hierzu wird eine Reihe von Methoden zur Verfügung
    gestellt, mit deren Hilfe z.B. Objekte gesucht, erzeugt, modifiziert und
    gelöscht werden können. Das Mapping ist bidirektional. D.h., Objekte können
    in DB-Strukturen und DB-Strukturen in Objekte umgewandelt werden.
    """

    def __init__(self):
        super().__init__()
        
    
    
    def find_all(self):
        """Auslesen aller Rezepte.

        :return Eine Sammlung mit Recipe-Objekten, die sämtliche Rezepte repräsentieren.
        """
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * from recipes")
        tuples = cursor.fetchall()

        for (id, title, number_of_persons, creator_id) in tuples:
            recipe = Recipe()
            recipe.set_id(id)
            recipe.set_title(title)
            recipe.set_number_of_persons(number_of_persons)
            recipe.set_creator(UserMapper().find_by_id(creator_id))  # Angenommen, UserMapper ist bereits implementiert.

            command = "SELECT groceries_id FROM recipe_ingredients WHERE recipe_id=%s"
            cursor.execute(command, (id,))
            ingredients = cursor.fetchall()

            for (groceries_id,) in ingredients:
                recipe.add_content(GroceriesMapper().find_by_id(groceries_id)) # Angenommen, GroceriesMapper ist bereits implementiert.

            result.append(recipe)

        self._cnx.commit()
        cursor.close()

        return result




    def insert(self, recipe):
        """Einfügen eines Recipe-Objekts in die Datenbank.

        Dabei wird auch der Primärschlüssel des übergebenen Objekts geprüft und ggf.
        berichtigt.

        :param recipe das zu speichernde Objekt
        :return das bereits übergebene Objekt, jedoch mit ggf. korrigierter ID.
        """
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM recipes ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            recipe.set_id(maxid[0] + 1)

        command = "INSERT INTO recipes (id, title, number_of_persons, creator_id) VALUES (%s, %s, %s, %s)"
        data = (recipe.get_id(), recipe.get_title(), recipe.get_number_of_persons(), recipe.get_creator().get_id())
        cursor.execute(command, data)

        for content in recipe.get_content():
            command = "INSERT INTO recipe_ingredients (recipe_id, grocery_id, quantity, unit_of_measurement) VALUES (%s, %s, %s, %s)"
            groceries = GroceriesMapper().find_by_id(content)  # Angenommen, GroceriesMapper ist bereits implementiert.
            data = (recipe.get_id(), groceries.get_id(), groceries.get_quantity(), groceries.get_unit_of_measurement())
            cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return recipe

   
   

    def find_by_id(self, key):
        """Suchen eines Rezepts mit vorgegebener ID. Da diese eindeutig ist,
        wird genau ein Objekt zurückgegeben.

        :param key Primärschlüsselattribut (->DB)
        :return Recipe-Objekt, das dem übergebenen Schlüssel entspricht, None bei
            nicht vorhandenem DB-Tupel.
        """
        result = None
        cursor = self._cnx.cursor()
        command = "SELECT id, title, number_of_persons, creator_id FROM recipes WHERE id=%s"
        cursor.execute(command, (key,))
        tuples = cursor.fetchall()

        try:
            (id, title, number_of_persons, creator_id) = tuples[0]
            recipe = Recipe()
            recipe.set_id(id)
            recipe.set_title(title)
            recipe.set_number_of_persons(number_of_persons)
            recipe.set_creator(UserMapper().find_by_id(creator_id))  # Angenommen, UserMapper ist bereits implementiert.

            command = "SELECT grocery_id FROM recipe_ingredients WHERE recipe_id=%s"
            cursor.execute(command, (id,))
            ingredients = cursor.fetchall()

            for (grocery_id,) in ingredients:
                recipe.add_content(GroceriesMapper().find_by_id(grocery_id)) # Angenommen, GroceriesMapper ist bereits implementiert.

            result = recipe
        except IndexError:
            result = None

        self._cnx.commit()
        cursor.close()

        return result




    def update(self, recipe):
        """Wiederholtes Schreiben eines Objekts in die Datenbank.

        :param recipe das Objekt, das in die DB geschrieben werden soll
        """
        cursor = self._cnx.cursor()
        command = "UPDATE recipes SET title=%s, number_of_persons=%s, creator_id=%s WHERE id=%s"
        data = (recipe.get_title(), recipe.get_number_of_persons(), recipe.get_creator().get_id(), recipe.get_id())
        cursor.execute(command, data)

        command = "DELETE FROM recipe_ingredients WHERE recipe_id=%s"
        cursor.execute(command, (recipe.get_id(),))

        for content in recipe.get_content():
            command = "INSERT INTO recipe_ingredients (recipe_id, grocery_id, quantity, unit_of_measurement) VALUES (%s, %s, %s, %s)"
            grocery = GroceriesMapper().find_by_id(content)  # Angenommen, GroceriesMapper ist bereits implementiert.
            data = (recipe.get_id(), grocery.get_id(), grocery.get_quantity(), grocery.get_unit_of_measurement())
            cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, recipe):
        """Löschen der Daten eines Recipe-Objekts aus der Datenbank.

        :param recipe das aus der DB zu löschende "Objekt"
        """
        cursor = self._cnx.cursor()
        command = "DELETE FROM recipe_ingredients WHERE recipe_id=%s"
        cursor.execute(command, (recipe.get_id(),))

        command = "DELETE FROM recipes WHERE id=%s"
        cursor.execute(command, (recipe.get_id(),))

        self._cnx.commit()
        cursor.close()