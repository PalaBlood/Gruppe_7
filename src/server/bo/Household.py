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
        self._users = []
        self.__name = ""
    def get_users(self): 
        """User im Haushalt auslesen"""
        return self._users[:]

    def add_user(self, user):
        """Add a user to the household."""
        if user not in self._users:
            self._users.append(user)
    def remove_user(self, user):
        """Entfernen eines Users"""
        if user in self._users:
            self._users.remove(user)
        else:
            raise ValueError("User not found in household")

    def set_name(self, name):

        self.__name = name

    def get_name(self):

        return self.__name



    def __str__(self):
        user_info = ', '.join(str(user) for user in self._users)
        return f"Household(ID: {self.get_id()}, Users: [{user_info}])"

    def __repr__(self):

        return f"<Household(ID: {self._id}, Name: {self.__name})>"

    @staticmethod
    def form_dict(dictionary=dict()):
        obj = Household()
        obj.set_id(dictionary["id"])
        obj.set_name(dictionary["name"])



if __name__ == "__main__": 
    
    user1 = User() #Erstelle User
    user2 = User() 
    user1.set_id(1)
    user2.set_id(223)
    
    
    haushalt = Household() #Erstelle Haushalt
    haushalt.add_user(user1) #User hinzufügen
    haushalt.add_user(user2)
    print(haushalt.get_users())
    
    haushalt.remove_user(user1) #User entfernen
    print(haushalt.get_users())
    
   
    
    
    
    
    
        
    
    
