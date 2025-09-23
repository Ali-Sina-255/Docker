import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
const port = process.env.PORT;
const dbUrl = process.env.DB_URL;

import { noteRoutes } from "./routes/routes.js";
const app = express();

app.use(bodyParser.json());

app.use("/api/notes", noteRoutes);

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
