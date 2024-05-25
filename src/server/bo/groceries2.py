from BusinessObject import BusinessObject
class Groceries2(BusinessObject):
    def __init__(self):
        super().__init__()
        self.__designation = None
        self._id

    def get_designation(self):
        return self.__designation

    def set_designation(self, designation):
        self.__designation = designation

    def get_Groceries_id(self):

        return self._id
    
    def set_Groceries_id(self, value):

        self._id = value
