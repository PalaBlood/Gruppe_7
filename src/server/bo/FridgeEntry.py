from FoodEntry import FoodEntry


class FridgeEntry(FoodEntry):
    def __init__(self):
        super().__init__()
        self.__fridge_id = None

    def get_fridge(self):
        return self.__fridge_id

    def set_fridge_id(self, fridge_id):

        self.__fridge_id = fridge_id