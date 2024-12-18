const { firestore } = require('../firestore');

const usersCollection = firestore.collection('users');

exports.storePrediction = async (payload,params) => {
    const user = await usersCollection.doc(params.userId).get();
    if(!user.exists){
        return { message: 'User not found' };    
    }

    await usersCollection.doc(params.userId).collection('predictions').add({
        input:payload.input,
        prediction:payload.prediction,
        createdAt:new Date().toISOString()
    });

    return { message: 'Prediction stored successfully' };
};

exports.retrievePredictions = async (params) => {
    const snapshot = await usersCollection.doc(params.userId).collection('predictions').get()

    if(snapshot.docs.length < 1){
        return { message:'No prediction found' };    
    }

    const userPredictions = snapshot.docs.map(doc => {return {predictId:doc.id, data:doc.data()}}).sort((a, b) => new Date(b.data.createdAt) - new Date(a.data.createdAt)).slice(0,20)
    
    return { message:"Predictions retrieved successfully",predictions:userPredictions };
};

exports.terminatePrediction = async (params) => {
    const predictionDoc = await usersCollection.doc(params.userId).collection('predictions').doc(params.predictId).get();

    if (!predictionDoc.exists) {
        const userDoc = await usersCollection.doc(params.userId).get();
        if(!userDoc.exists){
            return { message:'User not found' };    
        }
        return { message:'Prediction not found' };
    }

    await usersCollection.doc(params.userId).collection('predictions').doc(params.predictId).delete()

    return { message:"Predictions terminated successfully" };
};