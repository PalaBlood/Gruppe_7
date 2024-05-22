"""Imports muss jeder für sich anpassen, dürften aber vom relativen Pfad gleich sein."""

from Gruppe_7.src.server.db.RecipeMapper import RecipeMapper
from Gruppe_7.src.server.db.HouseholdMapper import HouseholdMapper
from Gruppe_7.src.server.db.GroceriesMapper import GroceriesMapper
from Gruppe_7.src.server.db.FridgeMapper import FridgeMapper
from Gruppe_7.src.server.db.UserMapper import UserMapper

from Gruppe_7.src.server.bo.FoodEntry import FoodEntry
from Gruppe_7.src.server.bo.User import User
from Gruppe_7.src.server.bo.Fridge import Fridge
from Gruppe_7.src.server.bo.Groceries import Groceries
from Gruppe_7.src.server.bo.Household import Household
from Gruppe_7.src.server.bo.ShoppingList import ShoppingList
from Gruppe_7.src.server.bo.UnitConverters import UnitConverter



"""Hier kommt alles bezüglich des Service Layers rein
Es dient als 'Schnittstelle' zwischen dem Presentation Layer 
und dem Business Object Layer

Ausführbefehle (create, delete usw.) aller Art werden hier untergebracht. """


class HalilsTaverneAdministration(object):

    def __init__(self):
            pass
    """
    User spezifische Methoden
    
    """

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
          
    #Suchen eines Users
    def get_user(self, id):
        with UserMapper() as mapper:
            return mapper.find_all(id)

    #Speichern eines Users
    def save_user(self, user):
        with UserMapper() as mapper:
            mapper.update(user)

    #löschen eines Users
    def delete_user(self, user):
        with UserMapper() as mapper:
            mapper.delete(user)
          

    """
    Recipe spezifische Methoden
    
    """

    def create_recipe(self, recipe_id, groceries_id, groceries_quantity, groceries_unit_of_measurement):
        #Benutzer erstellen
        recipe = User()
        recipe.set_first_name(first_name)
        recipe.set_last_name(last_name)
        recipe.set_nickname(nick_name)
        recipe.set_google_id(google_user_id)
        recipe.set_id(1) #default id, wird später in der Datenbank geupdatet

        with RecipeMapper() as mapper:
            return mapper.insert(recipe)

    #Auslesen aller Rezepte
    def get_all_recipe(self):
        with UserMapper() as mapper:
            return mapper.find_all()
        
    #Auslesen eines Rezepts
    def get_all_recipe(self, id):
        with UserMapper() as mapper:
            return mapper.find_all(id)
        
    


























































































admintest = HalilsTaverneAdministration()
list = admintest.get_all_users()
for user in list:
    print("User ID:", user.get_User_id())
    print("Nickname:", user.get_nickname())
    print("First Name:", user.get_first_name())
    print("Last Name:", user.get_last_name())
    print("Google ID:", user.get_google_id())
    print()

admintest.create_user("Tom","scd","jo",1283283)