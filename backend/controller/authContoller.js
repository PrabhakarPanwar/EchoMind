import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateReply } from "../config/connectGenAi.js";
import { UserSM } from "./../models/User.js";

export const register = async (req, res) => {
  const { name, pwd, email } = req.body;

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
    name,
  });
};

export const login = async (req, res) => {
  const { pwd, email } = req.body;

  const secretKey = process.env.SECRET_KEY;

  const currentLog = await UserSM.findOne({ email: email });

  if (currentLog) {
    const match = await bcrypt.compare(pwd, currentLog.password);
    const userId = currentLog.id;
    if (match) {
      const token = await jwt.sign({ userId }, secretKey, {
        expiresIn: "1hr",
      });

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.COOKIE_SECURE,
        sameSite: process.env.COOKIE_SAMESITE,
        maxAge: 60 * 60 * 1000,
        path: "/",
      });

      return res.status(200).json({
        message: "SuccessFully Login",
      });
    }
    return res.status(409).json({
      error: "Incorrect Password",
    });
  }
  return res.status(409).json({
    error: "This Email is not Registered.Please Sign Up",
  });
};

export const authenticate = async (req, res) => {
  const user = req.user;
  return res.json({ user });
};

export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.COOKIE_SECURE,
    sameSite: process.env.COOKIE_SAMESITE,
  });
  res.status(200).json({ message: "Logged out successfully" });
};

export const chatPrompt = async (req, res) => {
  const { prompt } = req.body;

  try {
    const reply = await generateReply(prompt);
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to generate response" });
  }
};

export const imagePrompt = async (req, res) => {};
