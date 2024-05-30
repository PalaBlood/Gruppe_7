from BusinessObject import BusinessObject
class Groceries(BusinessObject):
    def __init__(self):
        super().__init__()
        self.__designation = None

    def get_designation(self):
        return self.__designation

    def set_designation(self, designation):
        self.__designation = designation

