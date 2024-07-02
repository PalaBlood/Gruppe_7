import mysql.connector as connector
import os
from contextlib import AbstractContextManager
from abc import ABC, abstractmethod
from server.db.dbcredentials import host, user, password, database




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
        self._cnx = None


    def __enter__(self):


        """Wenn wir uns in der Cloud befinden, wird diese Verbindung genutzt"""
        if os.getenv('GAE_ENV', '').startswith('standard'):
            self._cnx = connector.connect(user='root', password='demo',
                                          unix_socket='cloudsql:smartfridge-428113:europe-west3:smart-fridge',
                                          database='Sopra')

        else:
            #Sollten wir uns Lokal aufhalten, wird diese Verbindung genutzt
            self._cnx = connector.connect(user=user, password="kik2001duman123",
                              host=host,
                              database=database)


        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        """Verbindung mit der Datenbank trennen"""
        if exc_type or exc_val or exc_tb:
            self._cnx.rollback()
        else:
            self._cnx.commit()
        self._cnx.close()

    """Im folgenden Abschnitt finden sich alle abstrakten Methoden, diese Methoden werden erst in den Subklassen implementiert.
    Hier dienen sie als gemeinsame Schnittstelle für alle Mapperklassen und geben gleichzeitig vor, dass alle Subklassen folgende Methoden bereitstellen müssen"""



