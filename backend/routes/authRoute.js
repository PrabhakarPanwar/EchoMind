import express from "express";
import { chatPrompt, login, register } from "../controller/authContoller.js";

const HomeRouter = express.Router();

HomeRouter.post("/register", register);
HomeRouter.post("/login", login);
HomeRouter.post("/promptData", chatPrompt);

export default HomeRouter;
