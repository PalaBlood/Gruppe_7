import mysql.connector as connector
import os
from contextlib import AbstractContextManager
from abc import ABC, abstractmethod


class Mapper(AbstractContextManager, ABC):

    def __init__(self):
        self._cnx = None


    def __enter__(self):


        """Wenn wir uns in der Cloud befinden, wird diese Verbindung genutzt"""
        if os.getenv('GAE_ENV', '').startswith('standard'):
            self._cnx = connector.connect(user='demo', password='demo',
                                          unix_socket='/cloudsql/smartfridge-app-428309:europe-west3:smartfridge',
                                          database='Sopra')

        else:
            """Sollten wir uns Lokal aufhalten, wird diese Verbindung genutzt"""
            self._cnx = connector.connect(user='root', password='9902',
                              host='localhost',
                              database='sopra')


        return self



    def __exit__(self, exc_type, exc_val, exc_tb):
        """Verbindung mit der Datenbank trennen"""
        if exc_type or exc_val or exc_tb:
            self._cnx.rollback()
        else:
            self._cnx.commit()
        self._cnx.close()





