from BusinessObject import BusinessObject
from Groceries import Groceries
from Quantity import Quantity


"""Müssen uns aufjedenfall übelegen welche Methoden Fridge beinhalten soll. Schaut aufjedenfall nochmal drüber."""

class Fridge(BusinessObject):
    def __init__(self): 
        super().__init__()
        self.__groceries_list = []
        
        """Erstellt leere Liste für Lebensmittel im Kühlschrank."""
    
    def get_groceries(self):
        
        """Gibt die Lebensmittel im Kühlschrank zurück."""
        
        return self.__groceries_list
    
    def add_groceries(self, groceries, quantity):
        
        """Fügt Lebensmittel mit einer bestimmten Menge zum Kühlschrank hinzu."""
        
        self.__groceries_list.append({'groceries': groceries, 'quantity': quantity})

    def remove_groceries(self, groceries, quantity):
        
        """Entfernt eine bestimmte Menge von Lebensmitteln aus dem Kühlschrank."""
        
        for item in self.__groceries_list:
            if item['groceries'] == groceries:
                if item['quantity'] >= quantity:
                    item['quantity'] -= quantity
                    if item['quantity'] == 0:
                        self.__groceries_list.remove(item)
                    return
                else:
                    print("Nicht genug Lebensmittel im Kühlschrank.")
                    return
        print("Lebensmittel nicht im Kühlschrank gefunden.")

    def update_groceries_quantity(self, groceries, new_quantity):
       
        """Aktualisiert die Menge eines bestimmten Lebensmittels im Kühlschrank."""
       
        for item in self.__groceries_list:
            if item['groceries'] == groceries:
                item['quantity'] = new_quantity
                return
        print("Lebensmittel nicht im Kühlschrank gefunden.")
    
    def find_groceries(self, groceries):
        
        """Sucht nach einem bestimmten Lebensmittel im Kühlschrank."""
        
        for item in self.__groceries_list:
            if item['groceries'] == groceries:
                return item
        print("Lebensmittel nicht im Kühlschrank gefunden.")
        return None
    
    def clear_fridge(self):
        
        """Löscht alle Lebensmittel im Kühlschrank."""
        
        self.__groceries_list = []
    
if __name__ == "__main__":
    fridge = Fridge()  # Ein neuer Kühlschrank wird erstellt

    # Beispiel: Lebensmittel werden hinzugefügt
    fridge.add_groceries('Milch', 2)
    fridge.add_groceries('Eier', 6)

    # Beispiel: Lebensmittel werden entfernt
    fridge.remove_groceries('Milch', 1)

    # Beispiel: Liste der Lebensmittel im Kühlschrank wird ausgegeben
    print(fridge.get_groceries())