const Joi = require("joi");

const validator = Joi.object().keys({
  roleId: Joi.number().integer().required(),
}).unknown(false);

module.exports = validator;
