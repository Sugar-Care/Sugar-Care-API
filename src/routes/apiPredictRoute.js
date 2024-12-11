const { postPredict } = require('../handlers/apiPredictControler');
const { customFail, postPredictSchema, postPredictResponseSchema, postPredictParamSchema, authSchema } = require('../validators');

exports.predictRoutes = [
    {
        method: 'POST',
        path: '/predictions/{userId}',
        options: {
            description: 'Predict path to ML server endpoint',
            notes: 'This is just for documentation please use base url https://sugar-care-api-predict-510866273403.asia-southeast2.run.app',
            tags: ['api','Predict'],
            validate: {
                payload: postPredictSchema,
                params: postPredictParamSchema,
                headers: authSchema,
                failAction: customFail
            },
            plugins: {
                'hapi-rate-limit': { 
                    userPathLimit: 2, // Number of requests per path per period
                    userPathCache: {
                    expiresIn: 3600000, // Time period in milliseconds
                    segment: 'hapi-rate-limit-predict',
                    } 
                },
                'hapi-swagger': {
                    order:1,
                    responses: {
                        200: {
                            description: 'Berhasil Prediksi',
                            schema: postPredictResponseSchema
                        }
                    }
                }
            },
            handler: postPredict
        }
    }
];
