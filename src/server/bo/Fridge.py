from BusinessObject import BusinessObjec
from Groceries import Groceries


class Fridge(BusinessObject):
    def __init__(self): 
        super().__init__()
        self.__content = None
    
    def get_content(self): 
        return self.__content
    
    def add_content(self, groceries=Groceries()):
        
        
