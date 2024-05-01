from BusinessObject import BusinessObject
from User import User 
from Quantity import Quantity

class Recipe(BusinessObject): 
    def __init__(self):
        super().__init__()
        self.__title = ""
        self.__number_of_persons = int
        self.__creator = None
        self.ingredients = []
    
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
            Verfügung stellen. Somit wäre eine beliebige Ausgabe sowieso ausgeschlossen"""
        else:
            print("Fehler: Die Anzahl der Personen muss eine Ganzzahl sein.")
        