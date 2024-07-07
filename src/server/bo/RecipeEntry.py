#FoodEntry import FoodEntry
from server.bo.Recipe import Recipe

from server.bo.FoodEntry import FoodEntry

class RecipeEntry(FoodEntry):
    def __init__(self):
        super().__init__()
        self.__recipe_id = None #Referenz-ID des zugehörigen Rezepts

    def get_recipe_id(self):
        #Gibt die Rezept-ID zurück
        return self.__recipe_id

    def set_recipe_id(self, recipe_id):
        """RecipeEntry benötigt eine Referenz zu einem Rezept"""
        self.__recipe_id = recipe_id
        
        

    def __str__(self):
        #Gibt eine textuelle Darstellung des RecipeEntry-Objekts zurück
        return f"ID: {self.get_id()}, Lebensmittel: {self.get_groceries_designation()}, Menge: {self.get_quantity()}, {self.get_unit()}, Rezept ID: {self.get_recipe_id()}"

    def __repr__(self):
        #Gibt eine Darstellung des RecipeEntry-Objekts zurück
        return f"<RecipeEntry(recipe_id={self.__recipe_id}, groceries_designation={self._FoodEntry__groceries_designation}, quantity={self._FoodEntry__quantity}, unit={self._FoodEntry__unit})>"



    @staticmethod
    def from_dict(dictionary):
        obj = RecipeEntry()
        obj.set_recipe_id(dictionary.get("recipe_id"))  # Setzt die Rezept-ID aus dem Dictionary
        obj.set_groceries_designation(dictionary.get("groceries_designation"))# Setzt die Bezeichnung des Lebensmittels aus dem Dictionary
        obj.set_quantity(dictionary.get("quantity")) # Setzt die Menge des Lebensmittels aus dem Dictionary
        obj.set_unit(dictionary.get("unit")) # Setzt die Maßeinheit aus dem Dictionary
        return obj




