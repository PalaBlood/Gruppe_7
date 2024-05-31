from FoodEntry import FoodEntry
from Recipe import Recipe

class RecipeEntry(FoodEntry):
    def __init__(self):
        super().__init__()
        self.__recipe_id = None

    def get_recipe(self):

        return self.__recipe_id

    def set_recipe_id(self, recipe_id=Recipe()):
        """RecipeEntry benötigt eine Referenz zu einem Rezept"""

        self.__recipe_id = recipe_id.get_id()


        







