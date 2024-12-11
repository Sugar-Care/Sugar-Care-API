const { postTracking, getTracking, deleteTracking } = require("../handlers/trackingControler");
const { postTrackingSchema, postTrackingParamSchema, customFail, postTrackingResponseSchema, getTrackingParamSchema, getTrackingResponseSchema, deleteTrackingParamSchema, deleteTrackingResponseSchema } = require("../validators");

exports.trackingRoutes = [
    {
        method: 'POST',
        path: '/suca-api/track/{userId}',
        options: {
            auth:false,
            description: 'Tracking',
            notes: 'Store tracking record to database of certain user',
            tags: ['api','Track'],
            validate: {
                payload: postTrackingSchema,
                params: postTrackingParamSchema,
                failAction: customFail
            },
            plugins: {
                'hapi-rate-limit': { 
                    userPathLimit: 7, // Number of requests per path per period
                    userPathCache: {
                    expiresIn: 3600000, // Time period in milliseconds
                    segment: 'hapi-rate-limit-predict',
                    } 
                },
                'hapi-swagger': {
                    order:1,
                    responses: {
                        200: {
                            description: 'Berhasil mengisi tracking',
                            schema: postTrackingResponseSchema
                        }
                    }
                }
            },
            handler: postTracking
        }
    },
    {
        method: 'GET',
        path: '/suca-api/track/{userId}',
        options: {
            auth: false,
            description: 'Get user tracking record',
            notes: 'GET tracking record from database from certain user',
            tags: ['api','Track'],
            validate: {
                params: getTrackingParamSchema,
                failAction: customFail
            },
            plugins: {
                'hapi-swagger': {
                    order:2,
                    responses: {
                        200: {
                            description: 'Berhasil Ngambil',
                            schema: getTrackingResponseSchema
                        }
                    }
                }
            },
            handler: getTracking
        }
    },
    {
        method: 'DELETE',
        path: '/suca-api/track/{userId}/{trackingId}',
        options: {
            auth: false,
            description: 'Delete track',
            notes: 'Delete certain track from certain user',
            tags: ['api','Track'],
            validate: {
                params: deleteTrackingParamSchema
            },
            plugins: {
                'hapi-swagger': {
                    order:3,
                    responses: {
                        200: {
                            description: 'Berhasil Ngapus',
                            schema: deleteTrackingResponseSchema
                        }
                    }
                }
            },
            handler: deleteTracking
        }
    }
];
