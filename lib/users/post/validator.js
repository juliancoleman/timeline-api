const Joi = require("joi");

const validator = Joi.object().keys({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  campus: Joi.string().valid("North", "Fig Garden", "Southeast").required(),
  home_address: Joi.string().optional(),
  email_address: Joi.string().email().required(),
  phone_number: Joi.string().optional(),
  emergency_contact_name: Joi.string().optional(),
  emergency_contact_number: Joi.string().optional(),
  emergency_contact_relationship: Joi.string().optional(),
  allergies: Joi.string().optional(),
  barcode_number: Joi.number().integer().positive(),
  password: Joi.string().min(8).required(),
  confirm_password: Joi.any()
    .valid(Joi.ref("password"))
    .required()
    .options({ language: { any: { allowOnly: "must match password" } } })
    .strip(),
  role: Joi.array().items(Joi.string().valid("Parent", "Student", "Small Group Leader", "Campus Leader")),
}).unknown(false);

module.exports = validator;
