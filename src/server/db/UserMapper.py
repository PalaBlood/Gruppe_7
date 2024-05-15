

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
        