const Joi = require('@hapi/joi');

const userIdSchemaDef = Joi.number();
const userNameSchema = Joi.string().min(1);
const userMiddleNameSchema = Joi.string().min(1);
const userLastNameSchema = Joi.string().min(1);

const userIdSchema = Joi.object({
    userId: userIdSchemaDef.required(),
});

const createUserSchema = Joi.object({
    id: userIdSchemaDef.required(),
    name: userNameSchema.required(),
    middleName: userMiddleNameSchema,
    lastName: userLastNameSchema.required()
});

const updateUserSchema = Joi.object({
    id: userIdSchemaDef.required(),
    name: userNameSchema.required(),
    middleName: userMiddleNameSchema,
    lastName: userLastNameSchema.required()
});

module.exports = { userIdSchema, createUserSchema, updateUserSchema };