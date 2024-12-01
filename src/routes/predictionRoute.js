const { postPrediction, getPredictions } = require('../handlers/predictionControler');
const { predictionResponseSchema, postPredictionParamSchema, postPredictionSchema } = require('../validators');

exports.predictionRoutes = [
    {
        method: 'POST',
        path: '/suca-api/predictions/{userId}',
        options: {
            auth: false,
            description: 'Prediction',
            notes: 'Store Prediction from ML Server',
            tags: ['api','prediction'],
            validate: {
                payload: postPredictionSchema,
                params: postPredictionParamSchema
            },
            plugins: {
                'hapi-swagger': {
                    order:2,
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
        path: '/suca-api/predictions/{userId}',
        options: {
            auth: false,
            description: 'Prediction',
            notes: 'GET Predictions from database',
            tags: ['api','prediction'],
            plugins: {
                'hapi-swagger': {
                    order:1
                }
            },
            handler: getPredictions
        }
    }
];
