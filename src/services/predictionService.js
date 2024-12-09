const { firestore } = require('../firestore');

const usersCollection = firestore.collection('users');

exports.storePrediction = async (payload,params) => {

    await usersCollection.doc(params.userId).collection('predictions').add({
        input:payload.input,
        prediction:payload.prediction,
        createdAt:new Date().toISOString() 
    });

    return { message: 'Prediction stored successfully' };
};

exports.retrievePredictions = async (params) => {

    const snapshot = await usersCollection.doc(params.userId).collection('predictions').get()

    const userPredictions = snapshot.docs.map(doc => {return {predictId:doc.id, data:doc.data()}})
    
    return { message:"Predictions retrieved successfully",predictions:userPredictions };
};

exports.terminatePrediction = async (params) => {

    await usersCollection.doc(params.userId).collection('predictions').doc(params.predictId).delete()

    return { message:"Predictions terminated successfully" };
};