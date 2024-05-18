from Gruppe_7.src.server.bo.BusinessObject import BusinessObject


class User(BusinessObject):
    def __init__(self):
        super().__init__()
        self.__nickname = "" #Der Nickname des Users
        self.__google_id = None #Google ID zur Authentifizierung
        self.__last_name = ""
        self.__first_name = ""
        self.__user_id = ""
    
    def get_google_id(self):
        """Google ID Auslesen"""
        return self.__google_id
    
    def set_google_id(self, value):

        self.__google_id = value

    
    def set_nickname(self, nickname): 
        """nickname setzen"""
        self.__nickname = nickname
    
    def get_nickname(self):
        """nickname auslesen"""
        return self.__nickname

    def set_last_name(self, value):
        """last name setzen"""
        self.__last_name = value

    def get_last_name(self):

        return self.__last_name
    
    def set_first_name(self, value):

        self.__first_name = value

    def get_first_name(self):

        return self.__first_name

    def set_User_id(self, value):

        self.__user_id = value

    def get_User_id(self):

        return self.__user_id
    
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
    
    
        
        