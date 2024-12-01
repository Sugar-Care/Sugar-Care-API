const { storePrediction, retrievePredictions } = require('../services/predictionService');

exports.postPrediction = async (request, h) => {
    try {
        const res = await storePrediction(request.payload,request.params);

        return h.response({ message:res.message }).code(200);
    } catch (err) {
        return h.response({ error: err.message }).code(400);
    }
};

// eslint-disable-next-line no-unused-vars
exports.getPredictions = async (request, h) => {
    try {
        const res = await retrievePredictions(request.params);

        return h.response({ message:res.message,predictions:res.predictions }).code(200);
    } catch (err) {
        return h.response({ error: err.message }).code(400);
    }
};
