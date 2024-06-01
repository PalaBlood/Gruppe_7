from flask import flask
from flas_restx import Api, Resource, fields
from flask_cors import CORS

from HalilsTaverneAdministration import HalilsTaverneAdministration
from Fridge import Fridge
from Recipe import Recipe
from FridgeEntry import FridgeEntry
from RecipeEntry import RecipeEntry
from User import User

from SecurityDecorator import secured


app = Flask