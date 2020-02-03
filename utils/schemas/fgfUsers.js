const Joi = require('@hapi/joi');

const createFgfUserSchema = Joi.object({
    id: Joi.number().required(),
    email: Joi.string.email().required(),
    password: Joi.string().min(1).required(),
    role: Joi.string().regex(/^(admin|user)$/i).required()
});

module.exports = createFgfUserSchema;