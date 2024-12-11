const { predictRoutes } = require("./apiPredictRoute.js");
const { predictionRoutes } = require("./predictionRoute.js");
const { reqLogRoutes } = require("./reg-logRoute");
const { trackingRoutes } = require("./trackingRoute.js");

const routes = [
    ...reqLogRoutes,
    ...predictionRoutes,
    ...predictRoutes,
    ...trackingRoutes,
];

module.exports = routes;