import express from "express";
import httpStatus from "http-status";
import { Note } from "../models/notes.model.js";
import mongoose from "mongoose";

const noteRoutes = express.Router();

const validateId = (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(httpStatus.NOT_FOUND).json({ error: "Note not found" });
  }

  next();
};

noteRoutes.post("/", async (req, res) => {
  try {
    const { name, content } = req.body;

    if (!name && !content) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ message: "name and content is required!!" });
    }

    const note = await Note.create({ name, content });

    res.status(httpStatus.CREATED).json({ data: note });
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
});

// GET /api/Notes
noteRoutes.get("/", async (req, res) => {
  try {
    const notes = await Note.find();
    res.status(httpStatus.OK).json({ data: notes });
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
});

// GET /api/Notes/:id
noteRoutes.get("/:id", validateId, async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findById(id);

    if (!note) {
      return res.status(httpStatus.NOT_FOUND).json({ error: "Note not found" });
    }

    res.status(httpStatus.OK).json({ data: note });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
});

// PUT /api/Notes/:id
noteRoutes.put("/:id", validateId, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, content } = req.body;

    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { name, content },
      { new: true, runValidators: true }
    );

    if (!updatedNote) {
      return res.status(httpStatus.NOT_FOUND).json({ error: "Note not found" });
    }

    res.status(httpStatus.OK).json({ data: updatedNote });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
});

// DELETE /api/Notes/:id
noteRoutes.delete("/:id", validateId, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedNote = await Note.findByIdAndDelete(id);

    if (!deletedNote) {
      return res.status(httpStatus.NOT_FOUND).json({ error: "Note not found" });
    }

    res.status(httpStatus.OK).json({ message: "Note deleted" });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
});

export { noteRoutes };
