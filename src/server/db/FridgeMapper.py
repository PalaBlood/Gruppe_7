"""
from Gruppe_7.src.server.db.Mapper import Mapper
from Gruppe_7.src.server.bo.Fridge import Fridge
from Gruppe_7.src.server.bo.Groceries import Groceries
from Gruppe_7.src.server.db.GroceriesMapper import GroceriesMapper
"""

from Mapper import Mapper
from src.server.bo.FridgeEntry import FridgeEntry
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

       
    def delete(self, fridge):
        """Löschen der Daten eines Fridge-Objekts aus der Datenbank.

        :param fridge: das aus der DB zu löschende Objekt
        """
        cursor = self._cnx.cursor()
        
        
        command = "DELETE FROM Fridge_Groceries WHERE fridge_id=%s"
        cursor.execute(command, (fridge.get_fridge_id(),))

      
        command = "DELETE FROM fridge WHERE fridge_id=%s"
        cursor.execute(command, (fridge.get_fridge_id(),))

        self._cnx.commit()
        cursor.close()


##############################################################



class FridgeMapper2(Mapper):
    """Mapper-Klasse, die Fridge-Objekte auf eine relationale
    Datenbank abbildet. Hierzu wird eine Reihe von Methoden zur Verfügung
    gestellt, mit deren Hilfe z.B. Objekte gesucht, erzeugt, modifiziert und
    gelöscht werden können. Das Mapping ist bidirektional. D.h., Objekte können
    in DB-Strukturen und DB-Strukturen in Objekte umgewandelt werden.
    """

    def __init__(self):
        super().__init__()

    def insert_fridge(self, fridge):
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
        fridge.set_id(maxid + 1)

        command = "INSERT INTO fridge (fridge_id) VALUES (%s)"
        data = (fridge.get_id(),)
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return fridge

    def get_existing_entry(self, fridge_id, groceries_designation):
        cursor = self._cnx.cursor()
        query = "SELECT quantity FROM Fridge_Groceries WHERE fridge_id = %s AND groceries_designation = %s"
        cursor.execute(query, (fridge_id, groceries_designation))
        result = cursor.fetchone()
        cursor.close()
        return result

    def update_fridge_entry(self, fridge_id, groceries_designation, quantity, unit):
        """Update an existing fridge entry in the database."""
        cursor = self._cnx.cursor()
        command = """UPDATE fridge_groceries
                     SET quantity = %s, unit = %s
                     WHERE fridge_id = %s AND groceries_designation = %s"""
        cursor.execute(command, (quantity, unit, fridge_id, groceries_designation))
        self._cnx.commit()
        cursor.close()

    def insert_fridge_entry(self, fridge_entry, fridge_id):
        """Insert or update a FridgeEntry object into the database."""
        existing_entry = self.get_existing_entry(fridge_id, fridge_entry.get_groceries_designation())

        if existing_entry:
            # Update the existing entry
            new_quantity = existing_entry[0] + fridge_entry.get_quantity()
            self.update_fridge_entry(fridge_id, fridge_entry.get_groceries_designation(), new_quantity, fridge_entry.get_unit())
        else:
            # Insert the new entry
            cursor = self._cnx.cursor()
            command = """INSERT INTO Fridge_Groceries (fridge_id, groceries_designation, quantity, unit)
                         VALUES (%s, %s, %s, %s)"""
            data = (fridge_id, fridge_entry.get_groceries_designation(), fridge_entry.get_quantity(), fridge_entry.get_unit())
            cursor.execute(command, data)
            self._cnx.commit()
            cursor.close()

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
            fridge.set_id(fridge_id)

            command = "SELECT groceries_id, quantity, unit FROM Fridge_Groceries WHERE fridge_id=%s"
            cursor.execute(command, (fridge_id,))
            entries = cursor.fetchall()

            for (groceries_id, quantity, unit) in entries:
                entry = FridgeEntry()
                entry.set_groceries(groceries_id)
                entry.set_quantity(quantity)
                entry.set_unit(unit)
                fridge.add_content(entry)

            result = fridge
        except IndexError:
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_all_entries(self):

        result = []
        cursor = self._cnx.cursor()

        cursor.execute("SELECT fridge_id, groceries_designation, quantity, unit FROM fridge_groceries")
        tuples = cursor.fetchall()

        for (fridge_id, groceries_designation, quantity, unit) in tuples:
            fridge_entry = FridgeEntry()
            fridge_entry.set_fridge_id(fridge_id),
            fridge_entry.set_groceries_designation(groceries_designation)
            fridge_entry.set_quantity(quantity)
            fridge_entry.set_unit(unit)
            result.append(fridge_entry)

        self._cnx.commit()
        cursor.close()

        return result
    def find_all(self):
        """Auslesen aller Fridges.

        :return Eine Sammlung mit Fridge-Objekten, die sämtliche Fridges repräsentieren.
        """
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT id FROM fridge")
        tuples = cursor.fetchall()

        for (fridge_id,) in tuples:
            fridge = self.find_by_id(fridge_id)
            if fridge:
                result.append(fridge)

        self._cnx.commit()
        cursor.close()

        return result

    def delete_fridge_entry(self, fridge_entry, fridge_id):
        """Löschen eines FridgeEntry-Objekts aus der Datenbank.

        :param fridge_entry: das zu löschende FridgeEntry-Objekt
        :param fridge_id: die ID des Fridge, zu dem der Eintrag gehört
        """
        cursor = self._cnx.cursor()

        command = "DELETE FROM Fridge_Groceries WHERE fridge_id=%s AND groceries_id=%s"
        cursor.execute(command, (fridge_id, fridge_entry.get_groceries()))

        self._cnx.commit()
        cursor.close()

    def delete(self, fridge):
        """Löschen der Daten eines Fridge-Objekts aus der Datenbank.

        :param fridge: das aus der DB zu löschende Objekt
        """
        cursor = self._cnx.cursor()

        # Lösche die Einträge aus der Verknüpfungstabelle
        command = "DELETE FROM Fridge_Groceries WHERE fridge_id=%s"
        cursor.execute(command, (fridge.get_id(),))

        # Lösche das Kühlschrank-Objekt
        command = "DELETE FROM fridge WHERE fridge_id=%s"
        cursor.execute(command, (fridge.get_id(),))

        self._cnx.commit()
        cursor.close()
