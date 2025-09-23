import express from "express";
import httpStatus from "http-status";

import { Notebook } from "./models.js";
import mongoose from "mongoose";

const notebookRoutes = express.Router();

// POST /api/notebooks
// notebookRoutes.post("/", async (req, res) => {
//   try {
//     const { name, description } = req.body;
//     if (!name) {
//       return res
//         .status(httpStatus.BAD_REQUEST)
//         .json({ message: "name is required!!" });
//     }

//     const notebook = new Notebook({ name, description });
//     await notebook.save();
//     res.status(httpStatus.CREATED).json({ data: notebook });
//   } catch (error) {
//     res
//       .status(httpStatus.INTERNAL_SERVER_ERROR)
//       .json({ message: error.message });
//   }
// });

const validateId = (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(httpStatus.NOT_FOUND)
      .json({ error: "Notebook not found" });
  }

  next();
};

notebookRoutes.post("/", async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ message: "name is required!!" });
    }

    const notebook = await Notebook.create({ name, description });

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
notebookRoutes.get("/:id", validateId, async (req, res) => {
  try {
    const { id } = req.params;
    const notebook = await Notebook.findById(id);

    if (!notebook) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ error: "Notebook not found" });
    }

    res.status(httpStatus.OK).json({ data: notebook });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
});

// PUT /api/notebooks/:id
notebookRoutes.put("/:id", validateId, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const updatedNotebook = await Notebook.findByIdAndUpdate(
      id,
      { name, description },
      { new: true, runValidators: true }
    );

    if (!updatedNotebook) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ error: "Notebook not found" });
    }

    res.status(httpStatus.OK).json({ data: updatedNotebook });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
});

// DELETE /api/notebooks/:id
notebookRoutes.delete("/:id", validateId, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedNotebook = await Notebook.findByIdAndDelete(id);

    if (!deletedNotebook) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ error: "Notebook not found" });
    }

    res.status(httpStatus.OK).json({ message: "Notebook deleted" });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
});

export { notebookRoutes };
