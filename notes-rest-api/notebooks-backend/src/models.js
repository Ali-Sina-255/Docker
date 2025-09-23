import mongoose from "mongoose";

const { Schema } = mongoose;

const NotebookSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
      default: null,
    },
  },
  { timestamps: true }
);

const Notebook = mongoose.model("Notebook", NotebookSchema);

export { Notebook };
