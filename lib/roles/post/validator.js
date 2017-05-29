const Joi = require("joi");

const validator = Joi.object().keys({
  email_address: Joi.string().email(),
  role: Joi.string().valid([
    "Student",
    "Parent",
    "Small Group Leader",
    "Campus Leader",
    "Admin",
  ]).required(),
}).unknown(false);

module.exports = validator;
