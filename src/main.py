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

food_entry = api.inherit('FoodEntry', bo, {
    'groceries_designation': fields.String(required=True, description='Name of the grocery item'),
    'quantity': fields.Float(required=True, description='Quantity of the grocery item'),
    'unit': fields.String(required=True, description='Unit of measure for the quantity')
})

user = api.inherit('User', bo, {
    'nick_name': fields.String(description='Nickname of the user'),
    'first_name': fields.String(description='First name of the user'),
    'last_name': fields.String(description='Last name of the user'),
    'google_user_id': fields.String(description='Unique google_user_id')
})

fridge = api.inherit('Fridge', bo, {
    'content': fields.List(fields.Nested(food_entry), description='List of food entries in the fridge')
})

recipe = api.inherit('Recipe', bo, {
    'title': fields.String(required=True, description='Title of the recipe'),
    'number_of_persons': fields.Integer(required=True, description='Number of servings the recipe provides'),
    'creator': fields.String(description='Creator of the recipe'),
    'content': fields.List(fields.Nested(food_entry), description='List of ingredients used in the recipe')
})

recipe_entry = api.inherit('RecipeEntry', food_entry, {
    'recipe_id': fields.Integer(required=True, description='Identifier of the associated recipe')
})

fridge_entry = api.inherit('FridgeEntry', food_entry, {
    'fridge_id': fields.Integer(required=True, description='Identifier of the associated fridge')
})


household = api.inherit('Household', bo, {
    'name': fields.String(description='Name of the household'),
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
        proposal = user.from_dict(api.payload)

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


#auslesen aller fridges

@fridge_ns.route('/Fridge')
@fridge_ns.response(500,'Server-Fehler')
class FridgeOperations(Resource):

    @fridge_ns.marshal_list_with(fridge)
    @secured
    def get(self):


        adm = HalilsTaverneAdministration()
        fridges = adm.get_all_fridges()
        return fridges




if  __name__== '__main__':
    app.run(debug=True)