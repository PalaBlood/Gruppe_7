
"""
from Gruppe_7.src.server.bo.Household import Household
from Gruppe_7.src.server.bo.User import User
from Gruppe_7.src.server.db.UserMapper import UserMapper
from Gruppe_7.src.server.db.Mapper import Mapper
"""

from src.server.bo.Household import Household
from src.server.bo.User import User
from src.server.db.Mapper import Mapper
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
        """Auslesen aller Haushalte.

        :return Eine Sammlung mit Household-Objekten, die sämtliche Haushalte repräsentieren.
        """
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * FROM households")
        tuples = cursor.fetchall()

        for (id,) in tuples:
            household = Household()
            household.set_id(id)

            command = "SELECT user_id FROM household_users WHERE household_id=%s"
            cursor.execute(command, (id,))
            users = cursor.fetchall()

            for (id,) in users:
                household.add_user(UserMapper().find_by_id(id))

            result.append(household)

        self._cnx.commit()
        cursor.close()

        return result




    def insert(self, household):
        """Einfügen eines Household-Objekts in die Datenbank.

        Dabei wird auch der Primärschlüssel des übergebenen Objekts geprüft und ggf.
        berichtigt.

        :param household das zu speichernde Objekt
        :return das bereits übergebene Objekt, jedoch mit ggf. korrigierter ID.
        """
        cursor = self._cnx.cursor()

        cursor.execute("SELECT MAX(id) AS maxid FROM household")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            household.set_id(maxid[0] + 1)

        command = "INSERT INTO household (id, fridge_id) VALUES (%s, %s)"
        data = (household.get_id(),household.get_id() + 1)
        cursor.execute(command, data)

        for user_id in household.get_users():
            command = "INSERT INTO household_users (household_id, user_id) VALUES (%s, %s)"
            data = (household.get_id(), user_id)
            cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return household

 


    def find_by_id(self, key):
        """Suchen eines Haushalts mit vorgegebener ID. Da diese eindeutig ist,
        wird genau ein Objekt zurückgegeben.

        :param key Primärschlüsselattribut (->DB)
        :return Household-Objekt, das dem übergebenen Schlüssel entspricht, None bei
            nicht vorhandenem DB-Tupel.
        """
        result = None
        cursor = self._cnx.cursor()
        command = "SELECT id FROM households WHERE id=%s"
        cursor.execute(command, (key,))
        tuples = cursor.fetchall()

        try:
            (id,) = tuples[0]
            household = Household()
            household.set_id(id)

            command = "SELECT user_id FROM household_users WHERE household_id=%s"
            cursor.execute(command, (id,))
            users = cursor.fetchall()

            for (id,) in users:
                household.add_user(UserMapper().find_by_id(id))

            result = household
        except IndexError:
            result = None

        self._cnx.commit()
        cursor.close()

        return result





    def update(self, household):
        """Wiederholtes Schreiben eines Objekts in die Datenbank.

        :param household das Objekt, das in die DB geschrieben werden soll
        """
        cursor = self._cnx.cursor()
        command = "DELETE FROM household_users WHERE household_id=%s"
        cursor.execute(command, (household.get_id(),))

        for user_id in household.get_users():
            command = "INSERT INTO household_users (household_id, user_id) VALUES (%s, %s)"
            data = (household.get_id(), user_id)
            cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()




    def delete(self, household):
        """Löschen der Daten eines Household-Objekts aus der Datenbank.

        :param household das aus der DB zu löschende "Objekt"
        """
        cursor = self._cnx.cursor()
        command = "DELETE FROM household_users WHERE household_id=%s"
        cursor.execute(command, (household.get_id(),))

        command = "DELETE FROM households WHERE id=%s"
        cursor.execute(command, (household.get_id(),))

        self._cnx.commit()
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
