from enum import Enum
from BusinessObject import BusinessObject 
from UnitOfMeasurement import UnitOfMeasurement
"""Imports muss jeder für sich anpassen."""


"""Müssen uns aufjedenfall die Methoden überlegen die wir implementieren wollen.
Hab ausversehen den Fridge Code Teilweise hier reingepackt, aber ich weiß noch nicht welche Methoden jetzt
letzendlich von welcher Klasse ausgeführt werden sollen, die sollten wir uns anschauen und aufteilen/verschieben etc..."""


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
        