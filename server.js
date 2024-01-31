const express = require("express");
const app = express();


app.get("/ping", (req, res) => {
  res.send("This is the '/ping' route");
});

app.get("/", (req, res) => {
  res.send("This is the '/' route");
});

app.listen(4000, () => {
  console.log(`🚀 server running on PORT: 4000`);
});
