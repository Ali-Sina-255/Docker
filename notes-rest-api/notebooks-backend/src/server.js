const express = require("express");
const mongoose = require("mongoose");

const port = process.env.PORT;
const dbUrl = process.env.DB_URL;

const app = express();

app.get("/api/notebooks", (req, res) => {
  res.json({
    message: "Hello from Notebook — it is working with watch mode.!",
  });
});

mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
    app.listen(port, () => {
      console.log(`✅ Notebook server is listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("❌ Failed to connect to MongoDB:");
    console.error(error);
  });
