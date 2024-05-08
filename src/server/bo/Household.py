from BusinessObject import BusinessObject
from src.server.db.User import User


"""
An Löschweitergabe denken (falls wir das Löschen eines Haushalts implementieren müssen)
In dem Fall müssten der Kühlschrank, alle Rezepte und Lebensmitteleinträge in diesen gelöscht werden 
"""

class Household(BusinessObject): 
    def __init__(self):
        super().__init__()
        self.__members = []
        
    
    def get_members(self): 
        """User im Haushalt auslesen"""
        return self.__members
    
    
    def add_member(self, user = User):
        """Hinzufügen eines Users"""
        if user.get_id() in self.__members:
            print("User ist bereits im Haushalt angemeldet")
        else:
            self.__members.append(user.get_id())
            
    def remove_member(self, user=User):
        """Entfernen eines Users"""
        if user.get_id() in self.get_members():
            self.__members.remove(user.get_id())
            print(f"User mit ID {user.get_id()} wurde aus dem Haushalt entfernt")
        else:
            print("User ist nicht im Haushalt registriert") 
    
    
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
    haushalt.add_member(user1) #User hinzufügen
    haushalt.add_member(user2)
    print(haushalt.get_members())
    
    haushalt.remove_member(user1) #User entfernen
    print(haushalt.get_members())
    
   
    
    
    
    
    
        
    
    
