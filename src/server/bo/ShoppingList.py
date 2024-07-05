"""Zutaten, die noch gekauft werden müssen für ein Wunschrezept"""

"""
from Gruppe_7.src.server.bo.BusinessObject import BusinessObject
"""
from server.bo.FoodEntry import FoodEntry
from server.bo.BusinessObject import BusinessObject


class Shoppinglist(BusinessObject):

    def __init__(self):
        super().__init__()
        self.__Shopping_List_Id = int # ID der Einkaufsliste
        self.__Content = {} # Inhalt der Einkaufsliste als Dictionary



    def set_id(self,value):
        # Setzt die ID der Einkaufsliste
        self.__Shopping_List_Id = value

    def get_id(self):
        # Gibt die ID der Einkaufsliste zurück
        return self.__Shopping_List_Id

    def set_Content(self):
        # Setzt den Inhalt der Einkaufsliste
        self.__Content

# Hinweis: Diese Klasse ist momentan nicht notwendig, könnte aber in Zukunft implementiert werden.



        