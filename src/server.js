/* eslint-disable no-unused-vars */
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
        authLimit: 1,
        authToken: 'authorization',
        userLimit: 1667, // Number of requests per user per period
        userCache: {
          expiresIn: 86400000, // Time period in milliseconds
          segment: 'hapi-rate-limit-user'
        },
        pathLimit: 60, // Number of requests per path per period
        pathCache: {
          expiresIn: 3600000, // Time period in milliseconds
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
      pathPrefixSize: 1,
      documentationPath: '/suca-docs',
      sortEndpoints:'ordered',
      sortTags : 'unsorted',
      grouping:'tags',
      tags: [
        {
          name: 'Predict',
          description: 'Predict API',
          externalDocs: {
            description: 'Base url for api',
            url: 'https://sugar-care-api-predict-510866273403.asia-southeast2.run.app'
          }
        },
        {
            name: 'Prediction',
            description: 'Predictions Collection'
        },
        {
            name: 'Profile',
            description: 'Users Collection',
        }
    ],
      debug:true
    };
    await server.register([
      Inert,
      Vision,
      { plugin: HapiSwagger, options: swaggerOptions }
    ]);

    server.route(routes);
    server.route([
      {
        method:'GET',
        path:'/',
        options:{
          auth:false,
          handler:(request, h) => {
            return `Halo ini api database dari Sugar Care App, lihat <a href="${server.info.uri+"/suca-docs"}">dokumentasi</a>`
          }
        }
      }
    ])
  
    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
