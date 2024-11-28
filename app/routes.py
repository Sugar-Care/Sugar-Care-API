from flask import Blueprint, jsonify, request
from .models.inference import inference
from .firestore.firestoreClient import storeData

main = Blueprint('main', __name__)

@main.route('/prediction', methods=['POST'])
def infer():
    data = request.get_json()
    inputData = [data[x] for x in data]

    predictLabel,predictProb = inference(inputData)

    result = {"Label":predictLabel,"Probability":predictProb}

    storeData(result)

    return jsonify({'result': result}), 201
