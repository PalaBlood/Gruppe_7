from BusinessObject import BusinessObject

"""Meine Überlegung ist, dass wir einen doch Lebensmitteleintrag als Intanz benötigen. Ein Rezept beinhaltet 
 dann Lebesnmitteleinträge genauso wie der Kühlschrank
 
 Folgende offenen Fragen:
 - Wie können Lebensmitteleinträge verglichen werden (Lebensmittel, Menge und die Maßeinheit jeweils separat)
 - Wie können unterschiedliche Maßeinheiten verglichen werden?
 - Geht es auch ohne die Klasse Lebensmitteleintrag?
 - Sollte der Lebensmitteleintrag wirklich aus einem Lebensmittel, der Menge und der Maßeinheit bestehen, oder vielleicht nur aus 2 Klassen?
 """

class Lebensmitteleintrag(BusinessObject):
    def __init__(self):
        super().__init__()
        self.__grocerie = None
        self.__quantity = None
        self.__unit_of_measurement = None

