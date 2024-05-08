from server.bo.Fridge import Fridge
from server.db.Mapper import Mapper



class FridgeMapper(Mapper):
    
    """Mapper-Klasse für die Datenbankabbildung von Kühlschrank-Objekten."""
    
    def __init__(self):
        super().__init__()

    def find_all(self):
        
        """Suche alle Kühlschränke und gibt sie als Liste von Fridge-Objekten zurück."""
        
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT id, groceries FROM fridges")
        
        for (id, groceries) in cursor.fetchall():
            fridge = Fridge()
            fridge.set_id(id)
            fridge.set_groceries(groceries)
            result.append(fridge)

        self._cnx.commit()  
        cursor.close()
        
        return result
    
    def find_by_id(self, id):
        
        """Suche einen Kühlschrank anhand seiner ID und gibt das entsprechende Fridge-Objekt zurück."""
        
        cursor = self._cnx.cursor()
        cursor.execute("SELECT groceries FROM fridges WHERE id = %s", (id,))
        record = cursor.fetchone()
        if record:
            fridge = Fridge()
            fridge.set_id(id)
            fridge.set_groceries(record[0])

            self._cnx.commit()  
            cursor.close()

            return fridge
        else:
            return None
        
    def insert(self, fridge):
        
        """Fügt einen neuen Kühlschrank in die Datenbank ein."""
        
        cursor = self._cnx.cursor()
        cursor.execute("INSERT INTO fridges (groceries) VALUES (%s)", (fridge.get_groceries(),))
        fridge.set_id(cursor.lastrowid)

        self._cnx.commit()  
        cursor.close()

        return fridge
    
    def update(self, fridge):
        
        """Aktualisiert einen vorhandenen Kühlschrank in der Datenbank."""
        
        cursor = self._cnx.cursor()
        cursor.execute("UPDATE fridges SET groceries = %s WHERE id = %s", (fridge.get_groceries(), fridge.get_id()))
        self._cnx.commit()  
        cursor.close()

    def delete(self, fridge):
       
        """Löscht einen Kühlschrank aus der Datenbank."""
       
        cursor = self._cnx.cursor()
        cursor.execute("DELETE FROM fridges WHERE id = %s", (fridge.get_id(),))
        self._cnx.commit()
        cursor.close()

# Beispiel zum Ausführen:
if __name__ == "__main__":
    with FridgeMapper() as mapper:
        all_fridges = mapper.find_all() # Beispiel: Alle Kühlschränke aus der Datenbank abrufen
        for fridge in all_fridges:
            print(f"Fridge ID: {fridge.get_id()}, Groceries: {fridge.get_groceries()}")

        

