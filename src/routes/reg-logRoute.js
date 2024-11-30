const userHandler = require('../handlers/reg-logControler');
const { registerSchema, loginSchema, registerResponseSchema, loginResponseSchema } = require('../validators');

exports.reqLogRoutes = [
    {
        method: 'POST',
        path: '/register',
        options: {
            auth: false,
            description: 'Register',
            notes: 'Register User Account',
            tags: ['api'],
            validate: {
                payload: registerSchema
            },
            plugins: {
                'hapi-swagger': {
                    responses: {
                        200: {
                            description: 'Berhasil',
                            schema: registerResponseSchema
                        }
                    }
                }
            },
            handler: userHandler.register
        }
    },
    {
        method: 'POST',
        path: '/login',
        options: {
            auth: false,
            description: 'Login',
            notes: 'Login User Account',
            tags: ['api'],
            validate: {
                payload: loginSchema
            },
            plugins: {
                'hapi-swagger': {
                    responses: {
                        200: {
                            description: 'Berhasil',
                            schema: loginResponseSchema
                        }
                    }
                }
            },
            handler: userHandler.login
        }
    },
];
