"""from Gruppe_7.src.server.bo.BusinessObject import BusinessObject
from Gruppe_7.src.server.bo.Groceries import Groceries"""

from BusinessObject import BusinessObject

class Fridge(BusinessObject):
    def __init__(self):
        super().__init__()
        self.__content = []

    def get_content(self):
        return self.__content

    def add_content(self, fridge_entry):
        from FridgeEntry import FridgeEntry  #Import innerhalb der Methode
        if isinstance(fridge_entry, FridgeEntry):
            self.__content.append(fridge_entry)
        else:
            from FridgeEntry import FridgeEntry
            entry = FridgeEntry()
            self.__content.append(entry)

