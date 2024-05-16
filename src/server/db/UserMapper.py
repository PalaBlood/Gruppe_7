from Gruppe_7.src.server.bo.User import User
from Mapper import Mapper


class UserMapper(Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * from user")
        tuples = cursor.fetchall()

        for (user_id, nick_name, google_id, Name, last_name) in tuples:
            user = User()
            user.set_User_id(user_id)
            user.set_first_name(Name)
            user.set_last_name(last_name)
            user.set_nickname(nick_name)
            user.set_google_id(google_id)
            result.append(user)

        self._cnx.commit()
        cursor.close()

        return result


zugriff = UserMapper()

ergebnis = zugriff.find_all()
for user in ergebnis:
    print(user.get_nickname())
    print(user.get_google_id())
