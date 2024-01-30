const express = require("express");
const app = express();
const port = 4000;

app.get("/ping", (req, res) => {
  res.send("This is the '/ping' route");
});

app.get("/", (req, res) => {
  res.send("This is the '/' route");
});

app.listen(port, () => {
  console.log(`🚀 server running on PORT: ${port}`);
});
