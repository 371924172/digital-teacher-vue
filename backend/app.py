from flask import Flask, request
from flask_cors import CORS
import os
from signal import *
import wavedrom
import json
app = Flask(__name__)

CORS(app,supports_credentials = True)

# APP_ROOT = os.path.dirname(os.path.abspath(__file__))
# print(APP_ROOT)

@app.route("/",methods=['post','get'])

def helloWorld():
    data = request.get_json()
    print(data)
    wavejson = {"signal":[]}
    signals = []
    s = signal(name= "cm", wave="x.3x=x4x=x=x=x=x").to_dict()
    signals.append(s)
    wavejson["signal"] = signals

    svg = wavedrom.render(json.dumps(wavejson))
    return svg.tostring()

if __name__ == '__main__':
    app.run()
