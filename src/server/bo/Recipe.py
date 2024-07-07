from server.bo.BusinessObject import BusinessObject

class Recipe(BusinessObject):
    def __init__(self):
        super().__init__()
        self._title = "" #Titel des Rezepts
        self._number_of_persons = ""  #Anzahl der Personen, für die das Rezept gedacht ist
        self._creator = ""  #Ersteller des Rezepts
        self._description = "" #Beschreibung des Rezepts
        self._household_id = None #ID des zugehörigen Haushalts
        

    def get_title(self):
        #Gibt den Titel des Rezepts zurück
        return self._title

    def set_title(self, title):
        #Setzt den Titel des Rezepts
        self._title = title

    def get_number_of_persons(self):
        #Gibt die Anzahl der Personen zurück, für die das Rezept gedacht ist
        return self._number_of_persons

    def set_number_of_persons(self, number):
        #Setzt die Anzahl der Personen, für die das Rezept gedacht ist
        self._number_of_persons = number

    def set_creator(self, creator):
        #Setzt den Ersteller des Rezepts
        self._creator = creator

    def get_creator(self):
        #Gibt den Ersteller des Rezepts zurück
        return self._creator

    def get_description(self):
        #Gibt die Beschreibung des Rezepts zurück
        return self._description

    def set_description(self, description):
        #Setzt die Beschreibung des Rezepts
        self._description = description

    def get_household_id(self):
        #Gibt die ID des zugehörigen Haushalts zurück
        return self._household_id

    def set_household_id(self, id):
        #Setzt die ID des zugehörigen Haushalts
        self._household_id = id
    
    


    def __repr__(self):
        #Gibt eine Darstellung des Rezepts zurück
        return (f"Recipe(Title: {self._title}, Number of Persons: {self._number_of_persons}, "
                f"Creator ID: {self._creator}, Description: {self._description}, Household ID: {self._household_id})")

    def __str__(self):
        #Gibt eine textuelle Darstellung des Rezepts zurück
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
