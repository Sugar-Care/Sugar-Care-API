const { predictRoutes } = require("./apiPredictRoute.js");
const { predictionRoutes } = require("./predictionRoute.js");
const { reqLogRoutes } = require("./reg-logRoute");

const routes = [
    ...reqLogRoutes,
    ...predictionRoutes,
    ...predictRoutes
];

module.exports = routes;