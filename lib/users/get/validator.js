const Joi = require("joi");

const validator = Joi.object().keys({
  roles: Joi.alternatives().try(
    Joi.array().items(Joi.string()),
    Joi.string() // eslint-disable-line
  ),
  email_address: Joi.string().email(),
  enrolled: Joi.boolean().default(false),
  pageSize: Joi.number().integer().positive().default(10),
  page: Joi.number().integer().positive().default(1),
  sort: Joi.string().valid([
    "first_name",
  ]).default("first_name"),
}).unknown(false);

module.exports = validator;
