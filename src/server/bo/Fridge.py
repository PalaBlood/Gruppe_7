"""from Gruppe_7.src.server.bo.BusinessObject import BusinessObject
from Gruppe_7.src.server.bo.Groceries import Groceries"""

from src.server.bo.BusinessObject import BusinessObject
from server.bo.Groceries import Groceries


class Fridge(BusinessObject):
    def __init__(self): 
        super().__init__()
        self.__content = None
        self.__fridge_id = ""
    
    def get_content(self): 
        return self.__content
    
    def add_content(self, groceries=Groceries()):
        self.__content.append(groceries.get_id())

    def get_fridge_id(self):

        return self.__fridge_id

    def set_fridge_id(self, value):

        self.__fridge_id = value

