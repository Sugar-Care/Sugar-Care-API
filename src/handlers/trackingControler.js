const { storeTracking, retrieveTracking, terminateTracking } = require("../services/trackingService");

exports.postTracking = async (request, h) => {
    try {
        const res = await storeTracking(request.payload,request.params);

        return h.response({ message:res.message }).code(200);
    } catch (err) {
        return h.response({ error: err.message }).code(400);
    }
};

exports.getTracking = async (request, h) => {
    try {
        const res = await retrieveTracking(request.params);

        return h.response({ message:res.message,tracking:res.tracking }).code(200);
    } catch (err) {
        return h.response({ error: err.message }).code(400);
    }
};

exports.deleteTracking = async (request, h) => {
    try {
        const res = await terminateTracking(request.params);

        return h.response({ message:res.message }).code(200);
    } catch (err) {
        return h.response({ error: err.message }).code(400);
    }
};
