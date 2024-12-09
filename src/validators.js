const Joi = require('joi');
// Register
exports.registerSchema = Joi.object({
    name: Joi.string().required().description('Username for the user').example('john_doe'),
    email: Joi.string().email().required().description('Email address of the user').example('john_doe@example.com'),
    password: Joi.string().min(6).required().description('Password for the user').example('secret123')
});
exports.registerResponseSchema = Joi.object({
    message: Joi.string()
}).label('Result');

// Login
exports.loginSchema = Joi.object({
    email: Joi.string().email().required().description('Email address of the user').example('john_doe@example.com'),
    password: Joi.string().min(6).required().description('Password for the user').example('secret123')
});
exports.loginResponseSchema = Joi.object({
    error: Joi.string(),
    message: Joi.string(),
    loginResult: Joi.object({
        userId: Joi.string(),
        name: Joi.string(),
        email: Joi.string(),
        token: Joi.string()
    })
}).label('Result');

//UpdateProfile
exports.profileSchema = Joi.object({
    name: Joi.string().optional().min(1).description('Name of the user').example('John Doe'),
    password: Joi.string().optional().min(6).description('New password for the user').example('newpassword123')
}).min(1).messages({
    'object.min': 'At least one field (name or password) must be provided'
});
exports.profileResponseSchema = Joi.object({
    message: Joi.string().required().description('API response message').example('User updated successfully!'),
    updatedFields: Joi.array().items(Joi.string()).optional().description('Fields that were updated')
}).label('Result');

// Post Prediction
exports.postPredictionSchema = Joi.object({
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
exports.postPredictionParamSchema = Joi.object({
    userId: Joi.string()
});
exports.postPredictionResponseSchema = Joi.object({
    message: Joi.string()
}).label('Result');

// Get Predictions
exports.getPredictionParamSchema = Joi.object({
    userId: Joi.string()
});
exports.getPredictionResponseSchema = Joi.object({
    message: Joi.string().example('Eh kok bisa'),
    predictions:Joi.array().items(Joi.object({
        predictId:Joi.string(),
        data:Joi.object({
            input:Joi.object({
                age:Joi.number().required(), 
                bloodGlucoseLevels:Joi.number().required(), 
                bloodPressure:Joi.number().required(), 
                weightGainDuringPregnancy:Joi.number().required(),
                waistCircumference:Joi.number().required(), 
                bmi:Joi.number().required(),
                insulinLevels:Joi.number().required(), 
                cholesterolLevels:Joi.number().required(),
                digestiveEnzymeLevels:Joi.number().required(),
                pulmonaryFunction:Joi.number().required()
            }).required(),
            prediction:Joi.object({
                label:Joi.string().required(),
                probability:Joi.number().required()
            }).required(),
            createdAt:Joi.date().iso().required()
        })})).example([{
            predictId:"IniIdYangTidakBisaDiTiru",
            data:{ 
            input: { 
                age: 44, 
                bloodGlucoseLevels: 168, 
                bloodPressure: 124, 
                weightGainDuringPregnancy: 18, 
                waistCircumference: 50, 
                bmi: 38, insulinLevels: 40, 
                cholesterolLevels: 201, 
                digestiveEnzymeLevels: 56, 
                pulmonaryFunction: 76 
            }, 
            prediction: { 
                label: 'Wolcott-Rallison Syndrome', 
                probability: 0.37721750140190125 
            }, 
            createdAt: '2024-12-01T05:06:26.654Z'
        }}])
}).label('Result');

// Delete Predictions
exports.deletePredictionParamSchema = Joi.object({
    userId: Joi.string(),
    predictId: Joi.string()
});
exports.deletePredictionResponseSchema = Joi.object({
    message: Joi.string()
}).label('Result');
