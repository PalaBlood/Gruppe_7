
from Mapper import Mapper
from server.bo.Fridge import Fridge
from server.bo.FridgeEntry import FridgeEntry
from server.db.UserMapper import UserMapper


"""from Mapper import Mapper
from src.server.bo.FridgeEntry import FridgeEntry
from src.server.bo.Fridge import Fridge
from src.server.bo.Groceries import Groceries"""


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
        """Sollte der Eintrag schon existieren, so wird dieser geupdatet"""
        cursor = self._cnx.cursor()
        query = "SELECT quantity FROM Fridge_Groceries WHERE fridge_id = %s AND groceries_designation = %s"
        cursor.execute(query, (fridge_id, groceries_designation))
        result = cursor.fetchone()
        cursor.close()
        return result

    def get_full_existing_entry(self, groceries_designation):

        cursor = self._cnx.cursor()
        query = "SELECT * FROM Fridge_Groceries WHERE  groceries_designation = %s"
        cursor.execute(query, (groceries_designation,))
        result = cursor.fetchone()
        cursor.close()
        if result:
            return FridgeEntry.from_tuple(result)
        else:
            return None



    def update_fridge_entry(self, fridge_id, groceries_designation, quantity, unit):
        """Update an existing fridge entry in the database."""
        cursor = self._cnx.cursor()
        command = """UPDATE fridge_groceries
                     SET quantity = %s, unit = %s
                     WHERE fridge_id = %s AND groceries_designation = %s"""
        cursor.execute(command, (quantity, unit, fridge_id, groceries_designation))
        self._cnx.commit()
        cursor.close()

    def update_fridge_entry2(self, fridge_entry):
        """Update an existing fridge entry in the database."""
        cursor = self._cnx.cursor()
        command = """UPDATE fridge_groceries
                     SET quantity = %s, unit = %s
                     WHERE fridge_id = %s AND groceries_designation = %s"""
        # Assuming fridge_entry has properties: fridge_id, groceries_designation, quantity, unit
        data = (fridge_entry.quantity, fridge_entry.unit, fridge_entry.fridge_id, fridge_entry.groceries_designation)
        cursor.execute(command, data)
        self._cnx.commit()
        cursor.close()

    def insert_fridge_entry(self, fridge_entry):
        """Insert or update a FridgeEntry object into the database."""

        cursor = self._cnx.cursor()
        cursor.execute("SELECT id FROM fridge LIMIT 1")
        result = cursor.fetchone()
        fridge_id = result[0]


        existing_entry = self.get_existing_entry(fridge_id, fridge_entry.get_groceries_designation())

        if existing_entry:
            # Update the existing entry
            new_quantity = existing_entry[0] + fridge_entry.get_quantity()
            self.update_fridge_entry(fridge_id, fridge_entry.get_groceries_designation(), new_quantity, fridge_entry.get_unit())
        else:
            # Insert the new entry
            command = """INSERT INTO fridge_groceries (fridge_id, groceries_designation, quantity, unit)
                         VALUES (%s, %s, %s, %s)"""
            data = (fridge_id, fridge_entry.get_groceries_designation(), fridge_entry.get_quantity(), fridge_entry.get_unit())
            cursor.execute(command, data)
            self._cnx.commit()
            cursor.close()

    def find_fridge_by_id(self, id):
        """Find a Fridge by its ID."""
        cursor = self._cnx.cursor()
        cursor.execute("SELECT id FROM fridge WHERE id = %s", (id,))
        result = cursor.fetchone()
        if result:
            fridge = Fridge()
            fridge.set_id(result[0])
            cursor.close()
            return fridge
        cursor.close()
        return None

    def find_entries_by_fridge_id(self, fridge_id):
        """Find all entries associated with a specific fridge ID."""
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT groceries_designation, quantity, unit FROM fridge_groceries WHERE fridge_id = %s",
                       (fridge_id,))
        entries = cursor.fetchall()
        for groceries_designation, quantity, unit in entries:
            entry = FridgeEntry(fridge_id, groceries_designation, quantity, unit)
            entry.set_fridge_id(fridge_id)
            entry.set_groceries_designation(groceries_designation)
            entry.set_quantity(quantity)
            entry.set_unit(unit)
            result.append(entry)
        cursor.close()
        return result

    def find_all_entries(self):

        result = []
        cursor = self._cnx.cursor()

        cursor.execute("SELECT fridge_id, groceries_designation, quantity, unit FROM fridge_groceries")
        tuples = cursor.fetchall()

        for (fridge_id, groceries_designation, quantity, unit) in tuples:
            fridge_entry = FridgeEntry(fridge_id, groceries_designation, quantity, unit)
            fridge_entry.set_fridge_id(fridge_id),
            fridge_entry.set_groceries_designation(groceries_designation)
            fridge_entry.set_quantity(quantity)
            fridge_entry.set_unit(unit)
            result.append(fridge_entry)

        self._cnx.commit()
        cursor.close()

        return result
    def find_all_fridges(self):
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

    def delete_fridge_entry(self, fridge_entry):
        """Delete a FridgeEntry object from the database."""
        cursor = self._cnx.cursor()
        command = "DELETE FROM fridge_groceries WHERE groceries_designation = %s"
        cursor.execute(command, (fridge_entry.get_groceries_designation()))
        self._cnx.commit()
        cursor.close()

    def delete(self, fridge):
        """Delete a Fridge object from the database."""
        cursor = self._cnx.cursor()
        command = "DELETE FROM fridge WHERE id = %s"
        cursor.execute(command, (fridge.get_id(),))
        self._cnx.commit()
        cursor.close()