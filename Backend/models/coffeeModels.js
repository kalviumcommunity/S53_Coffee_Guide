const mongoose = require("mongoose");

const ingredientsSchema = new mongoose.Schema({
  ing_1: String,
  ing_2: String,
  ing_3: String,
});

const coffeeSchema = new mongoose.Schema({
  name: String,
  description: String,
  ingredients: ingredientsSchema,
  img_link: String,
  vid_link: String,
});

const CoffeeModel = mongoose.model("Coffee Varients", coffeeSchema);

module.exports = CoffeeModel;
