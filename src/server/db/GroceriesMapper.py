from Groceries import Groceries
from Mapper import Mapper
"""Imports muss jeder für sich anpassen."""

class GroceriesMapper(Mapper):
    
    """Mapper-Klasse zur Abbildung von Groceries-Objekten auf eine relationale Datenbank."""

    def __init__(self):
        super().__init__()

    def find_all(self):
        
        """Auslesen aller Lebensmittel aus der Datenbank.

        :return: Eine Sammlung mit Groceries-Objekten, die sämtliche Lebensmittel repräsentieren.
        """
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT id, designation, unit_of_measurement FROM groceries")
        tuples = cursor.fetchall()

        for (id, designation, unit_of_measurement) in tuples:
            groceries = Groceries()
            groceries.set_id(id)
            groceries.set_designation(designation)
            groceries.set_unit_of_measurement(unit_of_measurement)
            result.append(groceries)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_id(self, id):
        
        """Auslesen eines Lebensmittels anhand seiner ID aus der Datenbank.

        :param id: Die ID des zu findenden Lebensmittels.
        :return: Ein Groceries-Objekt, das dem übergebenen Schlüssel entspricht, None bei nicht vorhandenem Datensatz.
        """
        result = None
        cursor = self._cnx.cursor()
        cursor.execute("SELECT id, designation, unit_of_measurement FROM groceries WHERE id=%s",(id,))
        tuples = cursor.fetchall()

        if tuples:
            (id, designation, unit_of_measurement) = tuples[0]
            groceries = Groceries()
            groceries.set_id(id)
            groceries.set_designation(designation)
            groceries.set_unit_of_measurement(unit_of_measurement)
            result = groceries

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, groceries):
        
        """Einfügen eines Groceries-Objekts in die Datenbank.

        :param groceries: Das zu speichernde Groceries-Objekt.
        :return: Das übergebene Groceries-Objekt, jedoch mit ggf. korrigierter ID.
        """
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM groceries ")
        tuples = cursor.fetchall()

        for (maxid,) in tuples:
            groceries.set_id(maxid + 1)

        command = "INSERT INTO groceries (id, designation, unit_of_measurement) VALUES (%s, %s, %s)"
        data = (groceries.get_id(), groceries.get_designation(), groceries.get_unit_of_measurement())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()
        
        return groceries

    def update(self, groceries):
        
        """Aktualisieren eines Groceries-Objekts in der Datenbank.

        :param groceries: Das zu aktualisierende Groceries-Objekt.
        """
        cursor = self._cnx.cursor()

        command = "UPDATE groceries SET designation=%s, unit_of_measurement=%s WHERE id=%s"
        data = (groceries.get_designation(), groceries.get_unit_of_measurement(), groceries.get_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, groceries):
        
        """Löschen eines Groceries-Objekts aus der Datenbank.

        :param groceries: Das zu löschende Groceries-Objekt.
        """
        cursor = self._cnx.cursor()
        cursor.execute("DELETE FROM groceries WHERE id=%s", (groceries.get_id(),))

        self._cnx.commit()
        cursor.close()

