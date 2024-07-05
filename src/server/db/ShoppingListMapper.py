from server.db.Mapper import Mapper
from server.bo.ShoppingList import Shoppinglist


class ShoppingListMapper(Mapper):

    def __init__(self):
        # Initialisiert den Mapper, indem der Konstruktor der Basisklasse aufgerufen wird
        super().__init__()

    # Diese Methode soll in Zukunft alle Einträge finden und zurückgeben
    def find_all(self):
        pass

    # Diese Methode soll in Zukunft einen Eintrag anhand der ID finden und zurückgeben
    def find_by_id(self, id):
        pass

    # Diese Methode soll in Zukunft einen neuen Eintrag in die Datenbank einfügen
    def insert(self, object):
        pass

    # Diese Methode soll in Zukunft einen bestehenden Eintrag in der Datenbank aktualisieren
    def update(self, object):
        pass

    # Diese Methode soll in Zukunft einen bestehenden Eintrag aus der Datenbank löschen
    def delete(self, object):
        pass

# Hinweis: Diese Klasse wird momentan nicht verwendet, könnte aber in Zukunft implementiert werden.
