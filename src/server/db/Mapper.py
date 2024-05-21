from types import TracebackType
import mysql.connector as connector
import os
from contextlib import AbstractContextManager
from abc import ABC, abstractmethod

"""
Die Mapper dienen dazu, dass wir aus den Tupeln (Relationen) der Datenbank Intanzen erzeugen können
und umgekehrt.

Jede Mapper Klasse erbt von Mapper.py. Hier sind die Grundlegenden Methoden drin, die jede andere Mapper 
Klasse mindestens benötigen wird. 

Ebenfalls wird hier die Verbindung zum Server erstellt, an der sich alle anderen Mapper Klassen bedienen können
(in unserem Fall grad nur Lokal)
"""


class Mapper(AbstractContextManager, ABC):

    def __init__(self):
        self._cnx = connector.connect(user="root", password="9902",
                                      host="localhost",
                                      database="sopra")


    def __exit__(self, exc_type, exc_val, exc_tb):
        """Verbindung mit der Datenbank trennen"""
        self._cnx.close()

    """Im folgenden Abschnitt finden sich alle abstrakten Methoden, diese Methoden werden erst in den Subklassen implementiert.
    Hier dienen sie als gemeinsame Schnittstelle für alle Mapperklassen und geben gleichzeitig vor, dass alle Subklassen folgende Methoden bereitstellen müssen"""


    @abstractmethod 
    def find_all(self):

        pass

    @abstractmethod
    def find_by_id(self, id):

        pass

    @abstractmethod
    def insert(self, object):

        pass
    
    @abstractmethod
    def update(self, object):

        pass
    
    @abstractmethod
    def delete(self, object):

        pass
