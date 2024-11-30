const { storePrediction } = require('../services/predictionService');
const { predictionSchema } = require('../validators');

exports.postPrediction = async (request, h) => {
    try {
        const { error } = predictionSchema.validate(request.payload);

        if (error) {
            throw new Error(error);
        }

        const res = await storePrediction(request.payload);

        return h.response({ message:res.message }).code(200);
    } catch (err) {
        return h.response({ error: err.message }).code(400);
    }
};

// eslint-disable-next-line no-unused-vars
exports.getPredictions = async (request, h) => {
};
