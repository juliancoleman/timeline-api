const Joi = require("joi");

const validator = Joi.object().keys({
  enrolled: Joi.boolean().default(true),
}).unknown(false);

module.exports = validator;
