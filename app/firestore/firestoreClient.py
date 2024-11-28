from google.cloud import firestore
import os

# os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "Suca-key.json"

db = firestore.Client()

def storeData(data):
    doc_ref = db.collection('predictions').add(data)
    return doc_ref
