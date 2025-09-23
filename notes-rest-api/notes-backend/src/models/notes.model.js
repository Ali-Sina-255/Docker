import mongoose from "mongoose";
const Schema = mongoose.Schema;

const NotesSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: false,
      default: null,
    },
    notebookId: {
      type: Schema.Types.ObjectId,
      required: false,
      default: null,
    },
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", NotesSchema);
export { Note };
