from flask_restful import Api, Resource, reqparse
import mysql.connector
import os


class LoginApiHandler(Resource):

    def get(self):
        return {
            'resultStatus': 'SUCCESS',
            'message': "Login Api Handler"
        }

    def post(self):
        print(self)
        parser = reqparse.RequestParser()
        parser.add_argument('email', type=str)
        parser.add_argument('password', type=str)

        args = parser.parse_args()
        print(args)
        # note, the post req from frontend needs to match the strings here (e.g. 'type and 'message')

        request_email = args['email']
        request_password = args['password']
        # ret_status, ret_msg = ReturnData(request_email, request_password)
        # # currently just returning the req straight

        ret_status = "Failure"
        ret_msg = ""
        user_id = -1

        # connect to mysql database
        host = os.environ.get('MYSQL_HOST')
        database = os.environ.get('MYSQL_DATABASE')
        password = os.environ.get('MYSQL_PASSWORD')
        user = os.environ.get('MYSQL_USER')

        cnx = mysql.connector.connect(host=host, user=user, password=password, database=database)

        # check database
        cursor = cnx.cursor()
        sql_query = "SELECT *FROM UserProfile WHERE Email ='%s' AND Password ='%s'" % (request_email, request_password)
        if len(request_email) == 0 and len(request_password) == 0:
            ret_msg = "Please fill in the missing info"

        if len(request_email) == 0 and len(request_password) != 0:
            ret_msg = "Please Enter an email"
        elif len(request_email) != 0 and len(request_password) == 0:
            ret_msg = "Please enter a password"

        else:
            cursor.execute(sql_query)
            query_results = cursor.fetchall()

            if len(query_results) == 0:
                ret_msg = "Email and password do not match"
            else:
                ret_status = "Success"
                ret_msg = "Log in successfully"
                for row in query_results:
                    user_id = row[0]
                    print(row)

        # if ret_msg:
        #     message = "Your Message Requested: {}".format(ret_msg)
        # else:
        #     message = "No Msg"

        final_ret = {"status": ret_status, "message": ret_msg, "userID": user_id}

        return final_ret
