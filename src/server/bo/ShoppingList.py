"""Zutaten, die noch gekauft werden müssen für ein Wunschrezept"""

"""
from Gruppe_7.src.server.bo.BusinessObject import BusinessObject
"""

from server.bo.BusinessObject import BusinessObject

class ShoppingList(BusinessObject):
    def __init__(self):
        super().__init__()
        self.__shopping_list = {}
        self.__shopping_id = ""
        self.__ingedient = "" #in Datenbank varchar
        self.__quantity_needed = float

    def get_shopping_id(self):
        return self.__shopping_id


        