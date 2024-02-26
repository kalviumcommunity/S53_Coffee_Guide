const asyncHandler = require("express-async-handler");
const CoffeeModel = require("../models/coffeeModels");
const CoffeePostModel = require("../models/coffeePostModel");
const { coffeePostValidator } = require("../validators/coffeeValidator");

const getData = asyncHandler(async (req, res) => {
  const data = await CoffeeModel.find();
  res.status(200).json(data);
});

const getDataPosts = asyncHandler(async (req, res) => {
  const data = await CoffeePostModel.find();
  res.status(200).json(data);
});

const getDataById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const dataID = await CoffeePostModel.findById({ _id: id });
  res.status(200).json(dataID);
});

const createData = asyncHandler(async (req, res) => {
  const { error, value } = coffeePostValidator(req.body);
  if (error) {
    res.send(error.details);
  }
  const data = await CoffeePostModel.create(value);
  res.status(201).json(data);
});

const updateData = asyncHandler(async (req, res) => {
  const { error, value } = coffeePostValidator(req.body);
  if (error) {
    res.send(error.details);
  }
  const id = req.params.id;
  const dataUpdateID = await CoffeePostModel.findByIdAndUpdate(
    { _id: id },
    value
  );
  res.status(200).json(dataUpdateID);
});

const deleteData = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const deleteData = await CoffeePostModel.findByIdAndDelete({ _id: id });
  res
    .status(200)
    .json({ message: `CRUD Delete Request is Successful for id: ${id}.` });
});

module.exports = {
  getData,
  createData,
  updateData,
  deleteData,
  getDataPosts,
  getDataById,
};
