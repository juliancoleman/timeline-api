const Joi = require("joi");

const validator = Joi.object().keys({
  type: Joi.string().valid("k-2", "3-6").required(),
  campus: Joi.string().valid("North", "Fig Garden", "Southeast").required(),
}).unknown(false);

module.exports = validator;
