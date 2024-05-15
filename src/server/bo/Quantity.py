from BusinessObject import BusinessObject 
"""Imports muss jeder für sich anpassen."""

"""Aktuell sehe ich keinen Sinn für die Klasse - Sie ist in der DB immer Maximal ein Attribut und
bei den Klassen eben auch.

Wir haben ja keine verschiedenen Einheiten wie bei den Maßeinheiten, sondern immer nur eine Zahl"""


class Quantity(BusinessObject):
    def __init__(self) -> None:
        super().__init__()
        self.__quantity = None

