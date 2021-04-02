# from flask import Flask
#
# app = Flask(__name__)
#
#
# @app.route('/')
# def hello_world():
#     return 'Hello, World!'
#
#
# if __name__ == "__main__":
#   app.run()


from flask import Flask, send_from_directory
from flask_restful import Api, Resource, reqparse
from venv.api.HelloApiHandler import HelloApiHandler
from flask_cors import CORS #comment this on deployment

app = Flask(__name__, static_url_path='', static_folder='frontend/build')
CORS(app) #comment this on deployment
api = Api(app)

@app.route("/", defaults={'path':''})
def serve(path):
    return send_from_directory(app.static_folder,'index.html')

api.add_resource(HelloApiHandler, '/flask/hello')