const Joi = require("joi");

const validator = Joi.object().min(1).keys({
  first_name: Joi.string(),
  last_name: Joi.string(),
  campus: Joi.string().valid("North", "Fig Garden", "Southeast"),
  home_address: Joi.string(),
  email_address: Joi.string().email(),
  phone_number: Joi.string().allow(["", null]),
  emergency_contact_name: Joi.string(),
  emergency_contact_number: Joi.string(),
  emergency_contact_relationship: Joi.string(),
  allergies: Joi.string(),
}).unknown(false);

module.exports = validator;
