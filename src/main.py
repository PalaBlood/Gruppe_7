from flask import Flask
from flask_cors import CORS
from flask_restx import Api, Resource, fields
from src.server.HalilsTaverneAdministration import HalilsTaverneAdministration
from src.server.bo.Fridge import Fridge
from src.server.bo.Recipe import Recipe
from src.server.bo.FridgeEntry import FridgeEntry
from src.server.bo.RecipeEntry import RecipeEntry
from src.server.bo.User import User
from src.server.bo.FoodEntry import FoodEntry
from src.server.bo.Household import Household

from SecurityDecorator import secured


app = Flask(__name__)


CORS(app, resources={r"/api/":{"origins":"*"}})


#alle pfade für ursprünge offen

api = Api(app, version='1.0', title='SmartFridgeDemo API',
          description='An API for managing a smart fridge system.')

# Namespace
fridge_ns = api.namespace('fridge', description='Fridge-related functionalities')

# Modelle für Flask-Restx
bo = api.model('BusinessObject', {
    'id': fields.Integer(attribute='_id', description='Unique identifier of a business object')
})

food_entry = api.inherit('FoodEntry', {
    'groceries_designation': fields.String(attribute='_FoodEntry__groceries_designation',required=True, description='Name of the grocery item'),
    'quantity': fields.Integer(attribute='_FoodEntry__quantity',required=True, description='Quantity of the grocery item'),
    'unit': fields.String(attribute='_FoodEntry__unit',required=True, description='Unit of measure for the quantity')
})

user = api.inherit('User', bo, {
    'nick_name': fields.String(attribute='_nickname',description='Nickname of the user'),
    'first_name': fields.String(attribute='_first_name',description='First name of the user'),
    'last_name': fields.String(attribute='_last_name',description='Last name of the user'),
    'household_id': fields.String(attribute='_Household_id',description='The household_id of the user'),
    'google_user_id': fields.String(attribute='_google_user_id',description='Unique google_user_id')
})

fridge = api.inherit('Fridge', bo, {})

recipe = api.inherit('Recipe', bo, {
    'title': fields.String(attribute='__title', required=True, description='Title of the recipe'),
    'number_of_persons': fields.Integer(attribute='__number_of_persons', required=True, description='Number of servings the recipe provides'),
    'creator': fields.String(attribute='__creator', description='Creator of the recipe'),
})

recipe_entry = api.inherit('RecipeEntry', food_entry, {
    'recipe_id': fields.Integer(attribute='_RecipeEntry__recipe_id',required=True, description='Identifier of the associated recipe')
})

fridge_entry = api.inherit('FridgeEntry', food_entry, {
    'fridge_id': fields.Integer(attribute='_FridgeEntry__fridge_id', required=True, description='Identifier of the associated fridge'),
})


household = api.inherit('Household', bo, {
    'name': fields.String(attribute='__name',description='Name of the household'),
})


@fridge_ns.route('/users')
@fridge_ns.response(500, 'Server-Fehler')
class UserListOperations(Resource):
    @fridge_ns.marshal_list_with(user)
    @secured
    def get(self):
        """Auslesen aller User"""

        adm = HalilsTaverneAdministration()
        users = adm.get_all_users()
        return users

    @fridge_ns.marshal_with(user, code=200)
    @fridge_ns.expect(user)
    @secured
    def post(self):

        """Neuen User anlegen"""

        adm = HalilsTaverneAdministration()
        proposal = User.from_dict(api.payload)

        if proposal is not None:

            u = adm.create_user(
                proposal.get_nick_name(),
                proposal.get_first_name(),
                proposal.get_last_name(),
                proposal.get_google_user_id()
            )
            return u, 200

        else:
            return '', 500
        #500: server-fehler


@fridge_ns.route('/users/<int:id>')
@fridge_ns.response(500, 'Server-Fehler')
@fridge_ns.param('id','die Id eines Users')
class UserOperations(Resource):
    @fridge_ns.marshal_with(user)
    @secured
    def get(self, id):
        """User nach ID auslesen"""

        adm = HalilsTaverneAdministration()
        User = adm.get_user_by_id(id)
        return User


    @fridge_ns.marshal_with(user)
    @secured
    def get(self, google_user_id):
        """user nach google_user_id auslesen"""
        adm = HalilsTaverneAdministration()
        User = adm.get_user_by_google_user_id(google_user_id)
        return User

    @secured
    def delete(self,id):
        """user löschen"""
        adm = HalilsTaverneAdministration()
        User = adm.get_user_by_id(id)
        adm.delete_user(User)
        return '', 200


    @fridge_ns.marshal_with(user)
    @fridge_ns.expect(user, validate=True)
    @secured
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

@fridge_ns.route('users-by-nick_name/<string:nick_name>')
@fridge_ns.response(500, 'Server-Fehler')
@fridge_ns.param('nick_name', 'Der nick_name eines Users')
class UsersByNameOperations(Resource):

    @fridge_ns.marshal_with(user)
    def get(self, nick_name):
        """User nach Nickname auslesen"""
        adm = HalilsTaverneAdministration()
        User = adm.get_user_by_nickname(nick_name)
        return User

@fridge_ns.route('/Household')
@fridge_ns.response(500, 'Server-Fehler')
class HouseholdListOperation(Resource):

    @fridge_ns.marshal_list_with(household)
    @secured
    def get(self):

        adm = HalilsTaverneAdministration()
        households = adm.get_all_households()
        return households

    @secured
    @fridge_ns.expect(household)
    def post(self):

        adm = HalilsTaverneAdministration()
        proposal = Household.form_dict(api.payload)

        if proposal is not None:

            h = adm.create_household(
                proposal.get_name()
            )
            return h, 200
        else:
            return '', 500


@fridge_ns.route('/Household/<int:id>')
@fridge_ns.response(500, 'Server-Fehler')
@fridge_ns.param('id','die Id eines Haushalts')
class HouseholdOperations(Resource):
    @fridge_ns.marshal_with(household)
    @secured
    def get(self,id):

        adm = HalilsTaverneAdministration()
        hou = adm.find_household_by_id(id)
        return hou

    @secured
    def delete(self, id):

        adm = HalilsTaverneAdministration() #Vermindung zur Adminklasse mit allen Methoden
        hou = adm.find_household_by_id(id) #Nun verwenden wir die Methode, um die notwenige Id auszulesen
        adm.delete_household(hou) # Anhhand der ID löschen wir das Household Objekt anhand der ID
        return '', 200

    @fridge_ns.marshal_with(household)
    @fridge_ns.expect(household, validate=True)
    @secured
    def put(self, id):
        """update eines household-objekts nach id"""

        adm = HalilsTaverneAdministration()
        h = adm.find_household_by_id(id)

        if h is not None:

            h.set_id(id)
            adm.save_household(h)
            return '', 200
        else:
            return '', 500


#auslesen aller fridges

@fridge_ns.route('/Fridge')
@fridge_ns.response(500,'Server-Fehler')
class FridgeListOperations(Resource):

    @fridge_ns.marshal_list_with(fridge)
    @secured
    def get(self):


        adm = HalilsTaverneAdministration()
        fridges = adm.get_all_fridges()
        return fridges

    @fridge_ns.expect(fridge)
    @secured
    def post(self):

        adm = HalilsTaverneAdministration()
        proposal = Fridge.form_dict(api.payload)
        if proposal is not None:

            f = adm.create_Fridge()
            return f, 200
        else:
            return '', 500



@fridge_ns.route('/Lager')
@fridge_ns.response(500,'Server-Fehler')
class FridgeEntryListOperations(Resource):
    @secured
    @fridge_ns.marshal_list_with(fridge_entry)
    def get(self):

        adm = HalilsTaverneAdministration()
        fridge_entries = adm.get_all_fridge_entries()
        return fridge_entries

    @fridge_ns.expect(fridge_entry)
    @secured
    def post(self):

        adm = HalilsTaverneAdministration()
        proposal = FridgeEntry.form_dict(api.payload)
        print(proposal)
        if proposal is not None:

            fe = adm.create_Fridge_entry(
                proposal.get_fridge(),
                proposal.get_groceries_designation(),
                proposal.get_quantity(),
                proposal.get_unit()
            )
            return fe, 200
        else:
            return '', 500



@fridge_ns.route('/FridgeEntry/<string:groceries_designation>')
@fridge_ns.response(500, 'Server-Fehler')
@fridge_ns.response(404, 'FridgeEntry not found')
@fridge_ns.response(200, 'FridgeEntry successfully updated')
@fridge_ns.param('groceries_designation', 'der Name eines Lebensmittels')
class FridgeEntryOperations(Resource):
    @secured
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


@fridge_ns.route('/COOK/<string:recipe_title>', methods=['PUT'])
@fridge_ns.response(500, 'Server_fehler')
@fridge_ns.param('recipe_title', 'der name eines rezepts')
class UseRecipeIngredients(Resource):

    @secured
    def put(self, recipe_title):
        """Zutaten eines rezepts von entry abziehen"""
        adm = HalilsTaverneAdministration()
        recipe_id = adm.get_recipe_id_by_title(recipe_title)
        recipe_entries = adm.find_recipe_entries_by_recipe_id(recipe_id)
        for recipe_entry in recipe_entries:
            fridge_entry = adm.find_fridge_entry_by_designation(recipe_entry._FoodEntry__groceries_designation)
            if fridge_entry:
                if fridge_entry._FoodEntry__quantity >= recipe_entry._FoodEntry__quantity:
                    new_quantity = fridge_entry._FoodEntry__quantity - recipe_entry._FoodEntry__quantity
                    adm.update_fridge_entry_quantity(fridge_entry.fridge_id, fridge_entry._FoodEntry__groceries_designation,
                                                     new_quantity, fridge_entry._FoodEntry__unit)
                else:
                    # Nicht genug in der Fridge
                    return {"error": f"Nicht genug im Kühlschrank Bro."}, 400

        return {"message": "LET HIM COOK."}, 200


@fridge_ns.route('/RecipeEntries')
@fridge_ns.response(500, 'Server-Fehler')
class RecipeEntryListOperation(Resource):

    """@secured"""
    @fridge_ns.marshal_list_with(recipe_entry)
    def get(self):

        adm = HalilsTaverneAdministration()
        recipe_entries = adm.get_all_recipes_entries()
        return recipe_entries


























































if  __name__== '__main__':
    app.run(debug=True)