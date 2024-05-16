<<<<<<< HEAD

from Mapper import Mapper
=======
>>>>>>> 76f8606d4dd42b3cef753d4005459d219f6e5204

class User(): 
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

class UserMapper (Mapper):
    def __init__(self):
        super().__init__()


    def find_all(self):
        
        result = []
        cursor = self._cursor.cursor()
        cursor.execute("SELECT * from users")
        tuples = cursor.fetchall()

        for (user_id,nick_name,google_id,Name,last_name) in tuples:
            user = User()
            user.set_User_id(user_id)
            user.set_first_name(Name)
            user.set_last_name(last_name)
            user.set_nickname(nick_name)
            user.set_google_id(google_id)


        self._cursor.commit()
        cursor.close()

        return result
    


zugriff = UserMapper

ergebnis = zugriff.find_all
print(ergebnis)
        