const asyncHandler = require("express-async-handler");
const CoffeeModel = require("../models/coffeeModels");
const CoffeePostModel = require("../models/coffeePostModel");

const getData = asyncHandler(async (req, res) => {
  const data = await CoffeeModel.find();
  res.status(200).json(data);
});
const getDataPosts = asyncHandler(async (req, res) => {
  const data = await CoffeePostModel.find();
  res.status(200).json(data);
});

const createData = asyncHandler(async (req, res) => {
  const data = await CoffeePostModel.create(req.body);
  res.status(201).json(data);
});

const updateData = asyncHandler(async (req, res) => {
  const id = req.params.id;
  res
    .status(201)
    .json({ message: `CRUD Put Request is Successful for id: ${id}.` });
});

const deleteData = asyncHandler(async (req, res) => {
  const id = req.params.id;
  res
    .status(200)
    .json({ message: `CRUD Delete Request is Successful for id: ${id}.` });
});

module.exports = { getData, createData, updateData, deleteData , getDataPosts};
