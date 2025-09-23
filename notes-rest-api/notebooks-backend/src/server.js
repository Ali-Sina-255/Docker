const express = require("express");
const mongoose = require("mongoose");
const { notebookRoutes } = require("./routes");
const bodyParser = require("body-parser");
const port = process.env.PORT;
const dbUrl = process.env.DB_URL;
const app = express();

app.use(bodyParser.json());
app.use("/api/notebooks", notebookRoutes);

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
