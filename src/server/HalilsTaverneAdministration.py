"""Imports muss jeder für sich anpassen, dürften aber vom relativen Pfad gleich sein."""

from RecipeMapper import RecipeMapper
from HouseholdMapper import HouseholdMapper
from GroceriesMapper import GroceriesMapper
from FridgeMapper import FridgeMapper
from UserMapper import UserMapper

from FoodEntry import FoodEntry
from User import User
from Fridge import Fridge
from Groceries import Groceries
from Household import Household
from ShoppingList import ShoppingList
from Groceries import Groceries
from Recipe import Recipe



"""#Halils imports

from server.bo.User import User
from server.db.UserMapper import UserMapper
from server.db.HouseholdMapper import HouseholdMapper
from server.db.RecipeMapper import RecipeMapper
from server.db.FridgeMapper import FridgeMapper
from server.db.FridgeMapper import GroceriesMapper

from server.bo.FoodEntry import FoodEntry
from server.bo.User import User
from server.bo.Fridge import Fridge
from server.bo.Groceries import Groceries
from server.bo.Household import Household
from server.bo.ShoppingList import ShoppingList
from server.bo.UnitConverters import UnitConverter
from server.bo.Recipe import Recipe"""




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

        with GroceriesMapper() as mapper:
            return mapper.insert(groceries)
        

    def get_all_groceries(self):

        with GroceriesMapper() as mapper:
            mapper.find_all()

    def get_groceries_by_id(self, groceries_id):

        with GroceriesMapper() as mapper:
            return mapper.find_by_id(groceries_id)
        
    def save_groceries(self, groceries):

        with GroceriesMapper() as mapper:
            return mapper.update(groceries)
        
    def delete_groceries(self, groceries):

        with GroceriesMapper() as mapper:
            mapper.delete(groceries)

    #recipe-spezifische methoden:

    def create_recipe(self, title, number_of_persons, creator, content):

        recipe = Recipe()
        recipe.set_title(title)
        recipe.set_number_of_persons(number_of_persons)
        recipe.set_creator(creator)
        recipe.add_content(content)
        recipe.set_id(1)

        with RecipeMapper as mapper:
            return mapper.insert(recipe)

    def get_all_recipes(self):

        with RecipeMapper() as mapper:
            mapper.find_all()

    def get_recipes_by_id(self, recipe_id):

        with RecipeMapper() as mapper:
            return mapper.find_by_id()

    def save_recipe(self, recipe):

        with RecipeMapper() as mapper:
            return mapper.update(recipe)

    def delete_recipe(self, recipe):

        with RecipeMapper() as mapper:
            mapper.delete(recipe)


    #shoppinglist-spezifische methoden:









    #household-spezifische methoden:












    #foodentry-spezifische methoden:
















    #unitconversions mit UnitConverter()




























































































admintest = HalilsTaverneAdministration()
list = admintest.get_all_users()
for user in list:
    print("User ID:", user.get_User_id())
    print("Nickname:", user.get_nick_name())
    print("First Name:", user.get_first_name())
    print("Last Name:", user.get_last_name())
    print()

admintest.create_user("Tom","scd","jo")