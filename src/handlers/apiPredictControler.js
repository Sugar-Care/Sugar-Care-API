const axios = require("axios");

exports.postPredict = async (request, h) => {
    try {
        const res = await axios.post("https://sugar-care-api-predict-510866273403.asia-southeast2.run.app/predictions/"+request.params.userId, { input:request.payload.input })
        console.log(res)
        
        return h.response({ result: res.data.result }).code(200);
    } catch (err) {
        return h.response({ error: err.message }).code(400);
    }
};