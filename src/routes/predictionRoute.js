const { postPrediction, getPredictions, deletePredictions } = require('../handlers/predictionControler');
const { postPredictionParamSchema, postPredictionSchema, postPredictionResponseSchema, getPredictionParamSchema, getPredictionResponseSchema, deletePredictionResponseSchema, deletePredictionParamSchema } = require('../validators');

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
                            description: 'Berhasil Simpen',
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
                            description: 'Berhasil Ngambil',
                            schema: getPredictionResponseSchema
                        }
                    }
                }
            },
            handler: getPredictions
        }
    },
    {
        method: 'DELETE',
        path: '/suca-api/predictions/{userId}/{predictId}',
        options: {
            auth: false,
            description: 'Prediction',
            notes: 'GET Predictions from database',
            tags: ['api','prediction'],
            validate: {
                params: deletePredictionParamSchema
            },
            plugins: {
                'hapi-swagger': {
                    order:1,
                    responses: {
                        200: {
                            description: 'Berhasil Ngapus',
                            schema: deletePredictionResponseSchema
                        }
                    }
                }
            },
            handler: deletePredictions
        }
    }
];
