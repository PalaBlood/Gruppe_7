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
        self._name = ""
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

        self._name = name

    def get_name(self):

        return self._name

    def get_fridge_id(self):
        return self._fridge_id

    def set_fridge_id(self, fridge_id):
        self._fridge_id = fridge_id

    def __str__(self):

        return f"Household(ID: {self.get_id()}, Name: {self.get_name()}, Fridge ID: {self.get_fridge_id()})"

    def __repr__(self):

        return f"<Household(ID: {self._id}, Name: {self._name}, Fridge ID: {self.get_fridge_id()})>"

    @staticmethod
    def form_dict(dictionary=dict()):
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


if __name__ == "__main__":
    user1 = User()  # Erstelle User
    user2 = User()
    user1.set_id(1)
    user2.set_id(223)

    haushalt = Household()  # Erstelle Haushalt
    haushalt.add_user(user1)  # User hinzufügen
    haushalt.add_user(user2)


    haushalt.remove_user(user1)  # User entfernen



    
        
    
    
