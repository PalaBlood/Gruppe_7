from f
from flask_cors import CORS

from HalilsTaverneAdministration import HalilsTaverneAdministration
from Fridge import Fridge
from Recipe import Recipe
from FridgeEntry import FridgeEntry
from RecipeEntry import RecipeEntry
from User import User

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
    'number_of_persons':fields.INT
})