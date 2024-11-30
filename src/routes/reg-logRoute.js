const userHandler = require('../handlers/reg-logControler');
const { registerSchema, loginSchema } = require('../models');

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
            handler: userHandler.login
        }
    },
];
