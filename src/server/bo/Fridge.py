"""from Gruppe_7.src.server.bo.BusinessObject import BusinessObject
from Gruppe_7.src.server.bo.Groceries import Groceries"""

from server.bo.BusinessObject import BusinessObject

class Fridge(BusinessObject):
    def __init__(self):
        super().__init__()


    def __str__(self):
        return f"ID: {self._id}"

    @staticmethod
    def form_dict(dictionary=dict()):
        from RecipeEntry import RecipeEntry # Import innerhalb der Methode
        obj = Fridge()
        obj.set_id(dictionary["id"])


