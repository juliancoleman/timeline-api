const Joi = require("joi");

const validator = Joi.object().keys({
  email_address: Joi.string().email(),
  role: Joi.string().valid([
    "Student",
    "Parent",
    "Leader",
    "Executive",
    "Admin",
  ]).required(),
}).unknown(false);

module.exports = validator;
