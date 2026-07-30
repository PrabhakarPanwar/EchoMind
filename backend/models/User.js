import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: "String", required: true },
  email: { type: "String", required: true, unique: true },
  password: { type: "String", required: true, unique: true },
  credits: { type: Number, default: 20 },
});

export const UserSM = mongoose.model("user", userSchema);
