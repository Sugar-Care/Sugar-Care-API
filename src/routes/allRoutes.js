const { predictionRoutes } = require("./predictionRoute.js");
const { reqLogRoutes } = require("./UserRoute.js");

const routes = [
    ...reqLogRoutes,
    ...predictionRoutes
];

module.exports = routes;
