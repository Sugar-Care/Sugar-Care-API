const { postPrediction, getPredictions } = require('../handlers/predictionControler')

exports.predictionRoutes = [
    {
        method: 'POST',
        path: '/prediction',
        options: {
            auth: false,
            description: 'Prediction',
            notes: 'Store Prediction from ML Server',
            tags: ['api'],
            handler: postPrediction
        }
    },
    {
        method: 'GET',
        path: '/predictions',
        options: {
            auth: false,
            description: 'Prediction',
            notes: 'GET Prediction from database',
            tags: ['api'],
            handler: getPredictions
        }
    }
];
