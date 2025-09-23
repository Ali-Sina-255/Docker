// src/routes.js

import express from "express";
import httpStatus from "http-status";

import { Notebook } from "./models.js";

const notebookRoutes = express.Router();

// POST /api/notebooks
notebookRoutes.post("/", async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ message: "name is required!!" });
    }

    const notebook = new Notebook({ name, description });
    await notebook.save();
    res.status(httpStatus.CREATED).json({ data: notebook });
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
});

// GET /api/notebooks
notebookRoutes.get("/", async (req, res) => {
  try {
    const notebooks = await Notebook.find();
    res.status(httpStatus.OK).json({ data: notebooks });
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
});

// GET /api/notebooks/:id
notebookRoutes.get("/:id", async (req, res) => {
  try {
    const notebook = await Notebook.findById(req.params.id);
    if (!notebook) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "Notebook not found" });
    }
    res.status(httpStatus.OK).json({ data: notebook });
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
});

// PUT /api/notebooks/:id
notebookRoutes.put("/:id", async (req, res) => {
  try {
    const { name, description } = req.body;
    const notebook = await Notebook.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true }
    );

    if (!notebook) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "Notebook not found" });
    }

    res.status(httpStatus.OK).json({ data: notebook });
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
});

// DELETE /api/notebooks/:id
notebookRoutes.delete("/:id", async (req, res) => {
  try {
    const notebook = await Notebook.findByIdAndDelete(req.params.id);
    if (!notebook) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "Notebook not found" });
    }
    res.status(httpStatus.OK).json({ message: "Notebook deleted" });
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
});

// ✅ ESM export
export { notebookRoutes };
