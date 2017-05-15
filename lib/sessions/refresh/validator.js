const Joi = require("joi");

const Validator = Joi.object().keys({
  token: Joi.string()
    .regex(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/, "JWT")
    .required(),
}).unknown(false);

module.exports = Validator;
