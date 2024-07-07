from server.bo.BusinessObject import BusinessObject

class Fridge(BusinessObject):
    def __init__(self):
        #Initialisiert die Basisklasse
        super().__init__()


    def __str__(self):
        #Gibt eine textuelle Darstellung des Kühlschranks zurück, hier nur die ID
        return f"ID: {self._id}"

    @staticmethod
    def form_dict(dictionary=dict()):
        #Erzeugt ein Fridge-Objekt aus einem Dictionary
        from RecipeEntry import RecipeEntry # Import innerhalb der Methode
        obj = Fridge()
        obj.set_id(dictionary["id"]) # Setzt die ID


