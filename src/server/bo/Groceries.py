from BusinessObject import BusinessObject 



"""Müssen uns aufjedenfall die Methoden überlegen die wir implementieren wollen.
Hab ausversehen den Fridge Code Teilweise hier reingepackt, aber ich weiß noch nicht welche Methoden jetzt
letzendlich von welcher Klasse ausgeführt werden sollen, die sollten wir uns anschauen und aufteilen/verschieben etc..."""

class Groceries(BusinessObject):
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
    groceries = Groceries()  # Ein neues Lebensmittel-Objekt wird erstellt

    # Beispiel: Lebensmittel werden hinzugefügt
    groceries.add_groceries('Milch', 2)
    groceries.add_groceries('Eier', 6)

    # Beispiel: Lebensmittel werden entfernt
    groceries.remove_groceries('Milch', 1)

    # Beispiel: Wörterbuch der Lebensmittel wird ausgegeben
    print(groceries.get_groceries())
    
    #def get_name(self):
    #    """Bezeichnung auslesen"""
    #    return self.__name()
    
    #def set_name(self, name):
    #    """Bezeichnung setzen"""
    #    self.__name = name
    
    
    #@staticmethod
    #def form_dict(dictionary=dict()):
    #    pass 
    
        





