from FoodEntry import FoodEntry


class FridgeEntry(FoodEntry):
    def __init__(self):
        super().__init__()
        self.__fridge_id = None

    def get_fridge(self):
        return self.__fridge_id

    def set_fridge_id(self, fridge_id=None):
        if fridge_id:
            self.__fridge_id = fridge_id.get_id()
        else:
            from Fridge import Fridge
            fridge = Fridge()
            self.__fridge_id = fridge.get_id()

