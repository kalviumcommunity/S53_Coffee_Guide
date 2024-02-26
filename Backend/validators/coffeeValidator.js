const joi = require("joi");

const validator = (schema) => (payload) => {
  return schema.validate(payload, { abortEarly: false });
};

const coffeeSchema = joi.object({
  user_name: joi.string().required(),
  coffee_name: joi.string().required(),
  description: joi.string().required(),
  image_link: joi.string().required(),
  ingredients: joi.object({
    ing_1: joi.string(),
    ing_2: joi.string(),
    ing_3: joi.string(),
    ing_4: joi.string(),
    ing_5: joi.string(),
  }),
  recipe: joi.object({
    step_1: joi.string(),
    step_2: joi.string(),
    step_3: joi.string(),
    step_4: joi.string(),
    step_5: joi.string(),
  }),
});

exports.coffeePostValidator = validator(coffeeSchema)
