from enum import Enum
from BusinessObject import BusinessObject 
from UnitOfMeasurement import UnitOfMeasurement
"""Imports muss jeder für sich anpassen."""





class Groceries(BusinessObject):
    
    """Klasse zur Repräsentation von Lebensmitteln (Groceries)."""

    def __init__(self):
        
        """Konstruktor."""
        
        super().__init__()
        self.__designation = None
    
    def get_designation(self): 
        return self.__designation
    
    def set_designation(self, designation):
        self.__designation = designation
    
    
    