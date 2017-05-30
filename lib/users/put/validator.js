const Joi = require("joi");

const validator = Joi.object().min(1).keys({
  first_name: Joi.string(),
  last_name: Joi.string(),
  campus: Joi.string().valid("North", "Fig Garden", "Southeast"),
  home_address: Joi.string().allow(["", null]),
  email_address: Joi.string().email(),
  phone_number: Joi.string().allow(["", null]),
  emergency_contact_name: Joi.string().allow(["", null]),
  emergency_contact_number: Joi.string().allow(["", null]),
  emergency_contact_relationship: Joi.string().allow(["", null]),
  allergies: Joi.string().allow(["", null]),
  barcode_number: Joi.number().integer().positive(),
}).unknown(false);

module.exports = validator;
