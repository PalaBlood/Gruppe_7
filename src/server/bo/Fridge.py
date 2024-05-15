from BusinessObject import BusinessObject
from Groceries import Groceries
"""Imports muss jeder für sich anpassen."""

"""Müssen uns aufjedenfall übelegen welche Methoden Fridge beinhalten soll. Schaut aufjedenfall nochmal drüber."""

class Fridge(BusinessObject):
    def __init__(self): 
        super().__init__()
        self.__groceries_list = []
        
        """Erstellt leere Liste für Lebensmittel im Kühlschrank."""