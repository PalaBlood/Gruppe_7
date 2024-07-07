"""Imports muss jeder für sich anpassen, dürften aber vom relativen Pfad gleich sein."""

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
from server.bo.Unit import Unit
from server.db.UnitMapper import UnitMapper

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
        # Ruft alle Benutzer ab
        with UserMapper() as mapper:
            return mapper.find_all()

    def save_user(self, user):
        # Speichert einen Benutzer
        with UserMapper() as mapper:
            mapper.update(user)

    def delete_user(self, user):
        # Löscht einen Benutzer
        with UserMapper() as mapper:
            mapper.delete(user)

    def get_user_by_nickname(self, nick_name):
        # Findet einen Benutzer anhand seines Nicknames
        with UserMapper() as mapper:
            return mapper.find_by_nickname(nick_name)

    def get_user_by_id(self, user_id):
        # Findet einen Benutzer anhand seiner ID
        with UserMapper() as mapper:
            return mapper.find_by_id(user_id)

    def get_user_by_google_user_id(self, google_user_id):
        # Findet einen Benutzer anhand seiner Google-User-ID
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
        # Ruft alle Kühlschränke ab
        with FridgeMapper() as mapper:
            return mapper.find_all()

    def get_fridge_by_id(self, fridge_id):
        # Findet einen Kühlschrank anhand seiner ID
        with FridgeMapper() as mapper:
            return mapper.find_by_id(fridge_id)

    def save_fridge(self, fridge_id):
        # Speichert einen Kühlschrank
        with FridgeMapper() as mapper:
            mapper.update_fridge(fridge_id)

    def delete_fridge(self, fridge):
        # Löscht einen Kühlschrank
        with FridgeMapper() as mapper:
            mapper.delete(fridge)

    def get_fridge_id_by_google_user_id(self, google_user_id):
        # Findet die Kühlschrank-ID anhand der Google-User-ID
        with FridgeMapper() as mapper:
            return mapper.get_fridge_id_by_google_user_id(google_user_id)



    # FridgeEntry spezifische Methoden

    def create_fridge_entry(self, fridge_id, groceries_designation, quantity, unit):
        # Erstellt einen neuen Eintrag im Kühlschrank
        fridgeentry = FridgeEntry()
        fridgeentry.set_id(1)
        fridgeentry.set_fridge_id(fridge_id)
        fridgeentry.set_groceries_designation(groceries_designation)
        fridgeentry.set_quantity(quantity)
        fridgeentry.set_unit(unit)


        with FridgeMapper() as mapper:
            return mapper.insert_fridge_entry(fridgeentry)

    def get_all_fridge_entries(self):
        # Ruft alle Einträge im Kühlschrank ab
        with FridgeMapper() as mapper:
            return mapper.find_all_entries()

    def get_fridge_entries_by_fridge_id(self, fridge_id):
        # Findet alle Einträge im Kühlschrank anhand der Kühlschrank-ID
        with FridgeMapper() as mapper:
            return mapper.find_entries_by_fridge_id(fridge_id)

    def save_fridge_entry(self, fridge_entry):
        # Speichert einen Eintrag im Kühlschrank
        with FridgeMapper() as mapper:
            return mapper.update_fridge_entry2(fridge_entry)

    def update_fridge_entry_quantity(self, fridge_id, groceries_designation, new_quantity, unit):
        # Aktualisiert die Menge eines Eintrags im Kühlschrank
        with FridgeMapper() as mapper:
            mapper.update_fridge_entry(fridge_id, groceries_designation, new_quantity, unit)

    def delete_fridge_entry(self, fridge_entry):
        # Löscht einen Eintrag im Kühlschrank
        with FridgeMapper() as mapper:
            return mapper.delete_fridge_entry(fridge_entry)

    def find_fridge_entry_by_designation(self, groceries_designation):
        # Findet einen Eintrag im Kühlschrank anhand der Bezeichnung
        with FridgeMapper() as mapper:
            return mapper.get_full_existing_entry(groceries_designation)



    # recipe-spezifische methoden:

    def create_recipe(self, title, number_of_persons, creator, description, household_id):
        # Erstellt ein neues Rezept
        recipe = Recipe()
        recipe.set_title(title)
        recipe.set_number_of_persons(number_of_persons)
        recipe.set_creator(creator)
        recipe.set_description(description)
        recipe.set_household_id(household_id)

        with RecipeMapper() as mapper:
            return mapper.insert_recipe(recipe)

    def get_all_recipes(self):
        # Ruft alle Rezepte ab
        with RecipeMapper() as mapper:
            return mapper.find_all_recipes()

    def get_recipe_by_id(self, recipe_id):
        # Findet ein Rezept anhand seiner ID
        with RecipeMapper() as mapper:
            return mapper.find_recipe_by_id(recipe_id)

    def update_recipe(self, recipe):
        # Aktualisiert ein Rezept
        with RecipeMapper() as mapper:
            mapper.update_recipe(recipe)

    def delete_recipe(self, recipe): 
        # Löscht ein Rezept
        with RecipeMapper() as mapper:
            mapper.delete_recipe(recipe)



    def get_recipe_id_by_title(self, title):
        # Findet die Rezept-ID anhand des Titels
        with RecipeMapper() as mapper:
            return mapper.find_recipe_id_by_title(title)



    def get_recipes_by_household_id(self, household_id):
        # Ruft alle Rezepte eines Haushalts ab
        with RecipeMapper() as mapper:
            return mapper.find_recipes_by_household_id(household_id)



    # recipeEntry spezifische Methoden

    def create_recipe_entry(self, recipe_id, groceries, quantity, unit):
        # Erstellt einen neuen Eintrag im Rezept
        recipe_entry = RecipeEntry()
        recipe_entry.set_recipe_id(recipe_id)
        recipe_entry.set_groceries_designation(groceries)
        recipe_entry.set_quantity(quantity)
        recipe_entry.set_unit(unit)

        with RecipeMapper() as mapper:
            return mapper.insert_recipe_entry(recipe_entry)

    def update_recipe_entry(self, recipe_entry):
        # Aktualisiert einen Eintrag im Rezept
        with RecipeMapper() as mapper:
            return mapper.update_recipe_entry(recipe_entry)

    def get_all_recipes_entries(self):
        # Ruft alle Einträge in Rezepten ab
        with RecipeMapper() as mapper:
            return mapper.find_all_entries()


    def delete_recipe_entry(self, recipe_entry):
        # Löscht einen Eintrag im Rezept
        with RecipeMapper() as mapper:
            return mapper.delete_recipe_entry(recipe_entry)


    def find_recipe_entries_by_recipe_id(self, recipe_id):
        # Findet alle Einträge eines Rezepts anhand der Rezept-ID
        with RecipeMapper() as mapper:
            return mapper.find_entries_by_recipe_id(recipe_id)

    def find_recipe_entries_by_recipe_id_and_designation(self, groceries_designation, recipe_id):
        # Findet Einträge eines Rezepts anhand der Bezeichnung und der Rezept-ID
        with RecipeMapper() as mapper:
            return mapper.find_entries_by_recipe_id_and_groceries_designation(groceries_designation, recipe_id)



    # household-spezifische methoden:

    def create_household(self, Name, password):
        """Da wir bei der erstellung eines Households auch automatisch eine Fridge benötigen
        wird hier die create_fridge Methode verwendet. Somit enstehen die Relationen 'Fridge' und 'Household'.
        Household erhält den Primary Key vom jeweiligen Fridge Objekt als Fremdschlüssel zugeteilt

        param: name des Households"""

        household = Household()
        household.set_name(Name)
        household.set_password(password)


        fridge = self.create_Fridge()  #Objekt von fridge wird erzeugt
        household.set_fridge_id(fridge.get_id())  #ID der Fridge wird Household zugewiesen


        with HouseholdMapper() as mapper:
            return mapper.insert(household)

    def get_users_by_household_id(self, household_id):
        # Findet alle Benutzer anhand der Haushalt-ID
        with UserMapper() as mapper:
            return mapper.find_users_by_household_id(household_id)

    def get_all_households(self):
        # Ruft alle Haushalte ab
        with HouseholdMapper() as mapper:
            return mapper.find_all()

    def find_household_by_id(self, household_id):
        # Findet einen Haushalt anhand seiner ID
        with HouseholdMapper() as mapper:
            return mapper.find_by_id(household_id)

    def save_household(self, household):
        # Speichert einen Haushalt
        with HouseholdMapper() as mapper:
            mapper.update(household)

    def delete_household(self, household):
        # Löscht einen Haushalt
        with HouseholdMapper() as mapper:
            mapper.delete(household)

    def get_user_ids_of_household(self, household):
        # Findet alle Benutzer-IDs innerhalb eines Haushalts
        with HouseholdMapper() as mapper:
            mapper.find_user_ids_for_household(household)
            
    def get_household_id_by_google_user_id(self, google_user_id):
        """Wir lesen die google_user_id vom jeweiligen User ein und holen 
        uns anhand dieser seine household ID"""
        with HouseholdMapper() as mapper:
            return mapper.get_household_id_by_google_user_id(google_user_id)


    # Unit spezifische Methoden

    def create_unit(self, designation, household_id):
        """Neuer Unit-Eintrag in der DB"""

        unit = Unit()
        unit.set_designation(designation)
        unit.set_household_id(household_id)

        with UnitMapper() as mapper:
            return mapper.insert_unit(unit)


    def get_all_units_by_household_id(self, household_id):
        """Auslesen aller Units eines bestimmten Households"""

        with UnitMapper() as mapper:
            return mapper.find_unit_by_household_id(household_id)


    def update_unit(self):
        """Unit-Eintrag wird angepasst"""

        pass

    def delete_unit_by_id(self, id):
        """Löscht Unit-Eintrag in der DB anhand der id"""

        with UnitMapper() as mapper:
            mapper.delete_unit(id)

    def get_unit_by_designation_and_household_id(self, designation, household_id):
        """Gibt Unit-Eintrag anhand der designation der Unit und
        household_id des users zurück"""

        with UnitMapper() as mapper:
            return  mapper.find_unit_by_designation_and_household_id(designation, household_id)



"""Unit Tests"""
#adm = HalilsTaverneAdministration()


#adm.create_unit("Kilogramm", 2)   #geht
#print(adm.get_all_units_by_household_id(2))   #geht
#adm.delete_unit(1)   #geht
#print(adm.get_unit_by_designation_and_household_id("Kilogramm", 2))   #geht



    
    





