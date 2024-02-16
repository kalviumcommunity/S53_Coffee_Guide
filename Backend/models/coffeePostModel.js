const mongoose = require("mongoose");

const ingredientsSchema = mongoose.Schema({
  ing_1: String,
  ing_2: String,
  ing_3: String,
  ing_4: String,
  ing_5: String,
});

const recipeSchema = mongoose.Schema({
  step_1: String,
  step_2: String,
  step_3: String,
  step_4: String,
  step_5: String,
});

const coffeePostSchema = mongoose.Schema(
  {
    user_name:{ type: String, required: [true, "Please add your name"] },
    coffee_name: { type: String, required: [true, "Please add name to your coffee"] },
    description: {
      type: String,
      required: [true, "Please add some description"],
    },
    image_link: { type: String, required: [true, "Please add image url"] },
    ingredients: {
      type: ingredientsSchema,
      required: [true, "Please add the ingredients"],
    },
    recipe: {
      type: recipeSchema,
      required: [true, "Please add the steps to the recipe"],
    },
  },
  { timestamps: true }
);

const CoffeePostModel = mongoose.model("CoffeePost", coffeePostSchema);

module.exports = CoffeePostModel;
