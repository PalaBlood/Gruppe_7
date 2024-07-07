#converion rates im backend, da sonst UseRecipeIngredients die falschen Maßeinheiten verwendet
conversion_rates = {
    'liters': {
        'milliliters': 1000,
        'liters': 1,
        'centiliters': 100,
        'l': 1,
        'ml': 1000,
        'cl': 100
    },
    'milliliters': {
        'liters': 1 / 1000,
        'milliliters': 1,
        'centiliters': 1 / 10,
        'l': 1 / 1000,
        'cl': 1 / 10,
        'ml': 1,
        'cups': 1 / 250
    },
    'kilograms': {
        'grams': 1000,
        'kilograms': 1,
        'g': 1000,
        'kg': 1
    },
    'grams': {
        'kilograms': 1 / 1000,
        'grams': 1,
        'kg': 1 / 1000,
        'g': 1,
        'cups': 1 / 250
    },
    'pieces': {
        'pieces': 1
    },
    'cups': {
        'cups': 1,
        'milliliters': 250,
        'ml': 250,
        'grams': 250,
        'g': 250
    },
    'pinch': {
        'pinch': 1
    },
    'l': {
        'l': 1,
        'ml': 1000,
        'cl': 100,
        'milliliters': 1000,
        'liters': 1,
        'centiliters': 100,
    },
    'ml': {
        'l': 1 / 1000,
        'cl': 1 / 10,
        'ml': 1,
        'cups': 1 / 250,
        'liters': 1 / 1000,
        'milliliters': 1,
        'centiliters': 1 / 10
    },
    'kg': {
        'g': 1000,
        'kg': 1,
        'grams': 1000,
        'kilograms': 1
    },
    'g': {
        'kg': 1 / 1000,
        'g': 1,
        'cups': 1 / 250,
        'kilograms': 1 / 1000,
        'grams': 1
    },
    'cl': {
        'l': 1 / 100,
        'ml': 10,
        'cl': 1,
        'liters': 1 / 100,
        'milliliters': 10,
        'centiliters': 1,
    },
    'centiliters': {
        'liters': 1 / 100,
        'milliliters': 10,
        'centiliters': 1,
        'l': 1 / 100,
        'ml': 10,
        'cl': 1
    },
    'piece': {
        'piece': 1
    }
}

#Sorgt dafür, dass verschiedene Maßeinheiten miteinander umgerechnet werden können
def convert_quantity(quantity, from_unit, to_unit):
    if from_unit in conversion_rates and to_unit in conversion_rates[from_unit]:
        return quantity * conversion_rates[from_unit][to_unit]
    return None
