const { registerSchema, loginSchema } = require('../validators');
const userService = require('../services/userService');

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

const editProfile = async (request, h) => {
    try {
        const { id } = request.params; // ID pengguna dari URL
        const { name, email, password } = request.payload;

        if (!name && !email && !password) {
            throw new Error('At least one field (name, email, or password) must be provided');
        }

        const result = await userService.editProfile(id, { name, email, password });

        return h.response(result).code(200);
    } catch (err) {
        return h.response({ error: err.message }).code(400);
    }
};

module.exports = { register, login, editProfile };

