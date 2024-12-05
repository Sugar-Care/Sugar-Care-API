const userHandler = require('../handlers/reg-logControler');
const { registerSchema, loginSchema, registerResponseSchema, loginResponseSchema } = require('../validators');

exports.reqLogRoutes = [
    {
        method: 'POST',
        path: '/suca-api/register',
        options: {
            auth: false,
            description: 'Register',
            notes: 'Register User Account',
            tags: ['api','reglog'],
            validate: {
                payload: registerSchema
            },
            plugins: {
                'hapi-swagger': {
                    order:1,
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
        path: '/suca-api/login',
        options: {
            auth: false,
            description: 'Login',
            notes: 'Login User Account',
            tags: ['api','reglog'],
            validate: {
                payload: loginSchema
            },
            plugins: {
                'hapi-swagger': {
                    order:2,
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
    {
        method: 'PUT',
        path: '/suca-api/profile/{userId}',
        options: {
            auth: false,
            description: 'Edit Profile',
            notes: 'Update user profile information',
            tags: ['api', 'profile'],
            validate: {
                payload: profileSchema,
            },
            plugins: {
                'hapi-swagger': {
                    order: 3,
                    responses: {
                        200: {
                            description: 'Profile successfully updated',
                            schema: profileResponseSchema
                        }
                    }
                }
            },
            handler: userHandler.editProfile,
        }
    },
];
