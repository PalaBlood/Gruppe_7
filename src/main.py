from flask import Flask
from flask_cors import CORS
from flask_restx import Api, Resource, fields
from server.HalilsTaverneAdministration import HalilsTaverneAdministration
from server.bo.Fridge import Fridge
from server.bo.Recipe import Recipe
from server.bo.FridgeEntry import FridgeEntry
from server.bo.RecipeEntry import RecipeEntry
from server.bo.User import User
from server.bo.FoodEntry import FoodEntry
from server.bo.Household import Household
import traceback


from SecurityDecorator import secured

app = Flask(__name__)

# Aktivieren Sie CORS für Ihre gesamte Flask-Anwendung
"""CORS(app, resources={r"/api/":{"origins":"*"}})"""
CORS(app, supports_credentials=True, resources=r'/fridge/*')

api = Api(app, version='1.0', title='SmartFridgeDemo API',
          description='An API for managing a smart fridge system.')

# Namespace
fridge_ns = api.namespace('fridge', description='Fridge-related functionalities')

# Modelle für Flask-Restx
bo = api.model('BusinessObject', {
    'id': fields.Integer(attribute='_id', description='Unique identifier of a business object')
})

food_entry = api.inherit('FoodEntry', {
    'groceries_designation': fields.String(attribute='_FoodEntry__groceries_designation', required=True,
                                           description='Name of the grocery item'),
    'quantity': fields.Integer(attribute='_FoodEntry__quantity', required=True,
                               description='Quantity of the grocery item'),
    'unit': fields.String(attribute='_FoodEntry__unit', required=True, description='Unit of measure for the quantity')
})

user = api.inherit('User', bo, {
    'nick_name': fields.String(attribute='_nickname', description='Nickname of the user'),
    'first_name': fields.String(attribute='_first_name', description='First name of the user'),
    'last_name': fields.String(attribute='_last_name', description='Last name of the user'),
    'household_id': fields.Integer(attribute='_Household_id', description='The household_id of the user'),
    'google_user_id': fields.String(attribute='_google_user_id', description='Unique google_user_id')
})

fridge = api.inherit('Fridge', bo, {})

recipe = api.inherit('Recipe', bo, {
    'title': fields.String(attribute='_title', required=True, description='Title of the recipe'),
    'number_of_persons': fields.Integer(attribute='_number_of_persons', required=True, description='Number of servings the recipe provides'),
    'creator': fields.String(attribute='_creator', description='Creator of the recipe'),
    'description': fields.String(attribute='_description', required=True, description='The Description of a recipe'),
    'household_id': fields.Integer(attribute='_household_id', required=True, description="The Reference for the Household")
})




recipe_entry = api.inherit('RecipeEntry', food_entry, {
    'recipe_id': fields.Integer(attribute='_RecipeEntry__recipe_id', required=True,
                                description='Identifier of the associated recipe')
})

fridge_entry = api.inherit('FridgeEntry', food_entry, {
    'fridge_id': fields.Integer(attribute='_FridgeEntry__fridge_id', required=True,
                                description='Identifier of the associated fridge'),
})

household = api.inherit('Household', bo, {
    'name': fields.String(attribute='_name', description='Name of the household'),
    'fridge_id': fields.Integer(attribute='_fridge_id', required=True,
                                description='fridge associated with the household'),
})


@fridge_ns.route('/users')
@fridge_ns.response(500, 'Server-Fehler')
class UserListOperations(Resource):

    #@secured
    @fridge_ns.marshal_list_with(user)
    def get(self):
        """Auslesen aller User"""

        adm = HalilsTaverneAdministration()
        users = adm.get_all_users()
        return users

    #@secured
    @fridge_ns.marshal_with(user, code=200)
    @fridge_ns.expect(user)
    def post(self):
        """Neuen User anlegen"""

        adm = HalilsTaverneAdministration()
        proposal = User.from_dict(api.payload)

        if proposal is not None:
            u = adm.create_user(
                proposal.get_nick_name(),
                proposal.get_first_name(),
                proposal.get_last_name(),
                proposal.get_household_id(),
                proposal.get_google_user_id()
            )
            return u, 200
        else:
            return '', 500
        # 500: server-fehler


@fridge_ns.route('/users/<int:id>')
@fridge_ns.response(500, 'Server-Fehler')
@fridge_ns.param('id', 'die Id eines Users')
class UserOperations(Resource):

    #@secured
    @fridge_ns.marshal_with(user)
    def get(self, id):
        """User nach ID auslesen"""

        adm = HalilsTaverneAdministration()
        User = adm.get_user_by_id(id)
        return User

    #@secured
    def delete(self, id):
        """user löschen"""
        adm = HalilsTaverneAdministration()
        User = adm.get_user_by_id(id)
        adm.delete_user(User)
        return '', 200

    @fridge_ns.marshal_with(user)
    @fridge_ns.expect(user, validate=True)
    def put(self, id):
        """User Objekt updaten"""
        adm = HalilsTaverneAdministration()
        u = User.from_dict(api.payload)


        if u is not None:
            u.set_id(id)
            adm.save_user(u)
            return '', 200
        else:
            return '', 500


@fridge_ns.route('/user-by-google-id/<string:google_user_id>')
@fridge_ns.response(500, 'Server-Fehler')
@fridge_ns.param('google_user_id', 'die google_user_id eines users')
class UserByGoogleIdOperations(Resource):

    #@secured
    @fridge_ns.marshal_list_with(user)
    def get(self, google_user_id):
        """user nach google_user_id auslesen"""
        adm = HalilsTaverneAdministration()
        User = adm.get_user_by_google_user_id(google_user_id)
        return User


@fridge_ns.route('/users-by-nick_name/<string:nick_name>')
@fridge_ns.response(500, 'Server-Fehler')
@fridge_ns.param('nick_name', 'Der nick_name eines Users')
class UsersByNameOperations(Resource):

    #@secured
    @fridge_ns.marshal_with(user)
    def get(self, nick_name):
        """User nach Nickname auslesen"""
        adm = HalilsTaverneAdministration()
        User = adm.get_user_by_nickname(nick_name)
        return User


@fridge_ns.route('/Household')
@fridge_ns.response(500, 'Server-Fehler')
class HouseholdListOperation(Resource):

    #@secured
    @fridge_ns.marshal_list_with(household)
    def get(self):
        adm = HalilsTaverneAdministration()
        households = adm.get_all_households()
        return households

    #@secured
    @fridge_ns.expect(household)
    @fridge_ns.marshal_list_with(household)
    def post(self):
        adm = HalilsTaverneAdministration()
        proposal = Household.form_dict(api.payload)

        if proposal is not None:
            h = adm.create_household(proposal.get_name())
            return h, 200
        else:
            return '', 500


@fridge_ns.route('/Household/<int:id>')
@fridge_ns.response(500, 'Server-Fehler')
@fridge_ns.param('id', 'die Id eines Haushalts')
class HouseholdOperations(Resource):

    #@secured
    @fridge_ns.marshal_with(user)
    def get(self, id):
        adm = HalilsTaverneAdministration()
        hou = adm.get_users_by_household_id(id)
        return hou

    #@secured
    def delete(self, id):
        adm = HalilsTaverneAdministration()
        hou = adm.find_household_by_id(id)
        adm.delete_household(hou)
        return '', 200

    @fridge_ns.marshal_with(household)
    @fridge_ns.expect(household, validate=True)
    def put(self, id):
        """update eines household-objekts nach id"""

        adm = HalilsTaverneAdministration()
        h1 = Household.form_dict(api.payload)

        if h1 is not None:
            h1.set_id(id)
            adm.save_household(h1)
            return '', 200
        else:
            return '', 500



@fridge_ns.route('/HouseholdbyID/<int:id>')
@fridge_ns.response(500, 'Server-Fehler')
class HouseholdbyIDOperations(Resource):

    @fridge_ns.marshal_list_with(household)
    def get(self, id):
        adm = HalilsTaverneAdministration()
        h = adm.find_household_by_id(id)
        return h




@fridge_ns.route('/Fridge')
@fridge_ns.response(500, 'Server-Fehler')
class FridgeListOperations(Resource):

    #@secured
    @fridge_ns.marshal_list_with(fridge)
    def get(self):
        adm = HalilsTaverneAdministration()
        fridge = adm.get_all_fridges()
        return fridge

    #@secured
    @fridge_ns.expect(fridge)
    @fridge_ns.marshal_list_with(fridge)
    def post(self):
        adm = HalilsTaverneAdministration()
        proposal = Fridge.form_dict(api.payload)

        if proposal is not None:
            f = adm.create_fridge()
            return f, 200
        else:
            return '', 500


@fridge_ns.route('/FridgeEntries')
@fridge_ns.response(500, 'Server-Fehler')
class FridgeEntryListOperations(Resource):

    # @secured
    @fridge_ns.marshal_list_with(fridge_entry)
    def get(self):
        adm = HalilsTaverneAdministration()
        fridge_entries = adm.get_all_fridge_entries()
        return fridge_entries

    @fridge_ns.expect(fridge_entry)
    @fridge_ns.marshal_list_with(fridge_entry)
    # @secured
    def post(self):
        adm = HalilsTaverneAdministration()
        try:

            proposal = FridgeEntry.form_dict(api.payload)

            if proposal is not None:
                fe = adm.create_Fridge_entry(
                    proposal.get_fridge_id(),
                    proposal.get_groceries_designation(),
                    proposal.get_quantity(),
                    proposal.get_unit()
                )
                return fe, 200
            else:
                return {'message': 'Invalid input'}, 400
        except KeyError as e:
            print('Missing field in input:', e)
            return {'message': f'Missing field in input: {e}'}, 400
        except ValueError as e:
            print('Invalid value:', e)
            return {'message': f'Invalid value: {e}'}, 400
        except Exception as e:
            print('Unexpected error:', e)
            print(traceback.format_exc())  # Stack trace für detailliertere Fehlerbehebung drucken
            return {'message': str(e)}, 500


@fridge_ns.route('/FridgeEntry/<string:groceries_designation>')
@fridge_ns.response(500, 'Server-Fehler')
@fridge_ns.response(404, 'FridgeEntry not found')
@fridge_ns.response(200, 'FridgeEntry successfully updated')
@fridge_ns.param('groceries_designation', 'der Name eines Lebensmittels')
class FridgeEntryOperations(Resource):

    #@secured
    def delete(self, groceries_designation):
        adm = HalilsTaverneAdministration()
        fridge_entry = adm.find_fridge_entry_by_designation(groceries_designation)
        adm.delete_fridge_entry(fridge_entry)
        return '', 200

    @fridge_ns.expect(fridge_entry)
    @fridge_ns.marshal_with(fridge_entry)
    def put(self, groceries_designation):
        adm = HalilsTaverneAdministration()
        fe = FridgeEntry.form_dict(api.payload)
        if fe is not None:
            fe.set_groceries_designation(groceries_designation)
            adm.save_fridge_entry(fe)
            return '', 200
        else:
            return '', 500

    @fridge_ns.expect(fridge_entry)
    @fridge_ns.marshal_with(fridge_entry)
    def get(self, groceries_designation):
        adm = HalilsTaverneAdministration()
        fe = adm.find_fridge_entry_by_designation(groceries_designation)
        return fe


@fridge_ns.route('/COOK/<string:recipe_title>', methods=['PUT'])
@fridge_ns.response(500, 'Server_fehler')
@fridge_ns.param('recipe_title', 'der name eines rezepts')
class UseRecipeIngredients(Resource):

    def put(self, recipe_title):
        """Zutaten eines rezepts von entry abziehen"""
        adm = HalilsTaverneAdministration()
        recipe_id = adm.get_recipe_id_by_title(recipe_title)
        recipe_entries = adm.find_recipe_entries_by_recipe_id(recipe_id)
        for recipe_entry in recipe_entries:
            fridge_entry = adm.find_fridge_entry_by_designation(recipe_entry.get_groceries_designation())
            if fridge_entry and fridge_entry.get_quantity() >= recipe_entry.get_quantity():
                new_quantity = fridge_entry.get_quantity() - recipe_entry.get_quantity()
                adm.update_fridge_entry_quantity(fridge_entry.get_id(), fridge_entry.get_groceries_designation(),
                                                 new_quantity, fridge_entry.get_unit())
            else:
                return {"error": f"Nicht genug im Kühlschrank Bro."}, 400

        return {"message": "LET HIM COOK."}, 200


@fridge_ns.route('/RecipeEntries')
@fridge_ns.response(500, 'Server-Fehler')
class RecipeEntryListOperation(Resource):

    #@secured
    @fridge_ns.marshal_list_with(recipe_entry)
    def get(self):
        adm = HalilsTaverneAdministration()
        recipe_entries = adm.get_all_recipes_entries()
        return recipe_entries

    #@secured
    @fridge_ns.expect(recipe_entry)
    @fridge_ns.marshal_list_with(recipe_entry)
    def post(self):
        adm = HalilsTaverneAdministration()
        proposal = RecipeEntry.form_dict(api.payload)
        if proposal is not None:
            re = adm.create_recipe_entry(
                proposal.get_recipe_id(),
                proposal.get_groceries_designation(),
                proposal.get_quantity(),
                proposal.get_unit()
            )
            return re, 200
        else:
            return '', 500


@fridge_ns.route('/recipes/<int:recipe_id>/entries')
@fridge_ns.response(500, 'Server-Fehler')
@fridge_ns.response(404, 'RecipeEntry not found')
@fridge_ns.response(200, 'RecipeEntry successfully retrieved')
@fridge_ns.param('recipe_id', 'Die ID eines Rezepts')
class RecipeEntryListOperationByID(Resource):
    #@secured
    @fridge_ns.marshal_list_with(recipe_entry)
    def get(self, recipe_id):
        adm = HalilsTaverneAdministration()
        reci = adm.find_recipe_entries_by_recipe_id(recipe_id)
        if reci:
            return reci, 200
        else:
            api.abort(404, "RecipeEntry not found")



@fridge_ns.route('/RecipeEntry/<string:groceries_designation>')
@fridge_ns.response(500, 'Server-Fehler')
@fridge_ns.response(404, 'RecipeEntry not found')
@fridge_ns.response(200, 'RecipeEntry successfully updated')
@fridge_ns.param('groceries-designation', 'Bezeichnung eines Lebensmittels')
class RecipeEntryListOperations2(Resource):
    #@secured
    @fridge_ns.marshal_list_with(recipe_entry)
    def get(self, groceries_designation):
        adm = HalilsTaverneAdministration()
        reci = adm.get_recipe_entries_by_designation(groceries_designation)
        return reci

    #@secured
    @fridge_ns.marshal_list_with(recipe_entry)
    def put(self, groceries_designation):
        adm = HalilsTaverneAdministration()
        re = RecipeEntry.form_dict(api.payload)
        if re is not None:
            re.set_groceries_designation(groceries_designation)
            adm.update_recipe_entry(re)
            return '', 200
        else:
            return '', 500

    #@secured
    @fridge_ns.marshal_list_with(recipe_entry)
    def delete(self, groceries_designation):
        adm = HalilsTaverneAdministration()
        re = adm.get_recipe_entries_by_designation(groceries_designation)
        adm.delete_recipe_entry(re)


@fridge_ns.route('/RecipeList')
@fridge_ns.response(500, 'Server-Fehler')
@fridge_ns.response(404, 'Recipe not found')
@fridge_ns.response(200, 'Recipe successfully updated')
class RecipeListOperations(Resource):

    #@secured
    @fridge_ns.marshal_list_with(recipe)
    def get(self):
        adm = HalilsTaverneAdministration()
        recipes = adm.get_all_recipes()
        return recipes

    @fridge_ns.expect(recipe)
    @fridge_ns.marshal_list_with(recipe)
    def post(self):
        adm = HalilsTaverneAdministration()
        
        payload = api.payload #Debugging
        print("Received payload:", payload)  # Debugging information

        proposal = Recipe.form_dict(api.payload)
        
        if proposal is not None:
            r = adm.create_recipe(
                proposal.get_title(),
                proposal.get_number_of_persons(),
                proposal.get_creator(),
                proposal.get_description(),
                proposal.get_household_id(),
            )
            return r, 200
        else:
            return '', 500


@fridge_ns.route('/Recipe/<int:recipe_id>')
@fridge_ns.response(500, 'Server-Fehler')
class RecipeOperations(Resource):

    # @secured
    @fridge_ns.marshal_with(recipe)
    def get(self, recipe_id):
        adm = HalilsTaverneAdministration()
        reci = adm.get_recipe_by_id(recipe_id)
        return reci

    # @secured
    @fridge_ns.marshal_with(recipe)
    def put(self, recipe_id):
        adm = HalilsTaverneAdministration()
        re = Recipe.form_dict(api.payload)
        if re is not None:
            re.set_id(recipe_id)
            adm.update_recipe(re)
            return '', 200
        else:
            return '', 500

    # @secured
    def delete(self, recipe_id):
        adm = HalilsTaverneAdministration()
        recipe = adm.get_recipe_by_id(recipe_id)
        adm.delete_recipe(recipe)
        return '', 200

"""@fridge_ns.route('/fridge-id-by-google-id/<string:google_user_id>')
@fridge_ns.response(500, 'Server-Fehler')
class FridgeIdByGoogleIdOperations(Resource):
    # @secured
    def get(self, google_user_id):
        Fridge ID nach Google-User-ID auslesen
        adm = HalilsTaverneAdministration()
        fridge_id = adm.get_fridge_id_by_google_user_id(google_user_id)
        if fridge_id:
            return {'fridge_id': fridge_id}, 200
        return {'message': 'Fridge ID not found'}, 404"""
    
@fridge_ns.route('/fridge-id-by-google-id/<string:google_user_id>')
@fridge_ns.response(500, 'Server-Fehler')
class FridgeIdByGoogleIdResource(Resource):

    def get(self, google_user_id):
        adm = HalilsTaverneAdministration()
        fridge_id = adm.get_fridge_id_by_google_user_id(google_user_id)
        if fridge_id is not None:
            return {'fridge_id': fridge_id}, 200
        else:
            return {'message': 'Fridge ID not found'}, 404
        
        
@fridge_ns.route('/household-id-by-google-id/<string:google_user_id>')
@fridge_ns.response(500, 'Server-Fehler')
class HouseholdIdByGoogleUserId(Resource):
    
    def get(self, google_user_id):
        adm = HalilsTaverneAdministration()
        household_id = adm.get_household_id_by_google_user_id(google_user_id)
        if household_id is not None: 
            return {'household_id': household_id}, 200
        else:
            return {'message': 'Household ID not found'}, 404
    

if __name__ == '__main__':
    app.run(debug=True, port=5000)
