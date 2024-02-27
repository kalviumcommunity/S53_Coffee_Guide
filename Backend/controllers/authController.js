const asyncHandler = require("express-async-handler");
const userModel = require("../models/userModel");
const { userValidator } = require("../validators/userValidator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const signUp = asyncHandler(async (req, res) => {
  const { user_name, password } = req.body;
  const existingUser = await userModel.findOne({ user_name: user_name });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists!" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const { error, value } = userValidator({
    user_name,
    password: hashedPassword,
  });
  if (error) {
    return res.status(400).json({ details: error.details });
  }
  const newUser = await userModel.create(value);
  res.status(201).json(newUser);
});

const logIn = asyncHandler(async (req, res) => {
  const { user_name, password } = req.body;

  const { error } = userValidator({ user_name, password });
  if (error) {
    return res
      .status(400)
      .json({ error: "Validation failed", details: error.details });
  }

  const user = await userModel.findOne({ user_name: user_name });
  if (!user) {
    return res.json({ message: "User doesn't exist!" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.json({ message: "Username or Password is incorrect!" });
  }

  const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
  res.status(200).json({ user_name, token, userID: user._id, isPasswordValid });
});

module.exports = { signUp, logIn };
