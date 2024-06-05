from BusinessObject import BusinessObject
from User import User

class Recipe(BusinessObject):
    def __init__(self):
        super().__init__()
        self.__title = ""
        self.__number_of_persons = 0
        self.__creator = ""  # Hinzugefügt
        self.__description = ""

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


    def __repr__(self):
        """__repr__ und __str__ werdeb zum Auslesen auf der console verwendet"""
        return (f"Recipe(Title: {self.__title}, Number of Persons: {self.__number_of_persons}, "
                f"Creator ID: {self.__creator}, Description: {self.__description})")

    def __str__(self):
        return f"Title: {self.__title}, Serves: {self.__number_of_persons}, Created by: {self.__creator}, Description: {self.__description}"

    @staticmethod
    def form_dict(dictionary=dict()):

        obj = Recipe()
        obj.set_id(dictionary["id"])
        obj.set_title(dictionary["title"])
        obj.set_number_of_persons(dictionary["number_of_persons"])
        obj.set_creator(dictionary["creator"])
        obj.set_description(dictionary["description"])

        return obj





        