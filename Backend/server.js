const express = require("express");
const app = express();
const connectDB = require("./config/dbConnection");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 5001;

app.use(express.json());

connectDB();

app.get("/home", async (req, res) => {
  try {
    // Check if the mongoose connection is ready
    const isConnected =  mongoose.connection.readyState === 1;
    if (isConnected) {
      res.send("Database connection status: Connected");
    } else {
      res.send("Database connection status: Disconnected");
    }
  } catch (error) {
    console.error("Error checking database connection:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on PORT: ${PORT}`);
});
