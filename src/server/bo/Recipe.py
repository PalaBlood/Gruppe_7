"""
from Gruppe_7.src.server.bo.BusinessObject import BusinessObject
from Gruppe_7.src.server.bo.User import User
from Gruppe_7.src.server.bo.Groceries import Groceries
"""


from server.bo.BusinessObject import BusinessObject
from server.bo.User import User
from server.bo.Groceries import Groceries

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
        self.__recipe_id = ""
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


    def set_creator(self, creator=User()):
        self.__creator = creator

    def get_creator(self):
        return self.__creator


    def get_content(self):
        """Auslesen der Lebensmitteleinträge"""
        return self.__content
    
    def add_content(self, grocieries=Groceries()):
        self.__content.append(grocieries.get_id()) #Anhand der ID könnte man das Lebensmittel aus der DB herausziehen
    
    def get_id(self):

        return self.__recipe_id

    def set_id(self,value):

        self.__recipe_id = value
    
    
    @staticmethod
    def form_dict(dictionary=dict()):
        obj = Recipe()
        obj.set_id(dictionary["id"])
        obj.set_title(dictionary["title"])
        obj.set_number_of_persons(dictionary["number of persons"])
        obj.add_entry(dictionary["food entry"])

    
    


if __name__ == "__main__":
    
    rezept = Recipe()
    
    salat = Groceries()
    salat.set_designation("Salat")
    salat.set_quantity(1)
    salat.set_unit_of_measurement("grams")
    salat.set_id(1)
    
    brot = Groceries()
    brot.set_designation("brot")
    brot.set_quantity(1)
    brot.set_unit_of_measurement("kilogram")
    brot.set_id(2)
    
    
    #Hinzufügen eines Lebensmittels
    rezept.add_content(salat)
 
    
    rezept.add_content(brot)
    print(rezept.get_content())
    
    
    
    
   
        