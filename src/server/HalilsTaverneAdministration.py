"""Imports muss jeder für sich anpassen, dürften aber vom relativen Pfad gleich sein."""
"""
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
"""


#Halils imports

from .bo.User import User
from .db.UserMapper import UserMapper
from .db.HouseholdMapper import HouseholdMapper
from .db.RecipeMapper import RecipeMapper
from .db.FridgeMapper import FridgeMapper

from .bo.FoodEntry import FoodEntry
from .bo.User import User
from .bo.Fridge import Fridge
from .bo.Groceries import Groceries
from .bo.Household import Household
from .bo.ShoppingList import ShoppingList
from .bo.UnitConverters import UnitConverter




"""Hier kommt alles bezüglich des Service Layers rein
Es dient als 'Schnittstelle' zwischen dem Presentation Layer 
und dem Business Object Layer

Ausführbefehle (create, delete usw.) aller Art werden hier untergebracht. """


class HalilsTaverneAdministration(object):

    def __init__(self):
            pass
    
    #User spezifische Methoden

    def create_user(self, nick_name, first_name, last_name):
          #Benutzer erstellen
          user = User()
          user.set_first_name(first_name)
          user.set_last_name(last_name)
          user.set_nick_name(nick_name)
          user.set_id(1) #default id, wird später in der Datenbank geupdatet

          with UserMapper() as mapper:
                return mapper.insert(user)
          
    #müssen noch richtig implementiert werden

    def get_all_users(self):

        with UserMapper() as mapper:
            return mapper.find_all()

    def save_user(self, user):

        with UserMapper() as mapper:
            mapper.update(user)

    def delete_user(self, user):

        with UserMapper() as mapper:
            mapper.delete(user)

    def get_user_by_nickname(self, nick_name):

        with UserMapper as mapper:
            return mapper.find_by_nickname(nick_name)

    def get_user_by_id(self, user_id):

        with UserMapper as mapper:
            return mapper.find_by_id(user_id)

    #Fridge spezifische Methoden

    def create_Fridge(self):

        fridge = Fridge()
        fridge.set_id(1)

        with FridgeMapper as mapper:
            return mapper.insert(fridge)

    def get_all_fridges(self):     #findet doch eigentlich keine anwendung in der praxis?

        with FridgeMapper as mapper:
            return mapper.find_all()

    def get_fridge_by_id(self, fridge_id):

        with FridgeMapper as mapper:
            return mapper.find_by_id(fridge_id)






















































































admintest = HalilsTaverneAdministration()
list = admintest.get_all_users()
for user in list:
    print("User ID:", user.get_User_id())
    print("Nickname:", user.get_nick_name())
    print("First Name:", user.get_first_name())
    print("Last Name:", user.get_last_name())
    print()

admintest.create_user("Tom","scd","jo")