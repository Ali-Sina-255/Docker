const express = require("express");
const notebookRoutes = express.Router();

notebookRoutes.get("/", (req, res) => {
  res.json({ message: "Hello from notebook" });
});

module.exports = { notebookRoutes };
     