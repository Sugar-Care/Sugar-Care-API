from flask import Blueprint, jsonify, request
import requests
from .inference import inference

main = Blueprint('main', __name__)

@main.route('/predictions/<userId>', methods=['POST'])
def infer(userId):
    data = request.get_json()["input"]
    inputData = [
        data["age"], 
        data["bloodGlucoseLevels"],
        data["bloodPressure"],
        data["weightGainDuringPregnancy"],
        data["waistCircumference"],
        data["bmi"],
        data["insulinLevels"],
        data["cholesterolLevels"],
        data["digestiveEnzymeLevels"],
        data["pulmonaryFunction"]
    ]

    predictLabel,predictProb = inference(inputData)

    result = {
        "input":data,
        "prediction":{
            "label":predictLabel,
            "probability":predictProb
        }
    }

    #storeData
    response = requests.post("https://sugar-care-api-database-510866273403.asia-southeast2.run.app/suca-api/predictions/"+userId, json=result)
    return jsonify({
        "result": {
            "label":predictLabel,
            "probability":predictProb,
            "message":response.json()["message"]
        }
    }), 201
