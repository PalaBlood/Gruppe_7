"""
from Gruppe_7.src.server.db.Mapper import Mapper
from Gruppe_7.src.server.bo.Fridge import Fridge
from Gruppe_7.src.server.bo.Groceries import Groceries
from Gruppe_7.src.server.db.GroceriesMapper import GroceriesMapper
"""


from server.db.Mapper import Mapper
from server.bo.Fridge import Fridge
from server.bo.Groceries import Groceries
from server.db.GroceriesMapper import GroceriesMapper

class FridgeMapper(Mapper):
    """Mapper-Klasse, die Fridge-Objekte auf eine relationale
    Datenbank abbildet. Hierzu wird eine Reihe von Methoden zur Verfügung
    gestellt, mit deren Hilfe z.B. Objekte gesucht, erzeugt, modifiziert und
    gelöscht werden können. Das Mapping ist bidirektional. D.h., Objekte können
    in DB-Strukturen und DB-Strukturen in Objekte umgewandelt werden.
    """

    def __init__(self):
        super().__init__()
        
        
        
    def find_all(self):
        """Auslesen aller Fridges.

        :return Eine Sammlung mit Fridge-Objekten, die sämtliche Fridges repräsentieren.
        """
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * FROM fridges")
        tuples = cursor.fetchall()

        for (id,) in tuples:
            fridge = Fridge()
            fridge.set_id(id)

            command = "SELECT grocery_id FROM fridge_contents WHERE fridge_id=%s"
            cursor.execute(command, (id,))
            groceries = cursor.fetchall()

            for (grocery_id,) in groceries:
                fridge.add_content(GroceriesMapper().find_by_id(grocery_id))

            result.append(fridge)

        self._cnx.commit()
        cursor.close()

        return result



    def insert(self, fridge):
        """Einfügen eines Fridge-Objekts in die Datenbank.

        Dabei wird auch der Primärschlüssel des übergebenen Objekts geprüft und ggf.
        berichtigt.

        :param fridge das zu speichernde Objekt
        :return das bereits übergebene Objekt, jedoch mit ggf. korrigierter ID.
        """
        
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM fridges")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            fridge.set_id(maxid[0] + 1)

        command = "INSERT INTO fridges (id) VALUES (%s)"
        data = (fridge.get_id(),)
        cursor.execute(command, data)

        for grocery_id in fridge.get_content():
            command = "INSERT INTO fridge_contents (fridge_id, grocery_id) VALUES (%s, %s)"
            data = (fridge.get_id(), grocery_id)
            cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return fridge



    def find_by_id(self, id):
        """Suchen eines Fridges mit vorgegebener ID. Da diese eindeutig ist,
        wird genau ein Objekt zurückgegeben.

        :param key Primärschlüsselattribut (->DB)
        :return Fridge-Objekt, das dem übergebenen Schlüssel entspricht, None bei
            nicht vorhandenem DB-Tupel.
        """
        result = None
        cursor = self._cnx.cursor()
        command = "SELECT id FROM fridges WHERE id=%s"
        cursor.execute(command, (id,))
        tuples = cursor.fetchall()

        try:
            (id,) = tuples[0]
            fridge = Fridge()
            fridge.set_id(id)

            command = "SELECT grocery_id FROM fridge_contents WHERE fridge_id=%s"
            cursor.execute(command, (id,))
            groceries = cursor.fetchall()

            for (grocery_id,) in groceries:
                fridge.add_content(GroceriesMapper().find_by_id(grocery_id))

            result = fridge
        except IndexError:
            result = None

        self._cnx.commit()
        cursor.close()

        return result




    def update(self, fridge):
        """Wiederholtes Schreiben eines Objekts in die Datenbank.

        :param fridge das Objekt, das in die DB geschrieben werden soll
        """
        cursor = self._cnx.cursor()
        command = "DELETE FROM fridge_contents WHERE fridge_id=%s"
        cursor.execute(command, (fridge.get_id(),))

        for grocery_id in fridge.get_content():
            command = "INSERT INTO fridge_contents (fridge_id, grocery_id) VALUES (%s, %s)"
            data = (fridge.get_id(), grocery_id)
            cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()




    def delete(self, fridge):
        """Löschen der Daten eines Fridge-Objekts aus der Datenbank.

        :param fridge das aus der DB zu löschende "Objekt"
        """
        cursor = self._cnx.cursor()
        command = "DELETE FROM fridge_contents WHERE fridge_id=%s"
        cursor.execute(command, (fridge.get_id(),))

        command = "DELETE FROM fridges WHERE id=%s"
        cursor.execute(command, (fridge.get_id(),))

        self._cnx.commit()
        cursor.close()
