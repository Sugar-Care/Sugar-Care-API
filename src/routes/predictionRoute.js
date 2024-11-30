const { postPrediction, getPredictions } = require('../handlers/predictionControler');
const { predictionSchema, predictionResponseSchema } = require('../validators');

exports.predictionRoutes = [
    {
        method: 'POST',
        path: '/prediction',
        options: {
            auth: false,
            description: 'Prediction',
            notes: 'Store Prediction from ML Server',
            tags: ['api'],
            validate: {
                payload: predictionSchema
            },
            plugins: {
                'hapi-swagger': {
                    responses: {
                        200: {
                            description: 'Berhasil',
                            schema: predictionResponseSchema
                        }
                    }
                }
            },
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
