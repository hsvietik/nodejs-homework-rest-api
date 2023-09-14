const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");
const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const UserSchema = new Schema(
  {
    name: { type: String, required: [true, "Set name for contact"] },
    password: {
      type: String,
      minlength: [4, "Password should be at least 4 characters long"],
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      match: [emailRegexp, "Email is not valid"],
      unique: true,
      required: [true, "Email is required"],
    },
    subscription: {
      type: String,
      enum: {
        values: ["starter", "pro", "business"],
        message: "{VALUE} is not supported",
      },
      default: "starter",
    },
    avatarURL: { type: String, required: [true, "Avatar is required"] },
    token: { type: String, default: "" },
    verify: { type: Boolean, default: false },
    verificationToken: {
      type: String,
      default: "",
    },
  },
  { versionKey: false, timestamps: true }
);

UserSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.base": `name should be a type of text`,
    "any.required": `missing required name field`,
  }),
  email: Joi.string().pattern(emailRegexp, "email").required().messages({
    "any.required": "Email is required",
  }),
  password: Joi.string().min(4).required().messages({
    "any.required": "Set password for user",
  }),
  subscription: Joi.string().valid("starter", "pro", "business"),
});

const emailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp, "email").required().messages({
    "any.required": "Missing required field email",
  }),
});
const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp, "email").required().messages({
    "any.required": "Email is required",
  }),
  password: Joi.string().min(4).required().messages({
    "string.min": "Password should be at least 4 characters long",
    "any.required": "Set password for user",
  }),
});
const User = model("user", UserSchema);

module.exports = { User, registerSchema, loginSchema, emailSchema };
