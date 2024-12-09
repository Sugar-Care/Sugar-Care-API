const { postPredict } = require('../handlers/apiPredictControler');
const { customFail, postPredictSchema, postPredictResponseSchema, postPredictParamSchema } = require('../validators');

exports.predictRoutes = [
    {
        method: 'POST',
        path: '/predictions/{userId}',
        options: {
            auth: false,
            description: 'Predict',
            notes: 'This is just for documentation please use base url https://sugar-care-api-predict-510866273403.asia-southeast2.run.app',
            tags: ['api','Predict'],
            validate: {
                payload: postPredictSchema,
                params: postPredictParamSchema,
                failAction: customFail
            },
            plugins: {
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
