const Joi = require("joi");

const validator = Joi.object().keys({
  camp_id: Joi.number().integer().positive().required(),
  location: Joi.string().required(),
  event_date: Joi.date().min("now").required(),
}).unknown(false);

module.exports = validator;
