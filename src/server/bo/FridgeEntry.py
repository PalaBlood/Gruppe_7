from FoodEntry import FoodEntry


class FridgeEntry(FoodEntry):
    def __init__(self, fridge_id, groceries_designation, quantity, unit):
        super().__init__(groceries_designation=groceries_designation, quantity=quantity, unit=unit)
        self.fridge_id = fridge_id


    def get_fridge(self):
        return self.__fridge_id

    def set_fridge_id(self, fridge_id):
        self.__fridge_id = fridge_id

    def __str__(self):
        return f"FridgeEntry(Fridge_id: {self.get_fridge()}, Groceries: {self.get_groceries_designation()}, Quantity: {self.get_quantity()}, Unit: {self.get_unit()})"

    def __repr__(self):
        return f"<FridgeEntry(fridge_id={self.__fridge_id}, groceries_designation={self._FoodEntry__groceries_designation}, quantity={self._FoodEntry__quantity}, unit={self._FoodEntry__unit})>"

    def form_dict(dictionary=dict()):

        obj = FridgeEntry()
        obj.set_fridge_id(dictionary["fridge_id"])
        obj.set_groceries_designation(dictionary["groceries_designation"])
        obj.set_quantity(dictionary["quantity"])
        obj.set_unit(dictionary["unit"])
        return obj

    @staticmethod
    def from_tuple(data_tuple):
        return FridgeEntry(data_tuple[0], data_tuple[1], data_tuple[2], data_tuple[3])