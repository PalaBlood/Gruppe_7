from BusinessObject import BusinessObject
from FoodEntry import FootEntry

class Fridge(BusinessObject):
    def __init__(self): 
        super().__init__()
        self.__content = []
    
    def add_entry(self, entry=FootEntry):
        """Lebenmitteleintrag hinzufügen"""
        self.__content.append(entry)
    
    
    @staticmethod
    def form_dict(dictionary=dict()):
        obj = Fridge()
        obj.set_id(dictionary["id"])
        obj.add_entry(dictionary["food entry"])
    
    