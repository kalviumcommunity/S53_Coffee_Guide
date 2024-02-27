const joi = require("joi");

const validator = (schema) => (payload) => {
  return schema.validate(payload, { abortEarly: false });
};

const userSchema = joi.object({
    user_name: joi.string().required(),
    password: joi.string().required()
})

exports.userValidator = validator(userSchema)