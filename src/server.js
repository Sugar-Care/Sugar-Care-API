require('dotenv').config();
const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('../package.json');
const Jwt = require('@hapi/jwt');
const hapiRateLimit = require('hapi-rate-limit');
const routes = require('./routes/allRoutes');
const { firestore } = require('./firestore');

const usersCollection = firestore.collection('users');

const init = async () => {
    const server = Hapi.server({
        port: process.env.PORT || 5000,
        host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0'
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

    const swaggerOptions = {
      info: {
          title: 'SUCA API Documentation',
          version: Pack.version
      },
      basePath: '/suca-api',
      pathPrefixSize: 1,
      documentationPath: '/suca-docs',
      sortEndpoints:'ordered',
      sortTags : 'unsorted',
      grouping:'tags',
      tags: [
        {
            name: 'prediction',
            description: 'Prediction Group',
            externalDocs: {
              description: 'Find out more about storage',
              url: 'http://example.org'
          }
        },
        {
            name: 'reglog',
            description: 'Reglog Group',
        },
    ],
      debug:true
    };
    await server.register([
      Inert,
      Vision,
      { plugin: HapiSwagger, options: swaggerOptions }
    ]);

    server.route(routes);
  
    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
