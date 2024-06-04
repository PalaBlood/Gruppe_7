from BusinessObject import BusinessObject

class Unit(BusinessObject):
    def __init__(self):
        super().__init__()
        self.__name = ""
        self.__conversion_factor = 1


    def set_conversion_factor(self, conversion_factor):
        self.__conversion_factor = conversion_factor

    def get_conversion_factor(self):
        return self.__conversion_factor


    def convert_to_base(self, quantity):
        return quantity * self.__conversion_factor

    def set_name(self, name):
        self.__name = name

    def get_name(self):
        return  self.__name


    def __repr__(self):
        return f"{self.__name} (Factor: {self.__conversion_factor})"

    def __str__(self):
        return f"Bezeichnung: {self.__name}, Verhältnis: {self.__conversion_factor}:1"


    @staticmethod
    def from_dict(dictionary=dict()):
        obj = Unit()
        obj.set_id(dictionary["id"])
        obj.set_name(dictionary["name"])
        obj.set_conversion_factor(dictionary["conversion_factor"])



if __name__ == "__main__":
    gram = Unit()
    gram.set_name("Gramm")
    gram.set_conversion_factor(1)
    kilogram = Unit()
    kilogram.set_name("Kilogramm")
    kilogram.set_conversion_factor(1000)

    print(kilogram)