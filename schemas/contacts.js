const Joi = require("joi");

const addContactSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.base": `name should be a type of text`,
    "any.required": `missing required name field`,
  }),
  email: Joi.string().email().required().messages({
    "string.email": `email must be a valid email`,
    "any.required": `missing required email field`,
  }),
  phone: Joi.string()
    .pattern(/^[0-9()-]+$/)
    .required()
    .messages({
      "string.pattern.base": `phone must contain only numbers, - and ( )`,
      "any.required": `missing required phone field`,
    }),
});

module.exports = addContactSchema;
