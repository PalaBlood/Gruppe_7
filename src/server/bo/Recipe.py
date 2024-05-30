from BusinessObject import BusinessObject
from User import User

class Recipe(BusinessObject):
    def __init__(self):
        super().__init__()
        self.__title = ""
        self.__number_of_persons = 0
        self.__creator = None
        self.__content = []

    def get_title(self):
        return self.__title

    def set_title(self, title):
        self.__title = title

    def get_number_of_persons(self):
        return self.__number_of_persons

    def set_number_of_persons(self, number):
        if isinstance(number, int):
            self.__number_of_persons = number
        else:
            print("Fehler: Die Anzahl der Personen muss eine Ganzzahl sein.")

    def set_creator(self, creator=User()):
        self.__creator = creator

    def get_creator(self):
        return self.__creator

    def get_content(self):
        return self.__content

    def add_content(self, recipe_entry):
        from RecipeEntry import RecipeEntry  # Import innerhalb der Methode
        if isinstance(recipe_entry, RecipeEntry):
            self.__content.append(recipe_entry)

    @staticmethod
    def form_dict(dictionary=dict()):
        from RecipeEntry import RecipeEntry  # Import innerhalb der Methode
        obj = Recipe()
        obj.set_id(dictionary["id"])
        obj.set_title(dictionary["title"])
        obj.set_number_of_persons(dictionary["number of persons"])
        for entry_dict in dictionary["food entry"]:
            entry = RecipeEntry.from_dict(entry_dict)
            obj.add_content(entry)
        return obj

    
   
        