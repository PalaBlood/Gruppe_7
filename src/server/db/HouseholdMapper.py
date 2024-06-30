
"""
from Gruppe_7.src.server.bo.Household import Household
from Gruppe_7.src.server.bo.User import User
from Gruppe_7.src.server.db.UserMapper import UserMapper
from Gruppe_7.src.server.db.Mapper import Mapper
"""

from bo.Household import Household
from server.bo.User import User
from server.db.Mapper import Mapper
from db.UserMapper import UserMapper

class HouseholdMapper(Mapper):
    """Mapper-Klasse, die Household-Objekte auf eine relationale
    Datenbank abbildet. Hierzu wird eine Reihe von Methoden zur Verfügung
    gestellt, mit deren Hilfe z.B. Objekte gesucht, erzeugt, modifiziert und
    gelöscht werden können. Das Mapping ist bidirektional. D.h., Objekte können
    in DB-Strukturen und DB-Strukturen in Objekte umgewandelt werden.
    """

    def __init__(self):
        super().__init__()

    def find_all(self):
        """Retrieve all households with associated users."""
        result = []
        cursor = self._cnx.cursor()
        try:
            cursor.execute("SELECT id, name, fridge_id FROM household")
            tuples = cursor.fetchall()

            for (id, name, fridge_id) in tuples:
                household = Household()
                household.set_id(id)
                household.set_name(name)
                household.set_fridge_id(fridge_id)
                result.append(household)

        except Exception as e:
            print(f"An error occurred while retrieving households: {e}")
        finally:
            cursor.close()

        return result

    def find_user_ids_for_household(self, household_id):
        """Helper method to find user IDs for a specific household."""
        cursor = self._cnx.cursor()
        cursor.execute("SELECT id FROM users WHERE household_id=%s", (household_id,))
        return [user_id[0] for user_id in cursor.fetchall()]

    def insert(self, household):
        """Insert a Household object into the database and set its ID."""
        cursor = self._cnx.cursor()
        print(household)
        name = household.get_name()
        fridge_id = household.get_fridge_id()

        try:
            cursor.execute("INSERT INTO household (name, fridge_id) VALUES (%s, %s)", (name, fridge_id))
            self._cnx.commit()

            #Setzen der ID, die von der Datenbank generiert wurde
            household.set_id(cursor.lastrowid)
            return household
        except Exception as e:
            print(f"Ein Fehler ist aufgetreten: {e}")
            self._cnx.rollback()
        finally:
            cursor.close()

    def find_by_id(self, id):
        """Find a Household by its ID."""
        cursor = self._cnx.cursor()
        cursor.execute("SELECT id, name, Fridge_ID FROM household WHERE id=%s", (id,))
        tuple = cursor.fetchone()
        print(tuple)

        if tuple:
            # Create a Household object

            household = Household()
            household.set_id(tuple[0])
            household.set_name(tuple[1])
            household.set_fridge_id(tuple[2])


            return household

    def update(self, household):
        """Update des Namens eines Households
        param: Household-Object"""
        cursor = self._cnx.cursor()
        try:

            command = "UPDATE household SET name = %s WHERE id = %s"
            cursor.execute(command, (household.get_name(), household.get_id()))

        except Exception as e:
            print(f"An error occurred while updating the household: {e}")
            self._cnx.rollback()
        finally:
            cursor.close()

    def delete(self, household):
        print(household)
        cursor = self._cnx.cursor()

        try:
            # Fetch fridge_id from household
            command = "SELECT fridge_id from household WHERE id = %s"
            cursor.execute(command, (household.get_id(),))
            fridge_id = cursor.fetchone()[0]

            # Delete fridge_groceries entries related to the fridge
            command = "DELETE FROM fridge_groceries WHERE fridge_id = %s"
            cursor.execute(command, (fridge_id,))

            # Delete unit entries related to the household
            command = "DELETE FROM unit WHERE household_id = %s"
            cursor.execute(command, (household.get_id(),))

            # Delete recipe_groceries entries related to recipes in this household
            command = "DELETE FROM recipe_groceries WHERE recipe_id IN (SELECT id FROM recipe WHERE household_id = %s)"
            cursor.execute(command, (household.get_id(),))

            # Delete recipe entries related to the household
            command = "DELETE FROM recipe WHERE household_id = %s"
            cursor.execute(command, (household.get_id(),))

            # Delete users entries related to the household
            command = "DELETE FROM users WHERE household_id = %s"
            cursor.execute(command, (household.get_id(),))

            # Delete fridge entry
            command = "DELETE FROM fridge WHERE id = %s"
            cursor.execute(command, (fridge_id,))

            # Finally, delete the household entry
            command = "DELETE FROM household WHERE id = %s"
            cursor.execute(command, (household.get_id(),))

            self._cnx.commit()
        except Exception as e:
            print(f"An error occurred while deleting the household: {e}")
            self._cnx.rollback()
        finally:
            cursor.close()

    def get_household_id_by_google_user_id(self, google_user_id):
        cursor = self._cnx.cursor()
        try:
            command = "SELECT household_id FROM users WHERE google_user_id = %s"
            cursor.execute(command, (google_user_id,))
            result = cursor.fetchone()
            if result:#Sollte ein Eintrag gefunden werden, wird die household_id ausgelesen
                return result[0]
            return None
        
        except Exception as e:
            print(f"An error occurred while fetching the household ID: {e}")
            self._cnx.rollback()
            return None
        
        finally:
            cursor.close()



