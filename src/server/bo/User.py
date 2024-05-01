from BusinessObject import BusinessObject 

class User(BusinessObject): 
    def __init__(self):
        super().__init__()
        self.__nickname = "" #Der Nickname des Users
        self.__google_id = None #Google ID zur Authentifizierung
    
    def get_google_id(self):
        """Google ID Auslesen"""
        return self.__google_id
    
    def set_google_id(self):
        pass #Hier müssen wir herausfinden wie die Google ID verwiesen werden kann
    
    
    def set_nickname(self, nickname): 
        """nickname setzen"""
        self.__nickname = nickname
    
    def get_nickname(self):
        """nickname auslesen"""
        return self.__nickname
    
    
        
        