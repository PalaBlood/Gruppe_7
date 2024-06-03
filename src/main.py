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

api = Api(app, version='1.0', title='SmartFridgeDemo',
          description='Api für unsere SmartFridge')


fridgesystem = api.namespace('fridge', description = "Funktionen der Fridge")

bo = api.model('BusinessObject', {
    'id': fields.Integer(attribute='_id', description= 'ID eines BO')
})

foodentry = api.inherit('FoodEntry', bo, {
    'groceries_designation': fields.String(),
    'quantity': fields.Float(),
    'unit':fields.String()
})

user = api.inherit('User', bo, {
    'name': fields.String(),
    'nick_name': fields.String(),
    'first_name':fields.String(),
    'last_name':fields.String()
})


Fridge = api.inherit('Fridge', bo, {
    'content': fields.List()
})


Recipe = api.inherit('Recipe', bo, {
    'title':fields.String(),
    'number_of_persons':fields.Integer(),
    'creator':fields.String(),
    'content':fields.List()
})

RecipeEntry = api.inherit('RecipeEntry', foodentry, {
    'recipe_id':fields.Integer(),
})

FridgeEntry = api.inherit('FridgeEntry', foodentry, {
    'fridge_id':fields.Integer()
})


if __name__== '__main__':
    app.run(debug=True)