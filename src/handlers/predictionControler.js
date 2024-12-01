const { storePrediction } = require('../services/predictionService');
const { postPredictionSchema } = require('../validators');

exports.postPrediction = async (request, h) => {
    try {
        const { error } = postPredictionSchema.validate(request.payload);

        if (error) {
            throw new Error(error);
        }

        const res = await storePrediction(request.payload,request.params);

        return h.response({ message:res.message }).code(200);
    } catch (err) {
        return h.response({ error: err.message }).code(400);
    }
};

// eslint-disable-next-line no-unused-vars
exports.getPredictions = async (request, h) => {
};
