const { firestore } = require('../firestore');

const predictionsCollection = firestore.collection('users');

exports.storePrediction = async (payload) => {

    await predictionsCollection.doc(payload.email).collection('predictions').add({
        input:payload.input,
        prediction:payload.prediction,
        createdAt:new Date().toISOString() 
    });

    return { message: 'Model stored successfully' };
};