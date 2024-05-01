from BusinessObject import BusinessObject
from User import User

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
            
    
    



if __name__ == "__main__": 
    
    user1 = User()
    user2 = User()
    user1.set_id(1)
    user2.set_id(223)
    
    
    haushalt = Household()
    haushalt.add_member(user1)
    haushalt.add_member(user2)
    print(haushalt.get_members())
    
    haushalt.remove_member(user1)
    print(haushalt.get_members())
    
    #Hier war scheinbar ein Profi am Werk
    
    
    
    
    
        
    
    
