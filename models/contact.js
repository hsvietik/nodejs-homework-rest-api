const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");

const ContactSchema = new Schema(
  {
    name: { type: String, required: [true, "Set name for contact"] },
    email: { type: String },
    phone: { type: String, match: /^[0-9 ()-]+$/ },
    favorite: { type: Boolean, default: false },
  },
  { versionKey: false, timestamps: true }
);
ContactSchema.post("save", handleMongooseError);

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
    .pattern(/^[0-9 ()-]+$/)
    .required()
    .messages({
      "string.pattern.base": `phone must contain only numbers, - and ( )`,
      "any.required": `missing required phone field`,
    }),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    "any.required": `missing field favorite`,
  }),
});

const Contact = model("contact", ContactSchema);

module.exports = { Contact, addContactSchema, updateFavoriteSchema };
