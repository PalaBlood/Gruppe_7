"""
from Gruppe_7.src.server.bo.User import User
from Gruppe_7.src.server.db.Mapper import Mapper
"""


from server.bo.User import User
from server.db.Mapper import Mapper



class UserMapper (Mapper):
    """Mapper-Klasse, die User-Objekte auf eine relationale
    Datenbank abbildet. Hierzu wird eine Reihe von Methoden zur Verfügung
    gestellt, mit deren Hilfe z.B. Objekte gesucht, erzeugt, modifiziert und
    gelöscht werden können. Das Mapping ist bidirektional. D.h., Objekte können
    in DB-Strukturen und DB-Strukturen in Objekte umgewandelt werden.
    """

    def __init__(self):
        super().__init__()



    def find_existing_household_id(self):
        cursor = self._cnx.cursor()
        query = "SELECT id FROM household LIMIT 1"
        cursor.execute(query)
        result = cursor.fetchone()
        cursor.close()
        if result:
            return result[0]
        return None

    def find_all(self):
        """Auslesen aller User. :return Eine Sammlung mit User-Objekten, die sämtliche User repräsentieren.
        """
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT nick_name, first_name, last_name, id, household_id FROM users")
        tuples = cursor.fetchall()

        for (nick_name, first_name, last_name, id, household_id) in tuples:
            user = User()
            user.set_nick_name(nick_name)
            user.set_last_name(last_name)
            user.set_first_name(first_name)
            user.set_id(id)
            user.set_household_id(household_id)
            result.append(user)

        self._cnx.commit()
        cursor.close()

        return result


    def insert(self, user):
        """Einfügen eines User-Objekts in die Datenbank.

        Dabei wird auch der Primärschlüssel des übergebenen Objekts geprüft und ggf.
        berichtigt.

        :param user das zu speichernde Objekt
        :return das bereits übergebene Objekt, jedoch mit ggf. korrigierter ID.
        """
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM users")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            user.set_id(maxid[0] + 1)

        household_id = self.find_existing_household_id()

        user.set_household_id(household_id)

        command = "INSERT INTO users (id, nick_name, first_name, last_name, household_id) VALUES (%s, %s, %s, %s, %s)"
        data = (user.get_id(), user.get_nick_name(), user.get_first_name(), user.get_last_name(), user.get_household_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return user

    def find_by_nickname(self, nick_name):
        """Auslesen aller Benutzer anhand des Benutzernamens.

        :param nickname Name der zugehörigen Benutzer.
        :return Eine Sammlung mit User-Objekten, die sämtliche Benutzer
            mit dem gewünschten Namen enthält.
        """
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT id, nick_name, first_name, last_name FROM users WHERE nick_name LIKE '{}' ORDER BY nick_name".format(nick_name)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, nick_name, first_name, last_name) in tuples:
            user = User()
            user.set_id(id)
            user.set_nick_name(nick_name)
            user.set_first_name(first_name)
            user.set_last_name(last_name)
            result.append(user)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_id(self, id):
        """Suchen eines Users mit vorgegebener ID. Da diese eindeutig ist,
        wird genau ein Objekt zurückgegeben.

        :param key Primärschlüsselattribut (->DB)
        :return User-Objekt, das dem übergebenen Schlüssel entspricht, None bei
            nicht vorhandenem DB-Tupel.
        """
        result = None
        cursor = self._cnx.cursor()
        command = "SELECT id, nick_name, first_name, last_name FROM users WHERE id=%s".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, nick_name, first_name, last_name) = tuples[0]
            user = User()
            user.set_id(id)
            user.set_nick_name(nick_name)
            user.set_first_name(first_name)
            user.set_last_name(last_name)
            result = user
            
        except IndexError:
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def update(self, user):
        """Wiederholtes Schreiben eines Objekts in die Datenbank.

        :param user das Objekt, das in die DB geschrieben werden soll
        """
        cursor = self._cnx.cursor()
        command = "UPDATE users SET nickname=%s, first_name=%s, last_name=%s, user_id=%s WHERE id=%s"
        data = (user.get_nickname(), user.get_first_name(), user.get_last_name(), user.get_id(), user.get_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, user):
        """Löschen der Daten eines User-Objekts aus der Datenbank.

        :param user das aus der DB zu löschende "Objekt"
        """
        cursor = self._cnx.cursor()
        command = "DELETE FROM users WHERE id=%s"
        cursor.execute(command, (user.get_id(),))

        self._cnx.commit()
        cursor.close()






