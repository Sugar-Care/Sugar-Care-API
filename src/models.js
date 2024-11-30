const Joi = require('joi');

exports.registerSchema = Joi.object({
    name: Joi.string().required().description('Username for the user').example('john_doe'),
    email: Joi.string().email().required().description('Email address of the user').example('john_doe@example.com'),
    password: Joi.string().min(6).required().description('Password for the user').example('secret123')
});

exports.loginSchema = Joi.object({
    email: Joi.string().email().required().description('Email address of the user').example('john_doe@example.com'),
    password: Joi.string().min(6).required().description('Password for the user').example('secret123')
});