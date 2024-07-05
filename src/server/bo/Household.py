"""from Gruppe_7.src.server.bo.BusinessObject import BusinessObject
from Gruppe_7.src.server.bo.User import User"""

from server.bo.BusinessObject import BusinessObject
from server.bo.User import User

"""
An Löschweitergabe denken (falls wir das Löschen eines Haushalts implementieren müssen)
In dem Fall müssten der Kühlschrank, alle Rezepte und Lebensmitteleinträge in diesen gelöscht werden 
"""


class Household(BusinessObject):
    def __init__(self):
        super().__init__()
        self._name = "" # Name des Haushalts
        self._fridge_id = None  # Als Referenz

    def get_users(self):
        """User im Haushalt auslesen"""
        return self._users[:]

    def add_user(self, user):
        """Add a user to the household."""
        self._users.append(user)

    def remove_user(self, user):
        """Entfernen eines Users"""
        if user in self._users:
            self._users.remove(user)
        else:
            raise ValueError("User not found in household")

    def set_name(self, name):
        """Setzt den Namen des Haushalts."""
        self._name = name

    def get_name(self):
        """Gibt den Namen des Haushalts zurück."""
        return self._name

    def get_fridge_id(self):
        """Gibt die ID des Kühlschranks zurück."""
        return self._fridge_id

    def set_fridge_id(self, fridge_id):
        """Setzt die ID des Kühlschranks."""
        self._fridge_id = fridge_id
    
    
    

    def __str__(self):
        """Gibt eine textuelle Darstellung des Haushalts zurück."""
        return f"Household(ID: {self.get_id()}, Name: {self.get_name()}, Fridge ID: {self.get_fridge_id()})"


    def __repr__(self):
        """Gibt eine detaillierte repräsentative Darstellung des Haushalts zurück."""
        return f"<Household(ID: {self._id}, Name: {self._name}, Fridge ID: {self.get_fridge_id()})>"



    @staticmethod
    def form_dict(dictionary=dict()):
        """Erzeugt ein Household-Objekt aus einem Dictionary."""
        obj = Household()
        print(obj)
        obj.set_id(dictionary.get("id", 0))

        name_field = dictionary.get("name")
        if isinstance(name_field, dict):
            obj.set_name(name_field.get("name", ""))
            obj.set_fridge_id(name_field.get("fridge_id", None))
        else:
            obj.set_name(name_field)
            obj.set_fridge_id(dictionary.get("fridge_id", None))

        return obj




    
        
    
    
