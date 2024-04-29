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

        """Verbindung trennen, vorübergehend"""

    @abstractmethod 
    
    