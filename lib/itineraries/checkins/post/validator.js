const Joi = require("joi");

const validator = Joi.object().keys({
  role_camp_id: Joi.number().integer().positive(),
  barcode_number: Joi
    .number()
    .integer()
    .positive()
    .min(8)
    .required(),
});

module.exports = validator;
