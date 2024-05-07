

"""Klasse für diverse Converter von Maßeinheiten, sodass eine Klasse UnitofMeasurement trivial wird und als Attribut eines Lebensmittels aufgeführt wird.
   Wir haben uns für diese Implementierung umentschieden"""


class UnitConverter:

    def __init__(self): 

        self._mass_conversions = {                      #Umwandlungsfaktoren zu Gramm
            'teaspoon':6,                               
            'tablespoon': 17,
            'kilogram': 1000,
            'cups': 250,
            'grams':1
        }


        self._volume_conversions = {                    #Umwandlungsfaktoren zu Mililiter
            'teaspoon':5,
            'tablespoon':15,
            'cups':240,
            'milliliter':1,
            'liter':1000,

        }

    def convert_to_grams(self, value, unit):
        if unit in self._mass_conversions:
            return value * self._mass_conversions[unit]
        else:
            print("Selected Unit not found")
            return None
        

    def convert_from_grams(self,value,unit):

        if unit in self._mass_conversions:
            return value / self._mass_conversions[unit]
        else:
            print("Selected Unit not found")
            return None
        

    def convert_from_milliliters(self, value, unit):
        if unit in self._volume_conversions:
            return value / self._volume_conversions[unit]
        else:
            print("Selected Unit not found")
            return None

    def convert_to_milliliters(self, value, unit):
        if unit in self._volume_conversions:
            return value * self._volume_conversions[unit]
        else:
            print("Selected Unit not found")
            return None



#test

converter = UnitConverter()

print(converter.convert_to_grams(10, 'kilogram'))
print(converter.convert_to_milliliters(10, 'cups'))