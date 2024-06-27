from BusinessObject import BusinessObject

class Unit(BusinessObject):
    def __init__(self):
        super().__init__()
        self.__designation = ""
        self.__household_id = None

    def get_designation(self):
        return  self.__designation

    def set_designation(self, name):
        self.__designation = name

    def get_household_id(self):
        return self.__household_id

    def set_household_id(self, household_id):
        self.__household_id = household_id



    def __repr__(self):
        return f"<Unit(id={self._id}, name={self.__designation}, household_id={self.__household_id})>"

    def __str__(self):
        return f"ID: {self._id}, Designation: {self.__designation}, Household ID: {self.__household_id}"


    @staticmethod
    def from_dict(dictionary=dict()):
        obj = Unit()
        obj.set_id(dictionary["id"])
        obj.set_designation(dictionary["designation"])
        obj.set_household_id(dictionary["household_id"])

        return obj



if __name__ == "__main__":
    gram = Unit()
    gram.set_name("Gramm")
    gram.set_conversion_factor(1)
    kilogram = Unit()
    kilogram.set_name("Kilogramm")
    kilogram.set_conversion_factor(1000)

    print(kilogram)