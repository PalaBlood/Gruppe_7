from BusinessObject import BusinessObject
from User import User 
from FoodEntry import FootEntry

"""Ein Rezept hat: 
-einen Titel
-eine für da Rezept vordefinierte Anzahl an Personen, für das das Rezept ausgelegt ist
-einen Ersteller. Jeder im Haushalt kann das Rezept sehen, jedoch nur der Ersteller kann es editieren/löschen
-Lebensmitteleinträge, die aus den Namen des Lebensmittels, dessen Menge und einer Maßeinheit besteht


Noch zu erledigen:

-creator bestimmen
-"Schnittstelle" für den vergleich zu den Verfügbaren Lebensmitteln erzeugen (whs.über die Mapper?)
- Rezept löschen


Sonstitges: 
Grundsätzlich funktioniert alles mit der Klasse "Lebensmitteleintrag", jedoch gibt es da noch ein paar Punkte, die wir ausprobieren müssen 
(siehe src/server/bo/Lebensmitteleintrag)

"""

class Recipe(BusinessObject): 
    def __init__(self):
        super().__init__()
        self.__title = ""
        self.__number_of_persons = int
        self.__creator = None 
        self.__content = []
    
    def get_title(self):
        """Namen des Rezepts auslesen"""
        return self.__title
    
    def set_title(self, title):
        """Namen des Rezepts setzen"""
        self.__title = title
    
    
    def get_number_of_persons(self):
        """Anzahl der für das Rezept ausgelegten Personen auslesen"""
        return self.__number_of_persons
    
    def set_number_of_persons(self, number):
        """Anzahl der für das Rezept ausgelegten Personen setzen"""
        if isinstance(number, int):  
            self.__number_of_persons = number
            """Eventuell werden wir über das Backend einen Vordefinierten Schalter zur 
            Verfügung stellen. Somit wäre eine beliebige Eingabe sowieso ausgeschlossen"""
        else:
            print("Fehler: Die Anzahl der Personen muss eine Ganzzahl sein.")
    
    
    def get_content(self):
        """Auslesen der Lebensmitteleinträge"""
        return self.__content
    
    def add_entry(self, entry=FootEntry):
        """Hinzufügen eines Lebensmitteleintrags"""
        self.__content.append(entry)
    
    @staticmethod
    def form_dict(dictionary=dict()):
        pass 
    
    


if __name__ == "__main__":
    
    rezept = Recipe()
    
    eintrag = FootEntry()
    
    rezept.add_entry(eintrag)
    
    print(rezept.get_content())
        