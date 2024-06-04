from FoodEntry import FoodEntry
from Recipe import Recipe

class RecipeEntry(FoodEntry):
    def __init__(self):
        super().__init__()
        self.__recipe_id = None

    def get_recipe(self):

        return self.__recipe_id

    def set_recipe_id(self, recipe_id):
        """RecipeEntry benötigt eine Referenz zu einem Rezept"""

        self.__recipe_id = recipe_id

    def __str__(self):
        return f"Lebensmittel: {self.__groceries_designation}, Menge: {self.get_quantity()} {self.get_unit()}, Rezept ID: {self.__recipe_id}"

    @staticmethod
    def from_dict(dictionary=dict()):
        obj = RecipeEntry()
        obj.set_id(dictionary["id"])
        obj.set_recipe_id(dictionary["recipe_id"])
        obj.set_groceries_designation(dictionary["groceries_designation"])
        obj.set_quantity(dictionary["quantity"])
        obj.set_unit(dictionary["unit"])

        







