from enum import Enum
from BusinessObject import BusinessObject 


"""Imports muss jeder für sich anpassen."""


"""Aktuelle Gedanken: 
Beim Editieren von Lebensmitteln im Lager oder im Rezept, wird die ID des Lebenmittels überprüft
Sollte z.B. bei der Eingabe eines Lebensmittels, dieses schon vorhanden sein, wird dies an der ID erkannt und die Menge wird 
zu bestehenden hinzu addiert/subtrahiert. 

Bei der Menge "0" Könnte das Lebenmittel einfach entfernt werden (ID Löschung)

Anhand der Attribute Quantity und "MoM können "
"""


class Groceries(BusinessObject):
    
    """Klasse zur Repräsentation von Lebensmitteln (Groceries)."""

    def __init__(self):
        
        """Konstruktor."""
        
        super().__init__()
        self.__designation = None
        self.__unit_of_measurement = None
        self.__quantity = None
    
    def get_designation(self): 
        return self.__designation
    
    def set_designation(self, designation):
        self.__designation = designation
        
    
    def get_unit_of_measurement(self):
        return self.__unit_of_measurement
    
    def set_unit_of_measurement(self, unit=str): 
         self.__unit_of_measurement = unit.lower() #Mengenangaben werden immer in klein konventiert 
    
    
    def get_quantity(self):
        return self.__quantity
    
    def set_quantity(self, quantity):
        self.__quantity = quantity
    
    
    
    
if __name__ == "__main__":
        
    salat = Groceries()
    salat.set_designation("Salat")
    salat.set_quantity(1)
    salat.set_unit_of_measurement("kilogram")
    
    print(salat.get_unit_of_measurement())
    


    
    
    