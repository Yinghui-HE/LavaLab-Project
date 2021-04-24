from flask import Flask, send_from_directory, render_template, redirect, url_for, request
from flask_restful import Api, Resource, reqparse
from venv.api.HelloApiHandler import HelloApiHandler
from venv.api.LoginApiHandler import LoginApiHandler
from venv.api.ProfileApiHandler import ProfileApiHandler
from flask_cors import CORS #comment this on deployment
import mysql.connector
import os
import json

# connect to mysql database
host = os.environ.get('MYSQL_HOST')
database = os.environ.get('MYSQL_DATABASE')
password = os.environ.get('MYSQL_PASSWORD')
user = os.environ.get('MYSQL_USER')

cnx = mysql.connector.connect(host=host, user=user, password=password, database=database)

# flask setup
app = Flask(__name__, static_url_path='', static_folder='frontend/build')
CORS(app) #comment this on deployment
api = Api(app)

@app.route("/", defaults={'path':''})
def serve(path):
    return send_from_directory(app.static_folder,'login.html')


api.add_resource(HelloApiHandler, '/flask/hello')
api.add_resource(LoginApiHandler, '/login_form')
api.add_resource(ProfileApiHandler, '/profile')

@app.route("/profile")
def profile():
    userID = request.args.get('userID')
    print(userID)

if __name__ == '__main__':
    app.run(debug=True)