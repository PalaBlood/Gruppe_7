#converion rates im backend, da sonst UseRecipeIngredients die falschen Maßeinheiten verwendet
conversion_rates = {
    'liters': {
        'milliliters': 1000,
        'liters': 1
    },
    'milliliters': {
        'liters': 1 / 1000,
        'milliliters': 1
    },
    'kilograms': {
        'grams': 1000,
        'kilograms': 1
    },
    'grams': {
        'kilograms': 1 / 1000,
        'grams': 1
    },
    'pieces': {
        'pieces': 1
    },
    'cups': {
        'cups': 1
    },
    'pinch': {
        'pinch': 1
    }
}

#convert quantity funktion als hilfsmittel
def convert_quantity(quantity, from_unit, to_unit):
    if from_unit in conversion_rates and to_unit in conversion_rates[from_unit]:
        return quantity * conversion_rates[from_unit][to_unit]
    return None
