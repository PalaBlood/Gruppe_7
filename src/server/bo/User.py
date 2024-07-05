"""
from Gruppe_7.src.server.bo.BusinessObject import BusinessObject
"""

from server.bo.BusinessObject import BusinessObject


class User(BusinessObject):
    def __init__(self):
        super().__init__()
        self._nickname = "" #Der Nickname des Users
        self._last_name = "" # Der Nachname des Users
        self._first_name = "" # Der Vorname des Users
        self._Household_id = "" # Die ID des zugehörigen Haushalts
        self._google_user_id = "" # Die Google User ID des Users


    def set_nick_name(self, nickname):
        """Setzt den Nickname des Users"""
        self._nickname = nickname
    
    def get_nick_name(self):
        """Gibt den Nickname des Users zurück"""
        return self._nickname

    def set_last_name(self, value):
        """Setzt den Nachnamen des Users"""
        self._last_name = value

    def get_last_name(self):
        """Gibt den Nachnamen des Users zurück"""
        return self._last_name
    
    def set_first_name(self, value):
        """Setzt den Vornamen des Users"""
        self._first_name = value

    def get_first_name(self):
        """Gibt den Vornamen des Users zurück"""
        return self._first_name

    def get_household_id(self):
        """Gibt die ID des zugehörigen Haushalts zurück"""
        return self._Household_id

    def set_household_id(self, value):
        """Setzt die ID des zugehörigen Haushalts"""
        self._Household_id = value

    def set_google_user_id(self, value):
        """Setzt die Google User ID des Users"""
        self._google_user_id = value

    def get_google_user_id(self):
        """Gibt die Google User ID des Users zurück"""
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
        obj.set_id(dictionary["id"]) # Setzt die ID des Users aus dem Dictionary
        obj.set_nick_name(dictionary["nick_name"]) # Setzt den Nickname aus dem Dictionary
        obj.set_first_name(dictionary["first_name"]) # Setzt den Vornamen aus dem Dictionary
        obj.set_household_id(dictionary["household_id"]) # Setzt die Haushalt-ID aus dem Dictionary
        obj.set_last_name(dictionary["last_name"]) # Setzt den Nachnamen aus dem Dictionary
        obj.set_google_user_id(dictionary["google_user_id"]) # Setzt die Google User ID aus dem Dictionary
        return obj

    
    
        
        