"""
from Gruppe_7.src.server.bo.BusinessObject import BusinessObject
"""

from BusinessObject import BusinessObject


class User(BusinessObject):
    def __init__(self):
        super().__init__()
        self._nickname = "" #Der Nickname des Users
        self._last_name = ""
        self._first_name = ""
        self._Household_id = ""
        self._google_user_id = ""


    def set_nick_name(self, nickname):
        """nickname setzen"""
        self._nickname = nickname
    
    def get_nick_name(self):
        """nickname auslesen"""
        return self._nickname

    def set_last_name(self, value):
        """last name setzen"""
        self._last_name = value

    def get_last_name(self):

        return self._last_name
    
    def set_first_name(self, value):

        self._first_name = value

    def get_first_name(self):

        return self._first_name

    def get_household_id(self):

        return self._Household_id

    def set_household_id(self, value):

        self._Household_id = value

    def set_google_user_id(self, value):

        self._google_user_id = value

    def get_google_user_id(self):

        return self._google_user_id

    def __str__(self):
        """Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz."""
        return "User: {}, {}, {}, {},{},{}".format(self.get_id(), self._first_name, self._last_name,self._Household_id, self._google_user_id, self._nickname)
    
    
    """Wir benötigen die Methode, damit wir das Objekt in ein dict umwandeln.
    Da JSONs und Pyhton dicts gleich aufgebaut sind, können wir so Objekte verpacken und 
    versenden (oder entgegennehmen)"""
    @staticmethod
    def from_dict(dictionary=dict()):

        obj = User()
        obj.set_id(dictionary["id"])
        obj.set_nick_name(dictionary["nick_name"])
        obj.set_first_name(dictionary["first_name"])
        obj.set_household_id(dictionary["household_id"])
        obj.set_last_name(dictionary["last_name"])
        obj.set_google_user_id(dictionary["google_user_id"])
        return obj

    
    
        
        