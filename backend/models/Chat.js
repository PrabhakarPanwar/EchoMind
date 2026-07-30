import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  role: { type: "String", required: true },
  content: { type: "String", required: true, unique: true },
  timestamp: { type: "String", required: true, unique: true },
  isImage: { type: Boolean },
});

export const chatSM = mongoose.model("chat", chatSchema);
