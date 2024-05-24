from FoodEntry import FoodEntry
from Fridge import Fridge
from Groceries2 import Groceries2


class FridgeEntry(FoodEntry):

    def __init__(self):
        super().__init__()
        self.__fridge_id = None

    def get_fridge(self):

        return self.__fridge_id

    def set_fridge_id(self, fridge_id = Fridge()):
        self.__fridge_id = fridge_id.get_id()

