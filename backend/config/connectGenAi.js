import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateReply(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: `Talk like a friend without filter ${prompt}`,
  });

  return response.text;
}
