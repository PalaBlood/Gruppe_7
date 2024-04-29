from types import TracebackType
import mysql.connector as connector
import os
from contextlib import AbstractContextManager
from abc import ABC, abstractmethod

class Mapper (AbstractContextManager, ABC):

    def __init__(self):

        self._cursor = None


    def __enter__(self):

        """Erstmal nur lokale verbindung --> User, Password, Host sowie Database individuell. Cloud Szenario wird später implementiert"""

        self._cursor = connector.connect(user="root", password="mypassword", 
                                      host="localhost", 
                                      database="mydatabase")
        
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):

        self._cursor.close()

        """Verbindung mit der Datenbank trennen"""


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