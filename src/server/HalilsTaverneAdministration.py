"""Imports muss jeder für sich anpassen, dürften aber vom relativen Pfad gleich sein."""

"""from Gruppe_7.src.server.db.RecipeMapper import RecipeMapper
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
from Gruppe_7.src.server.bo.UnitConverters import UnitConverter"""



#Halils imports

from src.server.bo.User import User
from src.server.db.UserMapper import UserMapper
from src.server.db.HouseholdMapper import HouseholdMapper
from src.server.db.RecipeMapper import RecipeMapper
from src.server.db.FridgeMapper import FridgeMapper

from src.server.bo.FoodEntry import FoodEntry
from src.server.bo.User import User
from src.server.bo.Fridge import Fridge
from src.server.bo.Groceries import Groceries
from src.server.bo.Household import Household
from src.server.bo.ShoppingList import ShoppingList
from src.server.bo.UnitConverters import UnitConverter




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

        with UserMapper() as mapper:
            return mapper.find_by_nickname(nick_name)

    def get_user_by_id(self, user_id):

        with UserMapper() as mapper:
            return mapper.find_by_id(user_id)

    #Fridge spezifische Methoden

    def create_Fridge(self):

        fridge = Fridge()
        fridge.set_id(1)

        with FridgeMapper() as mapper:
            return mapper.insert(fridge)

    def get_all_fridges(self):     #findet doch eigentlich keine anwendung in der praxis?

        with FridgeMapper() as mapper:
            return mapper.find_all()

    def get_fridge_by_id(self, fridge_id):

        with FridgeMapper() as mapper:
            return mapper.find_by_id(fridge_id)

    def save_fridge(self, fridge):

        with FridgeMapper() as mapper:
            mapper.update(fridge)

    def delete_fridge(self, fridge):

        with FridgeMapper() as mapper:
            mapper.delete(fridge)

    #Groceries spezifische Methoden

    def create_Grocerie(self, designation, unit_of_measurement, quantity):

        groceries = Groceries()
        groceries.set_designation(designation)
        groceries.set_unit_of_measurement(unit_of_measurement)
        groceries.set_quantity(quantity)
        groceries.set_id(1)

        with GroceriesMapper as mapper:
            return mapper.insert(groceries)























































































admintest = HalilsTaverneAdministration()
list = admintest.get_all_users()
for user in list:
    print("User ID:", user.get_User_id())
    print("Nickname:", user.get_nick_name())
    print("First Name:", user.get_first_name())
    print("Last Name:", user.get_last_name())
    print()

admintest.create_user("Tom","scd","jo")