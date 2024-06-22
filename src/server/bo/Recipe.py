from BusinessObject import BusinessObject

class Recipe(BusinessObject):
    def __init__(self):
        super().__init__()
        self.__title = ""
        self.__number_of_persons = 0
        self.__creator = ""  # Hinzugefügt
        self.__description = ""
        self.__household_id = None

    def get_title(self):
        return self.__title

    def set_title(self, title):
        self.__title = title

    def get_number_of_persons(self):
        return self.__number_of_persons

    def set_number_of_persons(self, number):
        self.__number_of_persons = number

    def set_creator(self, creator):
        self.__creator = creator

    def get_creator(self):
        return self.__creator

    def get_description(self):
        return self.__description

    def set_description(self, description):
        self.__description = description
        
    def get_household_id(self):
        return self.__household_id
    
    def set_household_id(self, id):
        self.__household_id = id
    
    def __repr__(self):
        """__repr__ und __str__ werden zum Auslesen auf der Konsole verwendet"""
        return (f"Recipe(Title: {self.__title}, Number of Persons: {self.__number_of_persons}, "
                f"Creator ID: {self.__creator}, Description: {self.__description}, Household ID: {self.__household_id})")

    def __str__(self):
        return f"Title: {self.__title}, Serves: {self.__number_of_persons}, Created by: {self.__creator}, Description: {self.__description}, Household ID: {self.__household_id}"

    @staticmethod
    def form_dict(dictionary):
        obj = Recipe()
        obj.set_id(dictionary.get('id'))
        obj.set_title(dictionary.get('title'))  # Aktualisiert um konsistente Benennung sicherzustellen
        obj.set_creator(dictionary.get('creator'))
        obj.set_number_of_persons(dictionary.get('number_of_persons'))
        obj.set_description(dictionary.get('description'))  # Aktualisiert um konsistente Benennung sicherzustellen
        obj.set_household_id(dictionary.get('household_id'))
        return obj
