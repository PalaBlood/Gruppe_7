from Mapper import Mapper
from server.bo.Groceries import Groceries

class GroceriesMapper(Mapper):
    """Mapper-Klasse, die Groceries-Objekte auf eine relationale
    Datenbank abbildet. Hierzu wird eine Reihe von Methoden zur Verfügung
    gestellt, mit deren Hilfe z.B. Objekte gesucht, erzeugt, modifiziert und
    gelöscht werden können. Das Mapping ist bidirektional. D.h., Objekte können
    in DB-Strukturen und DB-Strukturen in Objekte umgewandelt werden.
    """

    def __init__(self):
        super().__init__()

    def insert(self, groceries):
        """Einfügen eines Groceries-Objekts in die Datenbank.

        Dabei wird auch der Primärschlüssel des übergebenen Objekts geprüft und ggf.
        berichtigt.

        :param groceries das zu speichernde Objekt
        :return das bereits übergebene Objekt, jedoch mit ggf. korrigierter ID.
        """
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM groceries")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            groceries.set_id(maxid[0] + 1)

        command = "INSERT INTO groceries (id, designation, unit_of_measurement, quantity) VALUES (%s, %s, %s, %s)"
        data = (groceries.get_id(), groceries.get_designation(), groceries.get_unit_of_measurement(), groceries.get_quantity())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return groceries




    def find_all(self):
        """Auslesen aller Lebensmittel.

        :return Eine Sammlung mit Groceries-Objekten, die sämtliche Lebensmittel repräsentieren.
        """
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * FROM groceries")
        tuples = cursor.fetchall()

        for (id, designation, unit_of_measurement, quantity) in tuples:
            groceries = Groceries()
            groceries.set_id(id)
            groceries.set_designation(designation)
            groceries.set_unit_of_measurement(unit_of_measurement)
            groceries.set_quantity(quantity)
            result.append(groceries)

        self._cnx.commit()
        cursor.close()

        return result




    def find_by_id(self, key):
        """Suchen eines Lebensmittels mit vorgegebener ID. Da diese eindeutig ist,
        wird genau ein Objekt zurückgegeben.

        :param key Primärschlüsselattribut (->DB)
        :return Groceries-Objekt, das dem übergebenen Schlüssel entspricht, None bei
            nicht vorhandenem DB-Tupel.
        """
        result = None
        cursor = self._cnx.cursor()
        command = "SELECT id, designation, unit_of_measurement, quantity FROM groceries WHERE id=%s"
        cursor.execute(command, (key,))
        tuples = cursor.fetchall()

        try:
            (id, designation, unit_of_measurement, quantity) = tuples[0]
            groceries = Groceries()
            groceries.set_id(id)
            groceries.set_designation(designation)
            groceries.set_unit_of_measurement(unit_of_measurement)
            groceries.set_quantity(quantity)
            result = groceries
        except IndexError:
            result = None

        self._cnx.commit()
        cursor.close()

        return result




    def update(self, groceries):
        """Wiederholtes Schreiben eines Objekts in die Datenbank.

        :param groceries das Objekt, das in die DB geschrieben werden soll
        """
        cursor = self._cnx.cursor()
        command = "UPDATE groceries SET designation=%s, unit_of_measurement=%s, quantity=%s WHERE id=%s"
        data = (groceries.get_designation(), groceries.get_unit_of_measurement(), groceries.get_quantity(), groceries.get_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()




    def delete(self, groceries):
        """Löschen der Daten eines Groceries-Objekts aus der Datenbank.

        :param groceries das aus der DB zu löschende "Objekt"
        """
        cursor = self._cnx.cursor()
        command = "DELETE FROM groceries WHERE id=%s"
        cursor.execute(command, (groceries.get_id(),))

        self._cnx.commit()
        cursor.close()

