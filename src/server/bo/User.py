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
    
    def delete_user(self): 
        """Hier müssen wir eine "Löschweitergabe implementieren (siehe Thies Videomitschnitt 20.05 min. 12.00)
        Sobald ein User gelöscht wird, müssen wir auch dessen angelegte Rezepte löschen. Ansosonten hätten wir im System eine Referenz
        die nicht mehr exsitiert. Dies werden wir in Adminklasse durchführen."""
        pass
    
    
    
    """Wir benötigen die Methode, damit wir das Objekt in ein dict umwandeln.
    Da JSONs und Pyhton dicts gleich aufgebaut sind, können wir so Objekte verpacken und 
    versenden (oder entgegennehmen)"""
    @staticmethod
    def from_dict(dictionary=dict()):
        obj = User()
        obj.set_id(dictionary["id"])
        obj.__nickname(dictionary["nickname"])
        obj.__google_id(dictionary["google_id"])
    
    
        
        