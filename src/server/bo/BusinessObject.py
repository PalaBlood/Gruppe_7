from abc import ABC, abstractmethod

"""Es gibt eine Einfache möglichkeit, immer automatisch einen Key zu erzeugen sobald eine Intanz von BO bzw einer Tochterklasse 
erstellt wird. Ich weiß nicht, ob das das DBM später automatisch übernimmt. Falls nicht müssen wir das hier implementieren.
Damit würden wir dafür sorgen, dass jede Klasse automatisch einen einzigartigen Key erhält"""

class BusinessObject(ABC):
    """Gemeinsame Basisklasse aller in diesem Projekt für die Umsetzung des Fachkonzepts relevanten Klassen.

    Zentrales Merkmal ist, dass jedes BusinessObject eine Nummer besitzt, die man in
    einer relationalen Datenbank auch als Primärschlüssel bezeichnen würde.
    """
    
    def __init__(self):
        self._id = 0   #Die eindeutige Identifikationsnummer einer Instanz dieser Klasse.

    def get_id(self):
        """Auslesen der ID."""
        return self._id

    def set_id(self,value):
        """Setzen der ID."""
        self._id = value
