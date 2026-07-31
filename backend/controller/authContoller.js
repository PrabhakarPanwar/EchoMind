import bcrypt from "bcrypt";
import { generateReply } from "../config/connectGenAi.js";
import { UserSM } from "./../models/User.js";

export const register = async (req, res) => {
  const { name, pwd, email } = req.body;

  if (!name || !pwd || !email) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const currentReg = await UserSM.findOne({ email: email });

  if (currentReg) {
    return res.status(409).json({
      error: "An account with this email already exists. Please Login.",
    });
  }

  const hashPwd = await bcrypt.hash(pwd, 10);
  await UserSM.create({ name, password: hashPwd, email });
  return res.status(200).json({
    message: "Account created successfully. You can now sign in.",
  });
};

export const login = async (req, res) => {
  const { pwd, email } = req.body;

  if (!pwd || !email) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const currentLog = await UserSM.findOne({ email: email });

  if (currentLog) {
    const match = await bcrypt.compare(pwd, currentLog.password);
    if (match) {
      return res.status(200).json({
        message: "SuccessFully Login",
      });
    }
    return res.status(409).json({
      error: "Incorrect Password",
    });
  }
  return res.status(409).json({
    error: "Incorrect Email",
  });
};

export const chatPrompt = async (req, res) => {
  const { prompt } = req.body;
  if (!prompt || !prompt.trim()) {
    return res.status(400).json({ message: "Prompt is required" });
  }

  try {
    const reply = await generateReply(prompt);
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to generate response" });
  }
};

export const imagePrompt = async (req, res) => {};

