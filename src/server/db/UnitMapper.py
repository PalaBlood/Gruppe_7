from server.db.Mapper import Mapper
from server.bo.Unit import Unit


class UnitMapper(Mapper):
    def __init__(self):
        super().__init__()


    def insert_unit(self, unit):
        """Eintrag einer neuen Unit
        ID wird automatisch gesetzt, die household_id ist ein Fremdschlüssel zur id in
        der Relation 'household'"""
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM unit") 
        tuples = cursor.fetchall()

        maxid = tuples[0][0] if tuples[0][0] is not None else 0
        unit.set_id(maxid + 1)

        command = "INSERT INTO unit (id, designation, household_id) VALUES(%s, %s, %s)"
        data = (unit.get_id(), unit.get_designation(), unit.get_household_id())
        cursor.execute(command, data)
        self._cnx.commit()
        cursor.close()

        return unit




    def update_unit(self, unit):
        """Bereits vorhandene Unit wird angepasst. 
        Wird aktuell nicht benötigt"""

        cursor = self._cnx.cursor()
        command = ("""UPDATE unit
                      SET designation = %s, household_id = %s
                      WHERE id = %s""")

        data = (unit.get_designation(), unit.get_household_id(), unit.get_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()




    def find_unit_by_designation_and_household_id(self, designation, household_id):
        """Gibt die Unit anhand der eingegebenen Designation zurück"""

        cursor = self._cnx.cursor()
        cursor.execute("SELECT id, designation, household_id FROM unit WHERE designation = %s AND household_id = %s",
                       (designation, household_id))

        rows = cursor.fetchall()

        units = []

        for row in rows:
            unit = Unit()
            unit.set_id(row[0])
            unit.set_designation(row[1])
            unit.set_household_id(row[2])
            cursor.close()
            return unit

        cursor.close()
        return None




    def find_unit_by_household_id(self, household_id):
        """Gibt alle Units eines households zurück"""

        cursor = self._cnx.cursor()
        cursor.execute("SELECT id, designation, household_id FROM unit WHERE household_id = %s", (household_id,))
        rows = cursor.fetchall()

        units = []

        for row in rows:
            unit = Unit()
            unit.set_id(row[0])
            unit.set_designation(row[1])
            unit.set_household_id(row[2])
            units.append(unit)  # Hinzufügen der Einheit zur Liste

        cursor.close()
        return units




    def find_unit_by_id(self, id):
        """Gibt die Unit nach der eingegebenen id zurück"""

        cursor = self._cnx.cursor()
        cursor.execute("SELECT id, designation, household_id FROM unit WHERE id = %s", (id,))
        result = cursor.fetchone()

        if result:
            unit = Unit()
            unit.set_id(result[0])
            unit.set_designation(result[1])
            unit.set_household_id(result[2])
            cursor.close()
            return unit

        cursor.close()
        return None




    def delete_unit(self, id):
        """Löscht unit anhand der eingegeben id"""

        cursor = self._cnx.cursor()
        cursor.execute("DELETE FROM unit WHERE id = %s", (id,))
        self._cnx.commit()
        cursor.close()
