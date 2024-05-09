from server.bo import BusinessObject 



"""Müssen uns aufjedenfall die Methoden überlegen die wir implementieren wollen.
Hab ausversehen den Fridge Code Teilweise hier reingepackt, aber ich weiß noch nicht welche Methoden jetzt
letzendlich von welcher Klasse ausgeführt werden sollen, die sollten wir uns anschauen und aufteilen/verschieben etc..."""

from enum import Enum
from server.bo import BusinessObject

class UnitOfMeasurement(Enum): 
    """Müssen wir uns aufjedenfall nochmal anschauen!!!!!! In diesem speziellen Fall wird die Enum-Klasse verwendet, 
    um die Maßeinheiten für die Lebensmittel zu definieren, damit Sie nicht jedes Mal dieselben Werte manuell eingeben müssen. 
    Sie können dann einfach die entsprechende Maßeinheit aus der Enumeration auswählen."""
    
    """Enumeration zur Darstellung von Maßeinheiten."""
    
    PIECE = "Stück" #Hier kommen die Maßeinheiten rein die wir wollen, weiß nicht ob UnitOfMeasurement deswegen wegfällt oder wir es dort reinschreiben müssen
    GRAM = "Gramm"
    LITRE = "Liter"

class Groceries(BusinessObject):
    
    """Klasse zur Repräsentation von Lebensmitteln (Groceries)."""

    def __init__(self):
        
        """Konstruktor."""
        
        super().__init__()
        self.__designation = ""  # Bezeichnung des Lebensmittels
        self.__unit_of_measurement = None  # Maßeinheit des Lebensmittels

    def get_designation(self) -> str:
        
        """Gibt die Bezeichnung des Lebensmittels zurück."""
        
        return self.__designation

    def set_designation(self, designation: str):
        
        """Setzt die Bezeichnung des Lebensmittels."""
        
        self.__designation = designation

    def get_unit_of_measurement(self) -> UnitOfMeasurement:
        
        """Gibt die Maßeinheit des Lebensmittels zurück."""
        
        return self.__unit_of_measurement

    def set_unit_of_measurement(self, unit_of_measurement: UnitOfMeasurement):
        
        """Setzt die Maßeinheit des Lebensmittels."""
        
        self.__unit_of_measurement = unit_of_measurement

    def __str__(self) -> str:
        
        """Erzeugt eine textuelle Darstellung des Lebensmittels."""
        
        return "Groceries: {}, {}".format(self.get_designation(), self.get_unit_of_measurement().value)

    @staticmethod
    def from_dict(dictionary=dict()):
        
        """Umwandelt ein Python dict() in ein Groceries-Objekt."""
        
        obj = Groceries()
        obj.set_id(dictionary["id"])  # Teil von BusinessObject
        obj.set_designation(dictionary["designation"])
        obj.set_unit_of_measurement(UnitOfMeasurement(dictionary["unit_of_measurement"]))
        return obj
    
    #def get_name(self):
    #    """Bezeichnung auslesen"""
    #    return self.__name()
    
    #def set_name(self, name):
    #    """Bezeichnung setzen"""
    #    self.__name = name
    
    
    #@staticmethod
    #def form_dict(dictionary=dict()):
    #    pass 
    
        





