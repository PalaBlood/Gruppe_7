from Unit import Unit
from Recipe import Recipe
from RecipeEntry import RecipeEntry
from FridgeEntry import FridgeEntry
from Groceries import Groceries

class RecipeService:
    @staticmethod
    def can_prepare_recipe(recipe, fridge_entries):
        required_ingredients = {}

        for entry in recipe.get_content():
            food_id = entry.get_groceries()
            if food_id not in required_ingredients:
                required_ingredients[food_id] = 0
            required_ingredients[food_id] += entry.get_quantity_in_base_unit()

        available_ingredients = {}

        for fridge_entry in fridge_entries:
            food_id = fridge_entry.get_groceries()
            if food_id not in available_ingredients:
                available_ingredients[food_id] = 0
            available_ingredients[food_id] += fridge_entry.get_quantity_in_base_unit()

        for food_id, required_quantity in required_ingredients.items():
            if available_ingredients.get(food_id, 0) < required_quantity:
                return False
        return True

    @staticmethod
    def get_cookable_recipes(recipes, fridge_entries):
        cookable_recipes = []
        for recipe in recipes:
            if RecipeService.can_prepare_recipe(recipe, fridge_entries):
                cookable_recipes.append(recipe)
        return cookable_recipes


if __name__ == "__main__":
    gram = Unit("gram", 1)
    kilogram = Unit("kilogram", 1000)
    teaspoon = Unit("teaspoon", 5)

    hackfleisch = Groceries()
    hackfleisch.set_id(1)
    hackfleisch.set_designation("Hackfleisch")

    salz = Groceries()
    salz.set_id(2)
    salz.set_designation("Salz")

    recipe_entry1 = RecipeEntry()
    recipe_entry1.set_groceries(hackfleisch)
    recipe_entry1.set_quantity(500)
    recipe_entry1.set_unit(gram)

    recipe_entry2 = RecipeEntry()
    recipe_entry2.set_groceries(salz)
    recipe_entry2.set_quantity(2)
    recipe_entry2.set_unit(teaspoon)

    recipe = Recipe()
    recipe.set_title("Pizza")
    recipe.add_content(recipe_entry1)
    recipe.add_content(recipe_entry2)

    recipe2 = Recipe()
    recipe2.set_title("Spaghetti")
    recipe2.add_content(recipe_entry2)
    recipe2.add_content(recipe_entry1)


    fridge_entry1 = FridgeEntry()
    fridge_entry1.set_groceries(hackfleisch)
    fridge_entry1.set_quantity(1)
    fridge_entry1.set_unit(kilogram)

    fridge_entry2 = FridgeEntry()
    fridge_entry2.set_groceries(salz)
    fridge_entry2.set_quantity(50)
    fridge_entry2.set_unit(gram)

    fridge_entries = [fridge_entry1, fridge_entry2]

    print(RecipeService.can_prepare_recipe(recipe, fridge_entries))  # Ausgabe: True oder False

    recipes = [recipe, recipe2]
    cookable_recipes = RecipeService.get_cookable_recipes(recipes, fridge_entries)

    for r in cookable_recipes:
        print(f"Kochbares Rezept: {r.get_title()}")
