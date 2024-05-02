from BusinessObject import BusinessObject 


class Groceries(BusinessObject):
    def __init__(self):
        super().__init__()
        self.__name = ""
    
    def get_name(self):
        """Bezeichnung auslesen"""
        return self.__name()
    
    def set_name(self, name):
        """Bezeichnung setzen"""
        self.__name = name
    
    
    @staticmethod
    def form_dict(dictionary=dict()):
        pass 
    
        





