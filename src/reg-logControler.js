const Joi = require('@hapi/joi');
const userService = require('./userService');

const registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

const register = async (request, h) => {
    try {
        const { error } = registerSchema.validate(request.payload);
        if (error) {
            throw new Error(error.details[0].message);
        }
        const { name, email, password } = request.payload;
        const result = await userService.register(name, email, password);
        return h.response(result).code(201);
    } catch (err) {
        return h.response({ error: err.message }).code(400);
    }
};

const login = async (request, h) => {
    try {
        const { error } = loginSchema.validate(request.payload);
        if (error) {
            throw new Error(error.details[0].message);
        }
        const { email, password } = request.payload;
        const result = await userService.login(email, password);
        return h.response(result).code(200);
    } catch (err) {
        return h.response({ error: err.message }).code(400);
    }
};

module.exports = {register,login};
