const { predictionRoutes } = require("./predictionRoute.js");
const { UserRoute } = require("./UserRoute.js");

const routes = [
    ...UserRoute,
    ...predictionRoutes
];

module.exports = routes;