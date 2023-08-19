const Joi = require("joi");
const contacts = require("../models/contacts");
const { HttpError, ctrlWrapper } = require("../helpers");

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

const getAllContacts = async (req, res, next) => {
  const result = await contacts.listContacts();
  res.json(result);
};

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.getContactById(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const addContact = async (req, res, next) => {
  const { error } = addContactSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({ message: "Contact deleted" });
};

const updateContact = async (req, res, next) => {
  const { error } = addContactSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const { contactId } = req.params;
  const result = await contacts.updateContact(contactId, req.body);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
};
