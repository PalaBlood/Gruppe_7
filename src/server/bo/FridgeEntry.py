from FoodEntry import FoodEntry


class FridgeEntry(FoodEntry):
    def __init__(self):
        super().__init__()
        self.__fridge_id = None

    def get_fridge(self):
        return self.__fridge_id

    def set_fridge_id(self, fridge_id):
        self.__fridge_id = fridge_id

    def __str__(self):
        return f"FridgeEntry(ID: {self.get_id()}, Fridge_id: {self.get_fridge()}, Groceries: {self.get_groceries_designation()}, Quantity: {self.get_quantity()}, Unit: {self.get_unit()})"

    def from_dict(dictionary=dict()):
        obj = FridgeEntry()
        obj.set_id(dictionary["id"])
        obj.set_fridge_id(dictionary["fridge_id"])
        obj.set_groceries_designation(dictionary["groceries_designation"])
        obj.set_quantity(dictionary["quantity"])
        obj.set_unit(dictionary["unit"])
