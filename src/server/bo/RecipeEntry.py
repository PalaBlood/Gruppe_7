from FoodEntry import FoodEntry
from Recipe import Recipe
from Groceries import Groceries

class RecipeEntry(FoodEntry):
    def __init__(self):
        super().__init__()
        self.__recipe_id = None

    def get_recipe(self):

        return self.__recipe_id

    def set_recipe_id(self, recipe_id=Recipe()):
        """RecipeEntry benötigt eine Referenz zu einem Rezept"""

        self.__recipe_id = recipe_id.get_id()


        


if __name__ == "__main__":


    apfelkuchen = Recipe()
    apfelkuchen.set_id(34)
    apfelkuchen.set_title("Apfelkuchen")


    apfel = Groceries()
    apfel.set_designation("Apfel")
    apfel.set_id(11)
    eintrag = RecipeEntry()

    eintrag.set_id(1)
    eintrag.set_groceries(apfel)
    eintrag.set_quantity(200)
    eintrag.set_unit_of_measurement("Kilogramm")
    eintrag.set_recipe_id(apfelkuchen)


    print(eintrag.get_quantity())
    print(eintrag.get_groceries())
    print(eintrag.get_reicpe())
    print(eintrag.get_id())
    print(eintrag.get_unit_of_measurement())




