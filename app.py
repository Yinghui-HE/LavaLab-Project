from flask import Flask, send_from_directory, render_template, redirect, url_for, request
from flask_restful import Api, Resource, reqparse
from venv.api.HelloApiHandler import HelloApiHandler
from flask_cors import CORS #comment this on deployment
import mysql.connector
import os

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


# Route for handling the login page logic
@app.route('/login', methods=['GET', 'POST'])
def login():
    error = None
    if request.method == 'POST':
        if request.form['username'] != 'admin' or request.form['password'] != 'admin':
            error = 'Invalid Credentials. Please try again.'
        else:
            return redirect(url_for('home'))
    return render_template('login.html', error=error)
