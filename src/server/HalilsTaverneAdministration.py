"""Imports muss jeder für sich anpassen, dürften aber vom relativen Pfad gleich sein."""

"""from RecipeMapper import RecipeMapper
from HouseholdMapper import HouseholdMapper
from FridgeMapper import FridgeMapper
from UserMapper import UserMapper


from FridgeEntry import FridgeEntry
from FoodEntry import FoodEntry
from User import User
from Fridge import Fridge
from Household import Household
from ShoppingList import Shoppinglist
from Recipe import Recipe
"""

# Halils imports

from server.db.UserMapper import UserMapper
from server.db.HouseholdMapper import HouseholdMapper
from server.db.RecipeMapper import RecipeMapper
from server.db.FridgeMapper import FridgeMapper

from server.bo.FoodEntry import FoodEntry
from server.bo.User import User
from server.bo.Fridge import Fridge
from server.bo.Household import Household
from server.bo.ShoppingList import Shoppinglist
from server.bo.Recipe import Recipe
from server.bo.RecipeEntry import RecipeEntry
from server.bo.FridgeEntry import FridgeEntry

"""Hier kommt alles bezüglich des Service Layers rein
Es dient als 'Schnittstelle' zwischen dem Presentation Layer 
und dem Business Object Layer

Ausführbefehle (create, delete usw.) aller Art werden hier untergebracht. """


class HalilsTaverneAdministration(object):

    def __init__(self):
        pass

    # User spezifische Methoden

    def create_user(self, nick_name, first_name, last_name, household_id, google_user_id):
        # Benutzer erstellen
        user = User()
        user.set_first_name(first_name)
        user.set_last_name(last_name)
        user.set_nick_name(nick_name)
        user.set_id(1)  # default id, wird später in der Datenbank geupdatet
        user.set_household_id(household_id)
        user.set_google_user_id(google_user_id)

        with UserMapper() as mapper:
            return mapper.insert(user)

    # müssen noch richtig implementiert werden

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

    # Fridge spezifische Methoden
    def create_Fridge(self):
        """Wird beim Aufruf von 'create_household()' automatisch
        aufgerufen"""

        fridge = Fridge()
        fridge.set_id(1)  # ID wird in Mapperklasse/SQL angepasst

        with FridgeMapper() as mapper:
            return mapper.insert_fridge(fridge)

    def get_all_fridges(self):
        with FridgeMapper() as mapper:
            return mapper.find_all()

    def get_fridge_by_id(self, fridge_id):
        with FridgeMapper() as mapper:
            return mapper.find_by_id(fridge_id)

    def save_fridge(self, fridge_id):
        with FridgeMapper() as mapper:
            mapper.update_fridge(fridge_id)

    def delete_fridge(self, fridge):
        with FridgeMapper() as mapper:
            mapper.delete(fridge)

    def get_fridge_id_by_google_user_id(self, google_user_id):
        with FridgeMapper() as mapper:
            return mapper.get_fridge_id_by_google_user_id(google_user_id)

    # FridgeEntry spezifische Methoden

    def create_Fridge_entry(self, fridge_id, groceries_designation, quantity, unit):
        fridgeentry = FridgeEntry()
        fridgeentry.set_id(1)
        fridgeentry.set_groceries_designation(groceries_designation)
        fridgeentry.set_quantity(quantity)
        fridgeentry.set_unit(unit)
        fridgeentry.set_fridge_id(fridge_id)

        with FridgeMapper() as mapper:
            return mapper.insert_fridge_entry(fridgeentry)

    def get_all_fridge_entries(self):
        with FridgeMapper() as mapper:
            return mapper.find_all_entries()

    def get_fridge_entries_by_fridge_id(self, fridge_id):
        with FridgeMapper() as mapper:
            return mapper.find_entries_by_fridge_id(fridge_id)

    def save_fridge_entry(self, fridge_entry):
        with FridgeMapper() as mapper:
            return mapper.update_fridge_entry2(fridge_entry)

    def update_fridge_entry_quantity(self, fridge_id, groceries_designation, new_quantity, unit):
        with FridgeMapper() as mapper:
            mapper.update_fridge_entry(fridge_id, groceries_designation, new_quantity, unit)

    def delete_fridge_entry(self, fridge_entry):
        with FridgeMapper() as mapper:
            return mapper.delete_fridge_entry(fridge_entry)

    def find_fridge_entry_by_designation(self, groceries_designation):
        with FridgeMapper() as mapper:
            return mapper.get_full_existing_entry(groceries_designation)

    # recipe-spezifische methoden:

    def create_recipe(self, title, number_of_persons, creator, description, household_id):
        recipe = Recipe()
        recipe.set_title(title)
        recipe.set_number_of_persons(number_of_persons)
        recipe.set_creator(creator)
        recipe.set_description(description)
        recipe.set_household_id(household_id)

        with RecipeMapper() as mapper:
            return mapper.insert_recipe(recipe)

    def get_all_recipes(self):
        with RecipeMapper() as mapper:
            return mapper.find_all_recipes()

    def get_recipe_by_id(self, recipe_id):
        with RecipeMapper() as mapper:
            return mapper.find_recipe_by_id(recipe_id)

    def update_recipe(self, recipe):

        with RecipeMapper() as mapper:
            mapper.update_recipe(recipe)

    def delete_recipe(self, recipe): 
        """Delete a Recipe object."""
        with RecipeMapper() as mapper:
            mapper.delete_recipe(recipe)


    def get_recipe_id_by_title(self, title):
        with RecipeMapper() as mapper:
            return mapper.find_recipe_id_by_title(title)
        
    def get_recipes_by_household_id(self, household_id):

        with RecipeMapper() as mapper:
            return mapper.find_recipes_by_household_id(household_id)

    # recipeEntry spezifische Methoden

    def create_recipe_entry(self, recipe_id, groceries, quantity, unit):
        """Eventeuell noch ID hinzufügen"""
        recipe_entry = RecipeEntry()
        recipe_entry.set_recipe_id(recipe_id)
        recipe_entry.set_groceries_designation(groceries)
        recipe_entry.set_quantity(quantity)
        recipe_entry.set_unit(unit)

        with RecipeMapper() as mapper:
            return mapper.insert_recipe_entry(recipe_entry)

    def update_recipe_entry(self, recipe_entry):
        with RecipeMapper() as mapper:
            return mapper.update_recipe_entry(recipe_entry)

    def get_all_recipes_entries(self):
        with RecipeMapper() as mapper:
            return mapper.find_all_entries()

    def get_recipe_entries_by_designation(self, groceries_designation):

        pass

    """def update_recipe_entry(self, recipe_entry):
        with RecipeMapper as mapper:
            return mapper.update_recipe_entry(recipe_entry)"""

    def delete_recipe_entry(self, recipe_entry):
        with RecipeMapper() as mapper:
            return mapper.delete_recipe_entry(recipe_entry)


    def find_recipe_entries_by_recipe_id(self, recipe_id):
        with RecipeMapper() as mapper:
            return mapper.find_entries_by_recipe_id(recipe_id)

    def find_recipe_entries_by_recipe_id_and_designation(self, groceries_designation, recipe_id):
        with RecipeMapper() as mapper:
            return mapper.find_entries_by_recipe_id_and_groceries_designation(groceries_designation, recipe_id)


    # household-spezifische methoden:

    def create_household(self, Name):
        """Da wir bei der erstellung eines Households auch automatisch eine Fridge benötigen
        wird hier die create_fridge Methode verwendet. Somit enstehen die Relationen 'Fridge' und 'Household'.
        Household erhält den Primary Key vom jeweiligen Fridge Objekt als Fremdschlüssel zugeteilt

        param: name des Households"""

        household = Household()
        household.set_name(Name)

        fridge = self.create_Fridge()  #Objekt von fridge wird erzeugt
        household.set_fridge_id(fridge.get_id())  #ID der Fridge wird Household zugewiesen

        with HouseholdMapper() as mapper:
            return mapper.insert(household)

    def get_users_by_household_id(self, household_id):
        with UserMapper() as mapper:
            return mapper.find_users_by_household_id(household_id)

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

    def get_user_ids_of_household(self, household):
        with HouseholdMapper() as mapper:
            mapper.find_user_ids_for_household(household)
            
    def get_household_id_by_google_user_id(self, google_user_id):
        """Wir lesen die google_user_id vom jeweiligen User ein und holen 
        uns anhand dieser seine household ID"""
        with HouseholdMapper() as mapper:
            return mapper.get_household_id_by_google_user_id(google_user_id)

    # unitconversions mit UnitConverter()
    
    





