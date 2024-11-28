import tensorflow as tf
import numpy as np

def inference(inputData):
    model = tf.keras.models.load_model('sulthan_cnn_models.keras')
    
    prediction = model.predict(np.array(inputData).reshape(1, 10))
    predictionClass = tf.argmax(prediction, axis=1)

    class_labels = ['Steroid-Induced Diabetes','Neonatal Diabetes Mellitus (NDM)','Prediabetic','Type 1 Diabetes','Wolfram Syndrome','LADA','Type 2 Diabetes','Wolcott-Rallison Syndrome','Secondary Diabetes','Type 3c Diabetes (Pancreatogenic Diabetes)','Gestational Diabetes','Cystic Fibrosis-Related Diabetes (CFRD)','MODY']
    
    index_to_class = {index: label for index, label in enumerate(class_labels)}
    predictLabel = [index_to_class[index] for index in predictionClass.numpy()]
    predictProb = tf.reduce_max(prediction, axis=1).numpy().tolist()

    print("Predicted class labels:", predictLabel)
    print("Predicted probabilities:", predictProb)

    return predictLabel,predictProb

