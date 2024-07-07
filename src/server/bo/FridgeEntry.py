from server.bo.FoodEntry import FoodEntry

#Definition der FridgeEntry-Klasse, die von FoodEntry erbt
class FridgeEntry(FoodEntry):
    def __init__(self):
        #Initialisiert die Basisklasse und das FridgeEntry-spezifische Attribut
        super().__init__()
        self.fridge__id = None

    def get_fridge_id(self):
        #Gibt die ID des Kühlschranks zurück
        return self.__fridge_id

    def set_fridge_id(self, fridge_id):
        #Setzt die ID des Kühlschranks
        self.__fridge_id = fridge_id
        
        

    def __str__(self):
        #Gibt eine textuelle Darstellung des FridgeEntry-Objekts zurück
        return f"FridgeEntry(Fridge_id: {self.get_fridge_id()}, groceries_designation: {self.get_groceries_designation()}, quantity: {self.get_quantity()}, unit: {self.get_unit()})"

    def __repr__(self):
        #Gibt eine Darstellung des FridgeEntry-Objekts zurück
        return f"<FridgeEntry(fridge_id={self.__fridge_id}, groceries_designation={self._FoodEntry__groceries_designation}, quantity={self._FoodEntry__quantity}, unit={self._FoodEntry__unit})>"

    def form_dict(dictionary=dict()):
        #Erzeugt ein FridgeEntry-Objekt aus einem Dictionary
        obj = FridgeEntry()
        obj.set_fridge_id(dictionary["fridge_id"]) # Setzt die Kühlschrank-ID
        obj.set_groceries_designation(dictionary["groceries_designation"]) # Setzt die Bezeichnung des Lebensmittels aus dem Dictionary
        obj.set_quantity(dictionary["quantity"]) # Setzt die Menge des Lebensmittels aus dem Dictionary
        obj.set_unit(dictionary["unit"])# Setzt die Maßeinheit aus dem Dictionary
        return obj





