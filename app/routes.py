from flask import Blueprint, jsonify, request
import requests
from .inference import inference

main = Blueprint('main', __name__)

@main.route('/prediction', methods=['POST'])
def infer():
    data = request.get_json()
    inputData = [data["input"][x] for x in data["input"]]

    predictLabel,predictProb = inference(inputData)

    result = {
        "email":data["email"],
        "input":data["input"],
        "prediction":{
            "label":predictLabel,
            "probability":predictProb
        }
    }

    #storeData
    response = requests.post("https://sugar-care-api-database-510866273403.asia-southeast2.run.app/prediction", json=result)
    return jsonify({
        "result": {
            "label":predictLabel,
            "probability":predictProb,
            "message":response.json()
        }
    }), 201
