const { firestore } = require('../firestore');

const usersCollection = firestore.collection('users');

exports.storeTracking = async (payload,params) => {
    const user = await usersCollection.doc(params.userId).get();
    if(!user.exists){
        return { message: 'User not found' };    
    }

    await usersCollection.doc(params.userId).collection('tracking').add({
        sugarIntake: payload.sugarIntake,
        bodyWeight: payload.bodyWeight,
        createdAt:new Date().toISOString()
    });

    return { message: 'Track stored successfully' };
};

exports.retrieveTracking = async (params) => {
    const snapshot = await usersCollection.doc(params.userId).collection('tracking').get()

    if(snapshot.docs.length < 1){
        return { message:'No tracking found' };    
    }

    const userTracking = snapshot.docs.map(doc => {return {trackingId:doc.id, data:doc.data()}}).sort((a, b) => new Date(b.data.createdAt) - new Date(a.data.createdAt)).slice(0,20)
    
    return { message:"Tracking retrieved successfully",tracking:userTracking };
};

exports.terminateTracking = async (params) => {
    const trackingDoc = await usersCollection.doc(params.userId).collection('tracking').doc(params.trackingId).get();

    if (!trackingDoc.exists) {
        const userDoc = await usersCollection.doc(params.userId).get();
        if(!userDoc.exists){
            return { message:'User not found' };    
        }
        return { message:'Track record not found' };
    }

    await usersCollection.doc(params.userId).collection('tracking').doc(params.trackingId).delete()

    return { message:"Track terminated successfully" };
};