from flask import Flask, request
from flask_cors import CORS
import os
from signal import *
import wavedrom
import json

app = Flask(__name__)

CORS(app, supports_credentials=True)


# APP_ROOT = os.path.dirname(os.path.abspath(__file__))
# print(APP_ROOT)

@app.route("/pre", methods=['POST', 'GET'])
def helloWorld():
    data = request.get_json()
    print(type(data))
    print(data)
    return "status:ok"

@app.route("/getWave",methods=['GET'])
def getWave():
    return  {'signal': [{'name': '1', 'wave': '1233', 'period': '', 'phase': ''}]}
if __name__ == '__main__':
    app.run()
