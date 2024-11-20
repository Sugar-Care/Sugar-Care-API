require('dotenv').config();
const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');
const routes = require('./routes/allRoutes');
const { firestore } = require('./firestore');

const usersCollection = firestore.collection('users');

const init = async () => {
    const server = Hapi.server({
        port: 5000,
        host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
        routes: {
            cors: {
              origin: ['*'],
            },
          },
    });
 
    server.route(routes);
    
    await server.register(Jwt);
    server.auth.strategy('jwt', 'jwt', {
      keys: process.env.JWT_SECRET,
      verify: {
        aud: false,
        iss: false,
        sub: false,
        nbf: true,
        exp: true,
        maxAgeSec: 86400,
        timeSkewSec: 15
      },
      // eslint-disable-next-line no-unused-vars
      validate: async (artifacts, request, h) => {
        const user = await usersCollection.doc(artifacts.decoded.payload.email).get();
        if (!user) {
          return { isValid: false };
        }
        return { isValid: true, credentials: { user } };
      }
    });
    server.auth.default('jwt');

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();