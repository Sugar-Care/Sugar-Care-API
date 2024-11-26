require('dotenv').config();
const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');
const hapiRateLimit = require('hapi-rate-limit');
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

    server.register({
      plugin: hapiRateLimit,
      options: {
        enabled: true, // Enable rate limiting
        userLimit: 300, // Number of requests per user per period
        userCache: {
          expiresIn: 600000, // Time period in milliseconds
          segment: 'hapi-rate-limit-user'
        },
        pathLimit: 2, // Number of requests per path per period
        pathCache: {
          expiresIn: 6000, // Time period in milliseconds
          segment: 'hapi-rate-limit-path'
        },
        headers: true, // Include headers in responses
        ipWhitelist: [], // Array of IPs to whitelist
        trustProxy: false, // Whether to honor the X-Forwarded-For header
        getIpFromProxyHeader: undefined, // Function to extract remote address from X-Forwarded-For header
        limitExceededResponse: (request, h) => { return h.response({ message: 'Rate limit exceeded' }).code(429).takeover();
        }
      }
    });

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

    server.route(routes);

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();