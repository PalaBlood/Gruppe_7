from FoodEntry import FoodEntry
from Recipe import Recipe

class RecipeEntry(FoodEntry):
    def __init__(self, recipe_id, groceries_designation, quantity, unit):
        super().__init__(groceries_designation, quantity, unit)
        self.__recipe_id = recipe_id

    def get_recipe(self):

        return self.__recipe_id

    def set_recipe_id(self, recipe_id):
        """RecipeEntry benötigt eine Referenz zu einem Rezept"""

        self.__recipe_id = recipe_id

    def __str__(self):
        return f"Lebensmittel: {self.get_groceries_designation()}, Menge: {self.get_quantity()}, {self.get_unit()}, Rezept ID: {self.get_recipe()}"

    def __repr__(self):
        return f"<RecipeEntry(recipe_id={self.__recipe_id}, groceries_designation={self._FoodEntry__groceries_designation}, quantity={self._FoodEntry__quantity}, unit={self._FoodEntry__unit})>"

    @staticmethod
    def from_dict(dictionary=dict()):
        obj = RecipeEntry()
        obj.set_id(dictionary["id"])
        obj.set_recipe_id(dictionary["recipe_id"])
        obj.set_groceries_designation(dictionary["groceries_designation"])
        obj.set_quantity(dictionary["quantity"])
        obj.set_unit(dictionary["unit"])

        return obj

    def form_dict(dictionary):
        return RecipeEntry(
            recipe_id=dictionary.get("recipe_id"),
            groceries_designation=dictionary.get("groceries_designation"),
            quantity=dictionary.get("quantity"),
            unit=dictionary.get("unit")
        )







