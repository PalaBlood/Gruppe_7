from BusinessObject import BusinessObject

class Unit(BusinessObject):
    def __init__(self, name, conversion_factor):
        super.__init__()
        self.name = name
        self.conversion_factor = conversion_factor

    def convert_to_base(self, quantity):
        return quantity * self.conversion_factor

    def __repr__(self):
        return f"{self.name} (Factor: {self.conversion_factor})"
