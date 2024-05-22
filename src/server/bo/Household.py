from Gruppe_7.src.server.bo.BusinessObject import BusinessObject
from Gruppe_7.src.server.bo.User import User


"""
An Löschweitergabe denken (falls wir das Löschen eines Haushalts implementieren müssen)
In dem Fall müssten der Kühlschrank, alle Rezepte und Lebensmitteleinträge in diesen gelöscht werden 
"""

class Household(BusinessObject): 
    def __init__(self):
        super().__init__()
        self.__users = []
        self.__household_id = ""
        
    
    def get_users(self): 
        """User im Haushalt auslesen"""
        return self.__users
    
    
    def add_user(self, user = User):
        """Hinzufügen eines Users"""
        if user.get_id() in self.__users:
            print("User ist bereits im Haushalt angemeldet")
        else:
            self.__users.append(user.get_id())
            
    def remove_user(self, user=User):
        """Entfernen eines Users"""
        if user.get_id() in self.get_users():
            self.__users.remove(user.get_id())
            print(f"User mit ID {user.get_id()} wurde aus dem Haushalt entfernt")
        else:
            print("User ist nicht im Haushalt registriert") 

    def get_household_id(self):
         return self.__household_id

    def set_household_id(self, value):

        self.__household_id = value
    
    @staticmethod
    def form_dict(dictionary=dict()):
        obj = Household()
        obj.set_id(dictionary["id"])



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
    
   
    
    
    
    
    
        
    
    
