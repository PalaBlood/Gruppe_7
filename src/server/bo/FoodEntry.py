from BusinessObject import BusinessObject
from Groceries import Groceries

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
    def __init__(self):
        super().__init__()
        self.__groceries = None
        self.__quantity = None
        self.__unit = None

    def set_groceries(self, groceries=Groceries()):
        self.__groceries = groceries.get_id()

    def get_groceries(self):
        return self.__groceries

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

    def can_prepare_recipe(recipe, fridge_entries):
        for entry in recipe.entries:
            required_quantity = entry.get_quantity_in_base_unit()
            available_quantity = 0
            for fridge_entry in fridge_entries:
                if fridge_entry.get_groceries() == entry.get_groceries():
                    available_quantity += fridge_entry.get_quantity_in_base_unit()
            if available_quantity < required_quantity:
                return False
        return True


    def __str__(self):
        return f"Lebensmittel: {self.__groceries}, Menge: {self.get_quantity()} {self.get_unit()}"
    @staticmethod
    def from_dict(dictionary=dict()):
        obj = FoodEntry()
        obj.set_id(dictionary["id"])
        obj.set_groceries(dictionary["groceries"])
        obj.set_quantity(dictionary["quantity"])
        obj.set_unit(dictionary["unit"])

    def __str__(self) -> str:
        """Beschreibung des Eintrags"""
        return f"Lebensmittel: {self.__groceries()}, Menge: {self.get_quantity()}, Masseinheit: {self.get_unit_of_measurement()}" #Aktuell nicht texutell. Man könnte das zwar machen, ich glaube aber dass wir das lieber über die DB rausfiltern sollen






#Ansatz, wie man die Einträge vergleichen könnte
#Jedoch müssten wir dann trz noch schauen, wie wir es mit der Maßeinheit machen
    """def equals(self, other_food_entry):
        if not isinstance(other_food_entry, FoodEntry):
            return False
        return (self.__groceries == other_food_entry.get_groceries() and
                self.__quantity == other_food_entry.get_quantity() and
                self.__unit_of_measurement == other_food_entry.get_unit_of_measurement())"""


    @staticmethod
    def form_dict(dictionary=dict()):
        obj = FoodEntry()
        obj.set_id(dictionary["id"])
        obj.set_groceries(dictionary["groceries"])
        obj.set_unit_of_measurement["unit of measurement"]


        
    
    
if __name__ == "__main__":
    
    gurke = Groceries() #Intanz erstellen vom Lebensmittel
    gurke.set_id(1)
    gurke.set_designation("Gurke")
    
    kilogramm = UnitOfMeasurement() #Intanz einer Maßeinheit erstellen
    kilogramm.set_id(2)
    kilogramm.set_designation("Kilogramm")
    
    eintrag1 = FoodEntry() #Intanz des Eintrags erstellen und ihm die oberen beiden Intanzen übergeben
    eintrag1.set_id(3)
    eintrag1.set_groceries(gurke)
    eintrag1.set_unit_of_measurement(kilogramm)
    eintrag1.set_quanity(200)
    
    
    print(eintrag1)
    	
    """Aktuell arbeite ich bei den Instanzen von Groceries und uom mit deren IDs, weshalb bei der Ausführung
    dessen ID angezeigt wird. Sobald wir mit der Adminklasse arbeiten, können wir die ID als Refernz nehmen, aber 
    als Ausgabe dessen Bezeichnung"""
    
    
    
    

