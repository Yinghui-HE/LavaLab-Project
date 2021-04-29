from flask_restful import Api, Resource, reqparse
import mysql.connector
import os


class AddRestaurantApiHandler(Resource):

    def get(self):
        return {
            'resultStatus': 'SUCCESS',
            'message': "Login Api Handler"
        }

    def post(self):
        print(self)
        parser = reqparse.RequestParser()
        parser.add_argument('userID', type=str)
        parser.add_argument('restaurantID', type=str)

        args = parser.parse_args()
        print(args)
        # note, the post req from frontend needs to match the strings here (e.g. 'type and 'message')

        request_userID = args['userID']
        request_restaurantID = args['restaurantID']
        # ret_status, ret_msg = ReturnData(request_email, request_password)
        # # currently just returning the req straight

        ret_status = "Failure"
        ret_msg = ""

        # connect to mysql database
        host = os.environ.get('MYSQL_HOST')
        database = os.environ.get('MYSQL_DATABASE')
        password = os.environ.get('MYSQL_PASSWORD')
        user = os.environ.get('MYSQL_USER')

        cnx = mysql.connector.connect(host=host, user=user, password=password, database=database)

        # check database
        cursor = cnx.cursor()
        sql_query = "INSERT INTO UserRestaurantList (UserID, RestaurantID) VALUES (%s, %s)"
        val = (request_userID, request_restaurantID)
        cursor.execute(sql_query, val)

        cnx.commit()

        ret_status = "Success"
        ret_msg = str(cursor.rowcount) + "record inserted."
        final_ret = {"status": ret_status, "message": ret_msg}

        return final_ret
