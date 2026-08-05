import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    role: { type: String, enum: ["user", "model"], required: true },
    parts: [{ text: String }],
  },
  { _id: false },
);

const chatSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    messages: [messageSchema],
  },
  {
    timestamps: true,
    _id: false,
  },
);

export const chatSM = mongoose.model("chat", chatSchema);
