
"""
from Gruppe_7.src.server.bo.Household import Household
from Gruppe_7.src.server.bo.User import User
from Gruppe_7.src.server.db.UserMapper import UserMapper
from Gruppe_7.src.server.db.Mapper import Mapper
"""

from Household import Household
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
            cursor.execute("SELECT id, name FROM household")
            tuples = cursor.fetchall()

            for (id, name) in tuples:
                household = Household()
                household.set_id(id)
                household.set_name(name)
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
        """Insert a Household object into the database."""
        cursor = self._cnx.cursor()
        name = household.get_name()
        cursor.execute("INSERT INTO household (name) VALUES (%s)",(name,))
        household.set_id(cursor.lastrowid)
        self._cnx.commit()
        return household

    def find_by_id(self, id):
        """Find a Household by its ID."""
        cursor = self._cnx.cursor()
        cursor.execute("SELECT id FROM household WHERE id=%s", (id,))
        tuple = cursor.fetchone()
        if tuple:
            # Create a Household object

            household = Household()
            household.set_id(tuple[0])

            # Retrieve all users associated with this household
            cursor.execute("SELECT id, nick_name, first_name, last_name, household_id FROM users WHERE household_id=%s",
                           (household.get_id(),))
            users = cursor.fetchall()

            # Create User objects for each retrieved user record and add to the Household
            for (user_id, nick_name, first_name, last_name, household_id) in users:
                user = User()
                user.set_id(user_id)
                user.set_nick_name(nick_name)
                user.set_first_name(first_name)
                user.set_last_name(last_name)
                user.set_household_id(household_id)
                household.add_user(user)

            return household

    def update(self, household):
        """Update household data in the database and re-associate users."""
        cursor = self._cnx.cursor()
        try:

            command = "UPDATE households SET name = %s WHERE id = %s"
            cursor.execute(command, (household.get_name(), household.get_id()))

            for user_id in household.get_users():
                command = "INSERT INTO household_users (household_id, user_id) VALUES (%s, %s)"
                data = (household.get_id(), user_id)
                cursor.execute(command, data)

            self._cnx.commit()
        except Exception as e:
            print(f"An error occurred while updating the household: {e}")
            self._cnx.rollback()
        finally:
            cursor.close()

    def delete(self, household):

        cursor = self._cnx.cursor()
        try:

            command = "DELETE FROM users WHERE household_id = %s"
            cursor.execute(command, (household.get_id(),))


            command = "DELETE FROM households WHERE id = %s"
            cursor.execute(command, (household.get_id(),))

            self._cnx.commit()
        except Exception as e:
            print(f"An error occurred while deleting the household: {e}")
            self._cnx.rollback()
        finally:
            cursor.close()

if __name__ == "__main__":
    household_mapper = HouseholdMapper()

    # Einfügen eines neuen Haushalts
    household = Household()
    household.set_id(1)  # Setzen der ID für das Beispiel

    # Hinzufügen von Usern
    user1 = User()
    user1.set_id(1)
    household.add_user(user1)

    user2 = User()
    user2.set_id(2)
    household.add_user(user2)

    household_mapper.insert(household)

    # Auslesen aller Haushalte
    all_households = household_mapper.find_all()
    for hsh in all_households:
        print(f"Household ID: {hsh.get_id()}, Users: {hsh.get_users()}")

    # Suchen eines Haushalts anhand der ID
    found_household = household_mapper.find_by_key(household.get_id())
    if found_household:
        print(f"Gefundenes Household - ID: {found_household.get_id()}, Users: {found_household.get_users()}")

    # Aktualisieren eines Haushalts
    new_user = User()
    new_user.set_id(3)
    found_household.add_user(new_user)
    household_mapper.update(found_household)

    # Löschen eines Haushalts
    household_mapper.delete(found_household)
