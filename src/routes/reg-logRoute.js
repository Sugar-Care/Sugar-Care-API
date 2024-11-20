const userHandler = require('../handlers/reg-logControler');

exports.reqLogRoutes = [
    {
        method: 'POST',
        path: '/register',
        options: {
            auth: false
        },
        handler: userHandler.register, 
    },
    {
        method: 'POST',
        path: '/login',
        options: {
            auth: false
        },
        handler: userHandler.login,
    },
];