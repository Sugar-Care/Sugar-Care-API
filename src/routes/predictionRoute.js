const { postPrediction, getPredictions } = require('../handlers/predictionControler');
const { postPredictionParamSchema, postPredictionSchema, postPredictionResponseSchema, getPredictionParamSchema, getPredictionResponseSchema } = require('../validators');

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
                            schema: postPredictionResponseSchema
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
            validate: {
                params: getPredictionParamSchema
            },
            plugins: {
                'hapi-swagger': {
                    order:1,
                    responses: {
                        200: {
                            description: 'Berhasil',
                            schema: getPredictionResponseSchema
                        }
                    }
                }
            },
            handler: getPredictions
        }
    }
];
