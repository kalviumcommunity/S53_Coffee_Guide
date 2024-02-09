const asyncHandler = require("express-async-handler");

const getData = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "CRUD Get Request is Successful." });
});

const createData = asyncHandler(async (req, res) => {
  res.status(201).json({ message: "CRUD Post Request is Successful." });
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

module.exports = { getData, createData, updateData, deleteData };
