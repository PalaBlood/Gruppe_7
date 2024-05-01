from BusinessObject import BusinessObject
from Groceries import Groceries
from UnitOfMeasurement import UnitOfMeasurement

"""Meine Überlegung ist, dass wir einen doch Lebensmitteleintrag als Intanz benötigen. Ein Rezept beinhaltet 
 dann Lebesnmitteleinträge genauso wie der Kühlschrank.
 
 Der Kühlschrankinhalt oder ein Rezept bestehen also aus mehreren Lebensmitteleinträgen. Diese können erstellt, editiert und gelöscht werden.  
 
 Folgende offenen Fragen:
 - Wie können Lebensmitteleinträge verglichen werden (Lebensmittel, Menge und die Maßeinheit jeweils separat)
 - Wie können unterschiedliche Maßeinheiten verglichen werden?
 - Geht es auch ohne die Klasse Lebensmitteleintrag?
 - Sollte der Lebensmitteleintrag wirklich aus einem Lebensmittel, der Menge und der Maßeinheit bestehen, oder vielleicht nur aus 2 Klassen?
 """

class FootEntry(BusinessObject):
    def __init__(self):
        super().__init__()
        self.__groceries = None
        self.__quantity = None
        self.__unit_of_measurement = None

    
    def set_grocerie(self, groceries=Groceries):
        """Eintrag des Lebensmittel anhand seiner ID""" 
        self.__groceries = groceries.get_id()  #Hier wird die Frage sein, ob wir das Objekt übergeben sollen oder die ID. Ich denke das wird aber aufgrund der DB sowieso etwas anders gehandhabt werden. 
    

    def get_quantity(self):
        """Auslesen der Menge"""
        return self.__quantity
    
    def set_quanity(self, quantity):
        """Eintrag der Menge"""
        self.__quantity = quantity
        
    def edit_quantity(self): 
        """Logik für das Editieren von Eintrag implementieren"""
        pass
    
 
    
    def set_unit_of_measurement(self, uom=UnitOfMeasurement):
        """Maßeinheit setzen"""
        self.__unit_of_measurement = uom.get_id() #Hier wird die Frage sein, ob wir das Objekt übergeben sollen oder die ID. Ich denke das wird aber aufgrund der DB sowieso etwas anders gehandhabt werden
    
    def get_unit_of_measurement(self):
        return self.__unit_of_measurement
    
    
    def __str__(self) -> str:
        """Beschreibung des Eintrags"""
        return f"Lebensmittel: {self.__groceries}, Menge: {self.get_quantity()}, Masseinheit: {self.get_unit_of_measurement()}" #Aktuell nicht texutell. Man könnte das zwar machen, ich glaube aber dass wir das lieber über die DB rausfiltern sollen
    
    
    
if __name__ == "__main__":
    
    gurke = Groceries()
    gurke.set_id(1)
    gurke.set_name("Gurke")
    
    kilogramm = UnitOfMeasurement()
    kilogramm.set_id(2)
    kilogramm.set_designation("Kilogramm")
    
    eintrag1 = FootEntry()
    eintrag1.set_id(3)
    eintrag1.set_grocerie(gurke)
    eintrag1.set_unit_of_measurement(kilogramm)
    eintrag1.set_quanity(200)
    
    
    print(eintrag1)
    	
    #Da war ein Profi am Werk
    
    
    
    

