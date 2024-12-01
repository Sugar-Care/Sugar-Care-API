const { firestore } = require('../firestore');

const predictionsCollection = firestore.collection('users');

exports.storePrediction = async (payload,params) => {

    await predictionsCollection.doc(params.userId).collection('predictions').add({
        input:payload.input,
        prediction:payload.prediction,
        createdAt:new Date().toISOString() 
    });

    return { message: 'Prediction stored successfully' };
};