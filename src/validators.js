const Joi = require('joi');

exports.registerSchema = Joi.object({
    name: Joi.string().required().description('Username for the user').example('john_doe'),
    email: Joi.string().email().required().description('Email address of the user').example('john_doe@example.com'),
    password: Joi.string().min(6).required().description('Password for the user').example('secret123')
});
exports.registerResponseSchema = Joi.object({
    message: Joi.string()
}).label('Result');

exports.loginSchema = Joi.object({
    email: Joi.string().email().required().description('Email address of the user').example('john_doe@example.com'),
    password: Joi.string().min(6).required().description('Password for the user').example('secret123')
});
exports.loginResponseSchema = Joi.object({
    error: Joi.string(),
    message: Joi.string(),
    loginResult: Joi.object({
        name: Joi.string(),
        email: Joi.string(),
        token: Joi.string()
    })
}).label('Result');

exports.predictionSchema = Joi.object({
    email:Joi.string().email().required().description('Email address of the user').example('john_doe@example.com'),
    input:Joi.object({
        age:Joi.number().required().description('Age').example('44'), 
        bloodGlucoseLevels:Joi.number().required().description('Blood Glucose Levels').example('168'), 
        bloodPressure:Joi.number().required().description('Blood Pressure').example('124'), 
        weightGainDuringPregnancy:Joi.number().required().description('Weight Gain During Pregnancy').example('18'),
        waistCircumference:Joi.number().required().description('Waist Circumference').example('50'), 
        bmi:Joi.number().required().description('BMI').example('38'),
        insulinLevels:Joi.number().required().description('Insulin Levels').example('40'), 
        cholesterolLevels:Joi.number().required().description('Cholesterol Levels').example('201'),
        digestiveEnzymeLevels:Joi.number().required().description('Digestive Enzyme Levels').example('56'),
        pulmonaryFunction:Joi.number().required().description('Pulmonary Function').example('76')
    }),
    prediction:Joi.object({
        label:Joi.string().required().description('Prediction result').example('Steroid-Induced Diabetes'),
        probability:Joi.number().required().description('Probability of prediction').example('99.9')
    })
});
exports.predictionResponseSchema = Joi.object({
    message: Joi.string()
}).label('Result');