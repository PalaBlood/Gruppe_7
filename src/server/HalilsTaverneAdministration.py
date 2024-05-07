"""Hier kommt alles bezüglich des Service Layers rein
Es dient als 'Schnittstelle' zwischen dem Presentation Layer 
und dem Business Object Layer

Ausführbefehle (create, delete usw.) aller Art werden hier untergebracht. """

from .bo.User import User
from .bo.Recipe import Recipe
from .bo.Fridge import Fridge

class HalilsTaverneAdministration (object):

    def __init__(self):
        pass