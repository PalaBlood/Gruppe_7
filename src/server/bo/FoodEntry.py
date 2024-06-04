from BusinessObject import BusinessObject
from Unit import Unit

"""Imports muss jeder für sich anpassen."""

"""Meine Überlegung ist, dass wir einen doch Lebensmitteleintrag als Intanz benötigen. Ein Rezept beinhaltet 
 dann Lebensmitteleinträge, genauso wie der Kühlschrank.
 
 Der Kühlschrankinhalt oder ein Rezept bestehen also aus mehreren Lebensmitteleinträgen. Diese können erstellt, editiert und gelöscht werden.  
 
 Folgende offenen Fragen:
 - Wie können Lebensmitteleinträge verglichen werden? - Lebensmittel(Über ID), Menge(easy) und die Maßeinheit(Umrechnen) jeweils separat
 - Geht es auch ohne die Klasse Lebensmitteleintrag?
 - Sollte der Lebensmitteleintrag wirklich aus einem Lebensmittel, der Menge und der Maßeinheit bestehen, oder vielleicht nur aus 2 Klassen? - hab Quantity als Klasse mal wegelassen. 
 """



class FoodEntry(BusinessObject):
    def __init__(self, groceries_designation=None, quantity = 0, unit = None):
        super().__init__()
        self.__groceries_designation = groceries_designation
        self.__quantity = quantity
        self.__unit = unit

    def set_groceries_designation(self, groceries):
        self.__groceries_designation = groceries

    def get_groceries_designation(self):
        return self.__groceries_designation

    def get_quantity(self):
        return self.__quantity

    def set_quantity(self, quantity):
        self.__quantity = quantity

    def set_unit(self, unit):
        self.__unit = unit

    def get_unit(self):
        return self.__unit

    def get_quantity_in_base_unit(self):
        return self.__unit.convert_to_base(self.__quantity)

    def convert_to_base_unit(quantity, unit):
        return unit.convert_to_base(quantity)






    @staticmethod
    def from_dict(dictionary=dict()):
        obj = FoodEntry()
        obj.set_id(dictionary["id"])
        obj.set_groceries(dictionary["groceries"])
        obj.set_quantity(dictionary["quantity"])
        obj.set_unit(dictionary["unit"])









    
    
    

