import tensorflow as tf
import numpy as np

def inference(inputData):
    model = tf.keras.models.load_model('sulthan_cnn_models_v2.keras')
    
    prediction = model.predict(np.array(inputData).reshape(1, 10))
    predictionClass = tf.argmax(prediction, axis=1)

    class_labels = ['Cystic Fibrosis-Related Diabetes (CFRD)','Gestational Diabetes','LADA','MODY','Neonatal Diabetes Mellitus (NDM)','Prediabetic','Secondary Diabetes','Steroid-Induced Diabetes','Type 1 Diabetes','Type 2 Diabetes','Type 3c Diabetes (Pancreatogenic Diabetes)','Wolcott-Rallison Syndrome','Wolfram Syndrome']

    predictLabel = class_labels[predictionClass.numpy()[0]]
    predictProb = tf.reduce_max(prediction, axis=1).numpy().tolist()

    print("Predicted class labels:", predictLabel)
    print("Predicted probabilities:", predictProb)

    return predictLabel,predictProb[0]

