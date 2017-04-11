const Joi = require("joi");

const validator = Joi.object().keys({
  camp_id: Joi.number().integer().required(),
  role: Joi.string().valid(["Student", "Leader"]).required(),
}).unknown(false);

module.exports = validator;
