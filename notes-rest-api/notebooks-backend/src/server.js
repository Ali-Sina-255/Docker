const express = require("express");

const mongoose = require("mongoose");

const app = express();

app.get("/", (req, res) => {
  res.json({ message: "hello from Notebook is working watch " });
});

const port = process.env.PORT;

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("mongo connected successfully");
    app.listen(port, () => {
      console.log(`Notebook is listening on part ${port}`);
    });
  })
  .catch((error) => {
    console.log("something is wrong!");
    console.log(error);
  });
