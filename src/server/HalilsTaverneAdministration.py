"""Hier kommt alles bezüglich des Service Layers rein
Es dient als 'Schnittstelle' zwischen dem Presentation Layer 
und dem Business Object Layer

Ausführbefehle (create, delete usw.) aller Art werden hier untergebracht. """

"""Imports muss jeder für sich anpassen."""
#from server.bo.User import User
#from server.bo.Recipe import Recipe
#from server.bo.Fridge import Fridge

#from server.db.UserMapper import UserMapper

class HalilsTaverneAdministration (object):

    def __init__(self):
            pass
    
    #User spezifische Methoden

    def create_user(self, nick_name, first_name, last_name, google_user_id):
          #Benutzer erstellen
          user = User()
          user.set_first_name(first_name)
          user.set_last_name(last_name)
          user.set_nickname(nick_name)
          user.set_google_id(google_user_id)
          user.set_id(1) #default id, wird später in der Datenbank geupdatet

          with UserMapper() as mapper:
                return mapper.insert(user)
          
    #müssen noch richtig implementiert werden
    def set_nickname(self, nick_name):
        pass

    def get_first_name(self, last_name):
        pass

    def get_last_name(self, last_name):
        pass

    def get_google_id(self, id):
        pass #da noch unsicher wie zu implementieren

    def get_all_users(self):
        with UserMapper() as mapper:
            return mapper.find_all()

    def save_user(self, user):
        with UserMapper() as mapper:
            mapper.update(user)

    def delete_user(self, user):
        with UserMapper() as mapper:
            mapper.delete(user)
          


        