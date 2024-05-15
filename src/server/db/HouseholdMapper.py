#from server.bo.Household import Household
#from server.db.Mapper import Mapper
"""Imports muss jeder für sich anpassen."""

"""Schaut aufjedenfall drüber. Die Dokumentation ist zum Teil aus dem Bankbeispiel und GPT erklärt usw.
Falls wir diese umschreiben wollen sollten wir dies auch nicht vergessen. Ich weiß nicht ob wir am Ende im Code
eine Dokumentation brauchen. Damit jeder die Schritte für die Erstellung und Funktionalität von Mappern
nachvollziehen kann mach ich die diesmal so ausführlich wie möglich."""


class HouseholdMapper(Mapper): 
    
    """ Diese Klasse stellt einen Mapper für die Household-Datenbanktabelle dar.
    Sie erbt Eigenschaften und Methoden von der Mapper-Klasse."""
    
    def __init__(self):
        super().__init__()
        
        """Der Initialisierer wird verwendet, um eine neue Instanz der Klasse zu erstellen.
        Beim Erstellen einer neuen Instanz wird automatisch der Konstruktor der Elternklasse Mapper aufgerufen,
        um sicherzustellen, dass alle Initialisierungsaufgaben der Mapper-Klasse ausgeführt werden. """

    def find_all(self):
       
        """Die Methode find_all wird verwendet, um alle Datensätze aus der Haushalte-Tabelle abzurufen.
        Sie öffnet eine Datenbank-Cursor, um SQL-Abfragen auszuführen.
        Anschließend führt sie eine Abfrage aus, um alle Zeilen aus der Haushalte-Tabelle auszuwählen.
        Die zurückgegebenen Ergebnisse werden in einer Liste gespeichert und zurückgegeben."""
        
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT id, users FROM households")
        tuples = cursor.fetchall()

        """Initialisiert eine leere Liste namens "result", um die abgerufenen Daten zu speichern.
        Öffnet einen Cursor, um SQL-Abfragen auszuführen.
        Führt eine SQL-Abfrage aus, um alle Zeilen aus der Haushalte-Tabelle abzurufen.
        Diese Abfrage wählt die Spalten "id" und "users" aus der Tabelle aus."""
        
        for (id, users) in tuples:
            household = Household()
            household._Household__users = users.split(",") if users else []
            result.append(household)

        self._cnx.commit()  #Transaktion bestätigen
        cursor.close()      #Transaktion beenden um Probleme zu vermeiden

        return result
        
    """Holt alle Ergebnisse der Abfrage und speichert sie als Tupel ab.
    Jedes Tupel repräsentiert eine Zeile in der Tabelle.
    Schließt den Cursor und gibt die gespeicherten Daten zurück."""         
    
    def find_by_id(self, id):  
        
        """Auslesen eines Haushalts aus der Datenbank anhand seiner ID."""
        
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT id, members FROM households WHERE id = %s", (id,))
        record = cursor.fetchone()  #Eventuell tuples = cursor.fetchall(), redord = cursor.fetchone wenn man nur eine Zeile erwartet (WHERE id= %s) (es wird nach einem bestimmten Haushalt gesucht)

        if record:
            household = Household()
            household._Household__members = record[1].split(",") if record[1] else []
            return household
        else:
            return None

        #for (id, members) in tuples:
        #   household = Household()
        #   household._Household__members = members.split(",") if members else []
        #   result.append(household)

        #self._cnx.commit()
        #cursor.close()

        #return result -Gibt Liste von mehreren Haushalten zurück, ich weiß nicht welches wir brauchen, mit tuples = cursor.fetchall()

    def insert(self, household):
        
        """Einfügen eines Haushaltes in die Datenbank."""
        
        cursor = self._cnx.cursor()
        users = ",".join(household.get_users())  
        cursor.execute("INSERT INTO households (Users) VALUES (%s)", (users,))

        self._cnx.commit()
        cursor.close()

    def update(self, household): #Müssen wir uns eventuell nochmal anschauen ob nur User aktualisiert werden sollen im Haushalt oder was genau
        
        """Aktualisieren eines Haushalts in der Datenbank."""
        
        cursor = self._cnx.cursor()
        users = ",".join(household.get_users())
        cursor.execute("UPDATE households SET users=%s WHERE id=%s", (users, household.get_id()))
        
        self._cnx.commit()
        cursor.close()

    def delete(self, household):
        
        """Löschen eines Haushalts aus der Datenbank."""
        
        cursor = self._cnx.cursor()
        cursor.execute("DELETE FROM households WHERE id={}".format(household.get_id()))

        self._cnx.commit()
        cursor.close()

# Beispiel zum Ausführen:
if __name__ == "__main__":
    with HouseholdMapper() as mapper:
        result = mapper.find_all()
        for household in result:
            print(household)
