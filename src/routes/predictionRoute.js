const { postPrediction, getPredictions, deletePredictions } = require('../handlers/predictionControler');
const { postPredictionParamSchema, postPredictionSchema, postPredictionResponseSchema, getPredictionParamSchema, getPredictionResponseSchema, deletePredictionResponseSchema, deletePredictionParamSchema, customFail } = require('../validators');

exports.predictionRoutes = [
    {
        method: 'POST',
        path: '/suca-api/predictions/{userId}',
        options: {
            auth: false,
            description: 'Store prediction',
            notes: 'Store Prediction when ML server\'s Predict path called',
            tags: ['api','Prediction'],
            validate: {
                payload: postPredictionSchema,
                params: postPredictionParamSchema,
                failAction: customFail
            },
            plugins: {
                'hapi-swagger': {
                    order:1,
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
            description: 'Get user predictions',
            notes: 'GET Predictions from database from certain user',
            tags: ['api','Prediction'],
            validate: {
                params: getPredictionParamSchema,
                failAction: customFail
            },
            plugins: {
                'hapi-swagger': {
                    order:2,
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
            description: 'Delete prediction',
            notes: 'Delete certain prediction from certain user',
            tags: ['api','Prediction'],
            validate: {
                params: deletePredictionParamSchema
            },
            plugins: {
                'hapi-swagger': {
                    order:3,
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
