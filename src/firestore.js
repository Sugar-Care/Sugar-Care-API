const { Firestore } = require('@google-cloud/firestore');

const firestore = new Firestore({
    projectId: 'sugar-care-441806',
    // keyFilename: 'Suca-key.json'
});
module.exports = { firestore };