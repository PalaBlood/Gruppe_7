from BusinessObject import BusinessObject 

class UnitOfMeasurement(BusinessObject):
    def __init__(self):
        super().__init__()
        self.__designation = ""
    
    def get_designation(self):
        """Bezeichnung auslesen"""
        return self.__designation
    
    def set_designation(self, designation):
        """Bezeichnung setzen"""
        self.__designation = designation
    
    @staticmethod
    def form_dict(dictionary=dict()):
        obj = UnitOfMeasurement()
        obj.set_id(dictionary["id"])
        obj.set_designation(dictionary["designation"])

"""Wir könnten im Hintergrund alles in Gramm,ML oder Stück berechnen lassen
-Am einfachsten wäre es, die Maßeinheiten selbst vorzugeben und der User wählt eine davon aus (jedoch vielleicht nicht die Aufgabenstellung)
"""
   
    

