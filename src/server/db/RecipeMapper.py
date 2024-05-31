
"""
from Gruppe_7.src.server.db.Mapper import Mapper
from Gruppe_7.src.server.bo.Recipe import Recipe
from Gruppe_7.src.server.db.GroceriesMapper import GroceriesMapper
from Gruppe_7.src.server.db.UserMapper import UserMapper
"""

from server.db.UserMapper import UserMapper
from server.db.Mapper import Mapper
from server.bo.Recipe import Recipe





####################

class RecipeMapper(Mapper):
    """Mapper-Klasse, die Fridge-Objekte auf eine relationale
      Datenbank abbildet. Hierzu wird eine Reihe von Methoden zur Verfügung
      gestellt, mit deren Hilfe z.B. Objekte gesucht, erzeugt, modifiziert und
      gelöscht werden können. Das Mapping ist bidirektional. D.h., Objekte können
      in DB-Strukturen und DB-Strukturen in Objekte umgewandelt werden.
      """


    def __init__(self):
        super().__init__()


    def insert_recipe(self, recipe):

        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(recipe_id) AS maxid FROM fridge")
        tuples = cursor.fetchall()

        maxid = tuples[0][0] if tuples[0][0] is not None else 0
        recipe.set_id(maxid +1)

        command = "INSERT INTO recipe (id, title, number_of_persons, creator) VALUES (%s, %s, %s, %s)"
        data = (recipe.get_id(),
                recipe.set_title(),
                recipe.set_number_of_persons(),
                recipe.set_creator())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return recipe




