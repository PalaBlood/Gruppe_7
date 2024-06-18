from FoodEntry import FoodEntry


class FridgeEntry(FoodEntry):
    def __init__(self):
        super().__init__()
        self.fridge__id = None


    def get_fridge_id(self):
        return self.__fridge_id

    def set_fridge_id(self, fridge_id):
        self.__fridge_id = fridge_id

    def __str__(self):
        return f"FridgeEntry(Fridge_id: {self.get_id()}, Groceries: {self.get_groceries_designation()}, Quantity: {self.get_quantity()}, Unit: {self.get_unit()})"

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
    def form_dict(dictionary):
        obj = FridgeEntry()
        try:
            obj.set_fridge_id(dictionary["fridge_id"])
            obj.set_groceries_designation(dictionary["groceries_designation"])
            obj.set_quantity(dictionary["quantity"])
            obj.set_unit(dictionary["unit"])
        except KeyError as e:
            raise ValueError(f'Missing field in dictionary: {e}')
        return obj


if __name__ == "__main__":

    entry = FridgeEntry()
    entry.set_id(1)
    entry.set_unit("kilo")
    entry.set_quantity(200)
    entry.set_fridge_id(1)
    entry.set_groceries_designation("Salat")



