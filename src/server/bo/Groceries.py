from BusinessObject import BusinessObject 


class Groceries(BusinessObject):
    def __init__(self):
        super().__init__()
        self.__designation = ""
    
    def get_designation(self):
        """Bezeichnung auslesen"""
        return self.__designation()
    
    def set_designation(self, designation):
        """Bezeichnung setzen"""
        self.__designation = designation
    
    
    @staticmethod
    def form_dict(dictionary=dict()):
        obj = Groceries()
        obj.set_id(dictionary["id"])
        obj.set_designation(dictionary["designation"])
    
        





