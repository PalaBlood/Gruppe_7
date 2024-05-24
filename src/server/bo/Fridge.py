"""from Gruppe_7.src.server.bo.BusinessObject import BusinessObject
from Gruppe_7.src.server.bo.Groceries import Groceries"""

from src.server.bo.BusinessObject import BusinessObject
from server.bo.Groceries import Groceries


from src.server.bo.BusinessObject import BusinessObject
from server.bo.Groceries import Groceries

class Fridge(BusinessObject):
    def __init__(self): 
        super().__init__()
        self.__fridge_id = None
        self.__content = []  
        self.__quantity = 0.0
        self.__unit = ""

    def get_content(self): 
        return self.__content

    def add_content(self, groceries):
        if isinstance(groceries, Groceries):
            self.__content.append(groceries)

    def get_fridge_id(self):
        return self.__fridge_id

    def set_fridge_id(self, value):
        self.__fridge_id = value

    def get_quantity(self):
        return self.__quantity

    def set_quantity(self, quantity):
        self.__quantity = quantity

    def get_unit(self):
        return self.__unit

    def set_unit(self, unit):
        self.__unit = unit
