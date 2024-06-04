"""
from Gruppe_7.src.server.bo.BusinessObject import BusinessObject
"""

from BusinessObject import BusinessObject


class User(BusinessObject):
    def __init__(self):
        super().__init__()
        self.__nickname = "" #Der Nickname des Users
        self.__last_name = ""
        self.__first_name = ""
        self.__Household_id = 0
        self.__google_user_id = 0


    def set_nick_name(self, nickname):
        """nickname setzen"""
        self.__nickname = nickname
    
    def get_nick_name(self):
        """nickname auslesen"""
        return self.__nickname

    def set_last_name(self, value):
        """last name setzen"""
        self.__last_name = value

    def get_last_name(self):

        return self.__last_name
    
    def set_first_name(self, value):

        self.__first_name = value

    def get_first_name(self):

        return self.__first_name

    def get_household_id(self):

        return self.__Household_id

    def set_household_id(self, value):

        self.__Household_id = value

    def set_google_user_id(self, value):

        self.__google_user_id = value

    def get_google_user_id(self):

        return self.__google_user_id

    def __str__(self):
        return f"User(ID: {self.get_id()}, Nickname: {self.get_nick_name()}, First Name: {self.get_first_name()}, Last Name: {self.get_last_name()}, Household ID: {self.get_household_id()})"
    
    
    """Wir benötigen die Methode, damit wir das Objekt in ein dict umwandeln.
    Da JSONs und Pyhton dicts gleich aufgebaut sind, können wir so Objekte verpacken und 
    versenden (oder entgegennehmen)"""
    @staticmethod
    def from_dict(dictionary=dict()):

        obj = User()
        obj.set_id(dictionary["id"])
        obj.set_nick_name(dictionary["nick_name"])
        obj.set_first_name(dictionary["first_name"])
        obj.set_last_name(dictionary["last_name"])
        obj.set_google_user_id(dictionary["google_id"])
        obj.set_household_id(dictionary["household_id"])

    
    
        
        