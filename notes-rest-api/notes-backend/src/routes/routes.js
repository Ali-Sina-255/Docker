import express from "express";
import httpStatus from "http-status";
import { Note } from "../models/notes.model.js";
import mongoose from "mongoose";
import axios from "axios";

const notebooksAPIUrl = process.env.NOTEBOOK_API_URL;
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
    const { name, content, notebookId } = req.body;
    let validatedNotebookId = null;

    // --- Validate required fields
    if (!name || !content) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ message: "name and content are required!!" });
    }

    // --- Validate notebookId if provided
    if (!notebookId) {
      console.info({
        message: "notebook id not provided. Storing note without notebook id",
      });
    } else if (!mongoose.Types.ObjectId.isValid(notebookId)) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: "Invalid notebookId", notebookId });
    } else {
      try {
        await axios.get(`${notebooksAPIUrl}/${notebookId}`);
        validatedNotebookId = notebookId;
      } catch (error) {
        if (error.response && error.response.status === 404) {
          return res
            .status(httpStatus.BAD_REQUEST)
            .json({ message: "Notebook not found" });
        }
        console.error({
          message: "Error verifying notebookId with upstream notebook service",
          notebookId,
          error: error.message,
        });
        return res
          .status(httpStatus.SERVICE_UNAVAILABLE)
          .json({ message: "Notebook service unavailable" });
      }
    }

    // --- Create the note
    const note = await Note.create({
      name,
      content,
      notebookId: validatedNotebookId,
    });

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
