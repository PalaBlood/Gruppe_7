from server.bo.BusinessObject import BusinessObject

class Recipe(BusinessObject):
    def __init__(self):
        super().__init__()
        self._title = ""
        self._number_of_persons = ""
        self._creator = ""  
        self._description = ""
        self._household_id = None

    def get_title(self):
        return self._title

    def set_title(self, title):
        self._title = title

    def get_number_of_persons(self):
        return self._number_of_persons

    def set_number_of_persons(self, number):
        self._number_of_persons = number

    def set_creator(self, creator):
        self._creator = creator

    def get_creator(self):
        return self._creator

    def get_description(self):
        return self._description

    def set_description(self, description):
        self._description = description

    def get_household_id(self):
        return self._household_id

    def set_household_id(self, id):
        self._household_id = id

    def __repr__(self):
        return (f"Recipe(Title: {self._title}, Number of Persons: {self._number_of_persons}, "
                f"Creator ID: {self._creator}, Description: {self._description}, Household ID: {self._household_id})")

    def __str__(self):
        return f"Title: {self._title}, Serves: {self._number_of_persons}, Created by: {self._creator}, Description: {self._description}, Household ID: {self._household_id}"

    @staticmethod
    def form_dict(dictionary):
        obj = Recipe()
        obj.set_id(dictionary.get('id'))
        obj.set_title(dictionary.get('title'))
        obj.set_creator(dictionary.get('creator'))
        obj.set_number_of_persons(dictionary.get('numberOfPersons'))
        obj.set_description(dictionary.get('description'))
        obj.set_household_id(dictionary.get('household_id'))
        return obj

    @staticmethod
    def from_dict(dictionary):
        obj = Recipe()
        obj.set_id(dictionary.get('id'))
        obj.set_title(dictionary.get('title'))
        obj.set_creator(dictionary.get('creator'))
        obj.set_number_of_persons(dictionary.get('number_of_persons'))
        obj.set_description(dictionary.get('description'))
        obj.set_household_id(dictionary.get('household_id'))
        return obj
