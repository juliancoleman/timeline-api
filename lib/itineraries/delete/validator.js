const Joi = require("joi");

const validator = Joi.object().keys({
  itineraryId: Joi.number().integer().positive().required(),
}).unknown(false);

module.exports = validator;
