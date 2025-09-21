const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.json({ message: "hello from notebook " });
});

app.listen(3000, () => {
  console.log("Notebook is listening on part 3000");
});
