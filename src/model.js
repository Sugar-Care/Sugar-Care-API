const Joi = require('@hapi/joi');

//predict
exports.registerSchema = Joi.object({
    Age:Joi.number().required(), 
    bloodGlucoseLevels:Joi.number().required(), 
    bloodPressure:Joi.number().required(), 
    weightGainDuringPregnancy:Joi.number().required(),
    waistCircumference:Joi.number().required(), 
    BMI:Joi.number().required(),
    insulinLevels:Joi.number().required(), 
    cholesterolLevels:Joi.number().required(),
    digestiveEnzymeLevels:Joi.number().required(),
    pulmonaryFunction:Joi.number().required()
});
