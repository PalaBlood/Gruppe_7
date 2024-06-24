from FoodEntry import FoodEntry
from Recipe import Recipe

class RecipeEntry(FoodEntry):
    def __init__(self):
        super().__init__()
        self.__recipe_id = None

    def get_recipe_id(self):

        return self.__recipe_id

    def set_recipe_id(self, recipe_id):
        """RecipeEntry benötigt eine Referenz zu einem Rezept"""

        self.__recipe_id = recipe_id

    def __str__(self):
        return f"ID: {self.get_id()}, Lebensmittel: {self.get_groceries_designation()}, Menge: {self.get_quantity()}, {self.get_unit()}, Rezept ID: {self.get_recipe_id()}"

    def __repr__(self):
        return f"<RecipeEntry(ID = {self.get_id()}, recipe_id={self.__recipe_id}, groceries_designation={self._FoodEntry__groceries_designation}, quantity={self._FoodEntry__quantity}, unit={self._FoodEntry__unit})>"

    @staticmethod
    def form_dict(dictionary=dict()):
        obj = RecipeEntry()
        try:
            obj.set_recipe_id(dictionary["recipe_id"])
            obj.set_groceries_designation(dictionary["groceries_designation"])
            obj.set_quantity(dictionary["quantity"])
            obj.set_unit(dictionary["unit"])

        except KeyError as e:
            raise ValueError(f'Missing field in dictionary: {e}')
        return obj




