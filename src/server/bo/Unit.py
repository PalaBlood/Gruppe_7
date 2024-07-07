from server.bo.BusinessObject import BusinessObject

class Unit(BusinessObject):
    def __init__(self):
        super().__init__()
        self.__designation = "" #Bezeichnung der Einheit
        self.__household_id = None #ID des zugehörigen Haushalts

    def get_designation(self):
        #Gibt die Bezeichnung der Einheit zurück
        return  self.__designation

    def set_designation(self, name):
        #Setzt die Bezeichnung der Einheit
        self.__designation = name

    def get_household_id(self):
        #Gibt die ID des zugehörigen Haushalts zurück
        return self.__household_id

    def set_household_id(self, household_id):
        #Setzt die ID des zugehörigen Haushalts
        self.__household_id = household_id



    def __repr__(self):
        #Gibt eine detaillierte repräsentative Darstellung der Einheit zurück
        return f"<Unit(id={self._id}, name={self.__designation}, household_id={self.__household_id})>"

    def __str__(self):
        #Gibt eine textuelle Darstellung der Einheit zurück
        return f"ID: {self._id}, Designation: {self.__designation}, Household ID: {self.__household_id}"



    @staticmethod
    def from_dict(dictionary=dict()):
        obj = Unit()
        obj.set_id(dictionary["id"]) #Setzt die ID der Einheit aus dem Dictionary
        obj.set_designation(dictionary["designation"]) #Setzt die Bezeichnung der Einheit aus dem Dictionary
        obj.set_household_id(dictionary["household_id"]) #Setzt die Haushalt-ID aus dem Dictionary

        return obj



#Beispielhafte Verwendung und Test der Unit-Klasse
if __name__ == "__main__":
    gram = Unit()
    gram.set_name("Gramm")
    gram.set_conversion_factor(1)
    kilogram = Unit()
    kilogram.set_name("Kilogramm")
    kilogram.set_conversion_factor(1000)

