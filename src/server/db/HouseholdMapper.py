
"""
from Gruppe_7.src.server.bo.Household import Household
from Gruppe_7.src.server.bo.User import User
from Gruppe_7.src.server.db.UserMapper import UserMapper
from Gruppe_7.src.server.db.Mapper import Mapper
"""

from server.bo.Household import Household
from server.bo.User import User
from server.db.Mapper import Mapper
from server.db.UserMapper import UserMapper

class HouseholdMapper(Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):
        """Gibt alle Haushalte aus"""
        result = []
        cursor = self._cnx.cursor()
        try:
            cursor.execute("SELECT id, name, fridge_id, password FROM household")
            tuples = cursor.fetchall()

            for (id, name, fridge_id, password) in tuples:
                household = Household()
                household.set_id(id)
                household.set_name(name)
                household.set_fridge_id(fridge_id)
                household.set_password(password)
                result.append(household)

        except Exception as e:
            print(f"An error occurred while retrieving households: {e}")
        finally:
            cursor.close()

        return result




    def find_user_ids_for_household(self, household_id):
        """Gibt IDs aller User anhand der Haushalt ID aus"""
        cursor = self._cnx.cursor()
        cursor.execute("SELECT id FROM users WHERE household_id=%s", (household_id,))
        return [user_id[0] for user_id in cursor.fetchall()]




    def insert(self, household):
        """Erstellt einen Haushalt"""
        cursor = self._cnx.cursor()
        name = household.get_name()
        fridge_id = household.get_fridge_id()
        password = household.get_password()

        try:
            cursor.execute("INSERT INTO household (name, fridge_id, password) VALUES (%s, %s, %s)", (name, fridge_id, password))
            self._cnx.commit()

            household.set_id(cursor.lastrowid)
            cursor.execute("INSERT INTO unit (designation, household_id) VALUES (%s, %s)", ("grams", household.get_id()))
            return household
        
        except Exception as e:
            print(f"Ein Fehler ist aufgetreten: {e}")
            self._cnx.rollback()
            
        finally:
            cursor.close()



    def find_by_id(self, id):
        """Gibt einen Haushalt anhand der ID aus"""
        cursor = self._cnx.cursor()
        cursor.execute("SELECT id, name, Fridge_ID, password FROM household WHERE id=%s", (id,))
        tuple = cursor.fetchone()

        if tuple:

            household = Household()
            household.set_id(tuple[0])
            household.set_name(tuple[1])
            household.set_fridge_id(tuple[2])
            household.set_password(tuple[3])
            return household




    def update(self, household):
        """Update des Namens eines Households"""
       
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
        """Löscht einen Haushalt. Ebenfalls findet eine Löschweitergabe statt, sodass alle
        Rezepte, Maßeinheiten, sämtliche Einträge und die Fridge des jeweiligen Haushaltes entfernt werden"""
        cursor = self._cnx.cursor()

        try:
          
            command = "SELECT fridge_id from household WHERE id = %s"
            cursor.execute(command, (household.get_id(),))
            fridge_id = cursor.fetchone()[0]

            
            command = "DELETE FROM fridge_groceries WHERE fridge_id = %s"
            cursor.execute(command, (fridge_id,))

            command = "DELETE FROM unit WHERE household_id = %s"
            cursor.execute(command, (household.get_id(),))

            command = "DELETE FROM recipe_groceries WHERE recipe_id IN (SELECT id FROM recipe WHERE household_id = %s)"
            cursor.execute(command, (household.get_id(),))

            command = "DELETE FROM recipe WHERE household_id = %s"
            cursor.execute(command, (household.get_id(),))

     
            command = "DELETE FROM users WHERE household_id = %s"
            cursor.execute(command, (household.get_id(),))

       
            command = "DELETE FROM fridge WHERE id = %s"
            cursor.execute(command, (fridge_id,))

            command = "DELETE FROM household WHERE id = %s"
            cursor.execute(command, (household.get_id(),))

            self._cnx.commit()
            
        except Exception as e:
            print(f"An error occurred while deleting the household: {e}")
            self._cnx.rollback()
            
        finally:
            cursor.close()




    def get_household_id_by_google_user_id(self, google_user_id):
        """Gibt einen Haushalt anhand der Google User ID zurück"""
        cursor = self._cnx.cursor()
        try:
            command = "SELECT household_id FROM users WHERE google_user_id = %s"
            cursor.execute(command, (google_user_id,))
            result = cursor.fetchone()
            
            if result:
                return result[0]
            return None
        
        except Exception as e:
            print(f"An error occurred while fetching the household ID: {e}")
            self._cnx.rollback()
            return None
        
        finally:
            cursor.close()



