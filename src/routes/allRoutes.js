const { predictionRoutes } = require("./predictionRoute.js");
const { reqLogRoutes } = require("./reg-logRoute");

const routes = [
    ...reqLogRoutes,
    ...predictionRoutes
];

module.exports = routes;