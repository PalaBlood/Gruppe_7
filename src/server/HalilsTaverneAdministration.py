"""Imports muss jeder für sich anpassen, dürften aber vom relativen Pfad gleich sein."""

from RecipeMapper import RecipeMapper
from HouseholdMapper import HouseholdMapper
from FridgeMapper import FridgeMapper2
from UserMapper import UserMapper


from FridgeEntry import FridgeEntry
from FoodEntry import FoodEntry
from User import User
from Fridge import Fridge
from Household import Household
from ShoppingList import Shoppinglist
from Recipe import Recipe



#Halils imports

from server.bo.User import User
from server.db.UserMapper import UserMapper
from server.db.HouseholdMapper import HouseholdMapper
from server.db.RecipeMapper import RecipeMapper
from server.db.FridgeMapper import FridgeMapper2


from server.bo.FoodEntry import FoodEntry
from server.bo.User import User
from server.bo.Fridge import Fridge
from server.bo.Household import Household
from server.bo.ShoppingList import Shoppinglist
from server.bo.Recipe import Recipe




"""Hier kommt alles bezüglich des Service Layers rein
Es dient als 'Schnittstelle' zwischen dem Presentation Layer 
und dem Business Object Layer

Ausführbefehle (create, delete usw.) aller Art werden hier untergebracht. """


class HalilsTaverneAdministration(object):

    def __init__(self):
            pass
    
    #User spezifische Methoden

    def create_user(self, nick_name, first_name, last_name, google_user_id):
          #Benutzer erstellen
          user = User()
          user.set_first_name(first_name)
          user.set_last_name(last_name)
          user.set_nick_name(nick_name)
          user.set_id(1) #default id, wird später in der Datenbank geupdatet
          user.set_google_user_id(google_user_id)

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
        
    def get_user_by_google_user_id(self, google_user_id):

        with UserMapper() as mapper:
            return mapper.find_by_google_user_id(google_user_id)

    #Fridge spezifische Methoden

    def create_Fridge(self):

        fridge = Fridge()
        fridge.set_id(1)

        with FridgeMapper2() as mapper:
            return mapper.insert(fridge)

    def get_all_fridges(self):     

        with FridgeMapper2() as mapper:
            return mapper.find_all()

    def get_fridge_by_id(self, fridge_id):

        with FridgeMapper2() as mapper:
            return mapper.find_by_id(fridge_id)

    def save_fridge(self, fridge):

        with FridgeMapper2() as mapper:
            mapper.update(fridge)

    def delete_fridge(self, fridge):

        with FridgeMapper2() as mapper:
            mapper.delete(fridge)
    #FridgeEntry spezifische Methoden

    def create_Fridge_entry(self, unit, quantity, groceries, fridge_id):

        fridgeentry = FridgeEntry()
        fridgeentry.set_fridge_id(fridge_id)
        fridgeentry.set_id(1)
        fridgeentry.set_unit(unit)
        fridgeentry.set_quantity(quantity)
        fridgeentry.set_groceries_designation(groceries)

        with FridgeMapper2() as mapper:
            return mapper.insert_fridge_entry(fridgeentry)
   
    def get_all_fridge_entries(self):

        with FridgeMapper2() as mapper:
            return mapper.find_all_entries()

    def save_fridge_entry(self, fridge_entry):

        with FridgeMapper2() as mapper:
            return mapper.update_fridge_entry(fridge_entry)

    def delete_fridge_entry(self, fridge_entry):

        with FridgeMapper2() as mapper:
            return mapper.delete_fridge_entry(fridge_entry)

    #recipe-spezifische methoden:

    def create_recipe(self, title, number_of_persons, creator, content):

        recipe = Recipe()
        recipe.set_id(1)
        recipe.set_title(title)
        recipe.set_number_of_persons(number_of_persons)
        recipe.set_creator(creator)
        recipe.add_content(content)

        with RecipeMapper() as mapper:
            return mapper.insert(recipe)



    #recipeEntry spezifische Methoden






    #household-spezifische methoden:

    def create_household(self, name):

        household = Household()
        household.set_name(name)

        with HouseholdMapper() as mapper:
            return mapper.insert(household)

    def get_all_households(self):

        with HouseholdMapper() as mapper:
            return mapper.find_all()

    def find_household_by_id(self, household_id):

        with HouseholdMapper() as mapper:
            return mapper.find_by_id(household_id)

    def save_household(self, household):

        with HouseholdMapper() as mapper:
            mapper.update(household)

    def delete_household(self, household):

        with HouseholdMapper() as mapper:
            mapper.delete(household)



















    #unitconversions mit UnitConverter()















admintest = HalilsTaverneAdministration()

admintest.create_household("Neuer Haushalt")
print(admintest.get_all_households())


"""admintest.create_Fridge_entry('Gramm',500,'Kartoffel', 1)
list2 = admintest.get_all_fridge_entries()
for fridge_entry in list2:
    print("Designation:", fridge_entry.get_groceries_designation())
    print("Unit:", fridge_entry.get_unit())
    print(fridge_entry.get_quantity())
    print(fridge_entry.get_fridge())
"""

list = admintest.get_all_users()
for user in list:
    print("User ID:", user.get_id())
    print("Nickname:", user.get_nick_name())
    print("First Name:", user.get_first_name())
    print("Last Name:", user.get_last_name())
    print("household_id:", user.get_household_id())
    print("google_user_id",user.get_google_user_id())
    print()




admintest.create_user("Lisa","Müller","jo",12)





