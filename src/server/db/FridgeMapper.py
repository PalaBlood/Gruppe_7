"""
from Gruppe_7.src.server.db.Mapper import Mapper
from Gruppe_7.src.server.bo.Fridge import Fridge
from Gruppe_7.src.server.bo.Groceries import Groceries
from Gruppe_7.src.server.db.GroceriesMapper import GroceriesMapper
"""

import unittest
from server.db.Mapper import Mapper
from server.bo.Fridge import Fridge
from server.bo.Groceries import Groceries
from server.db.GroceriesMapper import GroceriesMapper

from src.server.db.Mapper import Mapper
from src.server.bo.Fridge import Fridge
from src.server.bo.Groceries import Groceries

class FridgeMapper(Mapper):
    """Mapper-Klasse, die Fridge-Objekte auf eine relationale
    Datenbank abbildet. Hierzu wird eine Reihe von Methoden zur Verfügung
    gestellt, mit deren Hilfe z.B. Objekte gesucht, erzeugt, modifiziert und
    gelöscht werden können. Das Mapping ist bidirektional. D.h., Objekte können
    in DB-Strukturen und DB-Strukturen in Objekte umgewandelt werden.
    """

    def __init__(self):
        super().__init__()

    def insert(self, fridge):
        """Einfügen eines Fridge-Objekts in die Datenbank.

        Dabei wird auch der Primärschlüssel des übergebenen Objekts geprüft und ggf.
        berichtigt.

        :param fridge: das zu speichernde Objekt
        :return: das bereits übergebene Objekt, jedoch mit ggf. korrigierter ID.
        """
        
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(fridge_id) AS maxid FROM fridge")
        tuples = cursor.fetchall()

        maxid = tuples[0][0] if tuples[0][0] is not None else 0
        fridge.set_fridge_id(maxid + 1)

        command = "INSERT INTO fridge (fridge_id) VALUES (%s)"
        data = (fridge.get_fridge_id(),)
        cursor.execute(command, data)

        for groceries in fridge.get_content():
            command = """INSERT INTO Fridge_Groceries (fridge_id, groceries_id, quantity, unit)
                         VALUES (%s, %s, %s, %s)"""
            data = (fridge.get_fridge_id(), groceries.get_groceries_id(), groceries.get_quantity(), groceries.get_unit())
            cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return fridge

    def find_by_id(self, id):
        """Suchen eines Fridges mit vorgegebener ID. Da diese eindeutig ist,
        wird genau ein Objekt zurückgegeben.

        :param id: Primärschlüsselattribut (->DB)
        :return: Fridge-Objekt, das dem übergebenen Schlüssel entspricht, None bei
            nicht vorhandenem DB-Tupel.
        """
        result = None
        cursor = self._cnx.cursor()
        command = "SELECT fridge_id FROM fridge WHERE fridge_id=%s"
        cursor.execute(command, (id,))
        tuples = cursor.fetchall()

        try:
            (fridge_id,) = tuples[0]
            fridge = Fridge()
            fridge.set_fridge_id(fridge_id)

            command = "SELECT groceries_id, quantity, unit FROM Fridge_Groceries WHERE fridge_id=%s"
            cursor.execute(command, (fridge_id,))
            groceries_list = cursor.fetchall()

            for (groceries_id, quantity, unit) in groceries_list:
                groceries = Groceries()
                groceries.set_groceries_id(groceries_id)
                groceries.set_quantity(quantity)
                groceries.set_unit(unit)
                fridge.add_content(groceries)

            result = fridge
        except IndexError:
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_all(self):
        """Auslesen aller Fridges.

        :return Eine Sammlung mit Fridge-Objekten, die sämtliche Fridges repräsentieren.
        """
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT fridge_id FROM fridge")
        tuples = cursor.fetchall()

        for (fridge_id,) in tuples:
            fridge = self.find_by_id(fridge_id)
            if fridge:
                result.append(fridge)

        self._cnx.commit()
        cursor.close()

        return result

    def update(self, fridge):
        """Wiederholtes Schreiben eines Objekts in die Datenbank.

        :param fridge: das Objekt, das in die DB geschrieben werden soll
        """
        cursor = self._cnx.cursor()
        
        command = "DELETE FROM Fridge_Groceries WHERE fridge_id=%s"
        cursor.execute(command, (fridge.get_fridge_id(),))

       
