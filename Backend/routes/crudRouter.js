const express = require("express");
const {
  getData,
  createData,
  updateData,
  deleteData,
  getDataPosts,
  getDataById,
} = require("../controllers/crudController");

const crudRouter = express.Router();

crudRouter.get("/", getData);
crudRouter.get("/posts", getDataPosts);
crudRouter.get("/:id", getDataById);
crudRouter.post("/", createData);
crudRouter.put("/:id", updateData);
crudRouter.delete("/:id", deleteData);

module.exports = crudRouter;
