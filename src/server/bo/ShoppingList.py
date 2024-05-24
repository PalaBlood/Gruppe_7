"""Zutaten, die noch gekauft werden müssen für ein Wunschrezept"""

"""
from Gruppe_7.src.server.bo.BusinessObject import BusinessObject
"""
from FoodEntry import FoodEntry
from Groceries import Groceries
from BusinessObject import BusinessObject

class Shoppinglist(BusinessObject):

    def __init__(self):
        super().__init__()
        self.__Shopping_List_Id = int
        self.__Content = {}



    def set_id(self,value):

        self.__Shopping_List_Id = value

    def get_id(self):

        return self.__Shopping_List_Id

    def set_Content(self):

        self.__Content





        