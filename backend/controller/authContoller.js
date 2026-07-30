import { generateReply } from "../config/connectGenAi.js";

export const promptData = async (req, res) => {
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

export const regiseter = async (req, res) => {};
