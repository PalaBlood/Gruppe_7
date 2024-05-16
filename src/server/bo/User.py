from Gruppe_7.src.server.bo.BusinessObject import BusinessObject

class User(BusinessObject): 
    def __init__(self):
        super().__init__()
        self.__nickname = "" #Der Nickname des Users
        self.__google_id = None #Google ID zur Authentifizierung
        self.__first_name = "" #Vorname des Users
        self.__last_name = "" #Nchname des Users
        self.__User_id = ""

    def set_User_id(self, value):
        self.__User_id = value
    
    def get_google_id(self):
        """Google ID Auslesen"""
        return self.__google_id
    
    def set_google_id(self, google_id):
        
        self.__google_id = google_id
    
    
    def set_nickname(self, nickname): 
        """nickname setzen"""
        self.__nickname = nickname
    
    def get_nickname(self):
        """nickname auslesen"""
        return self.__nickname
    
    def set_first_name(self, first_name):
        self.__first_name = first_name

    def get_first_name(self):
        """first name auslesen"""
        return self.__first_name

    def set_last_name(self, last_name):
        self.__last_name = last_name

    def get_last_name(self):
        """first name auslesen"""
        return self.__last_name
    
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
    
    
        
        