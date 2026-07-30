import { generateReply } from "../config/connectGenAi.js";

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

export const imagePrompt = async (req, res) => {
  
};

export const register = async (req, res) => {};
export const login = async (req, res) => {};
