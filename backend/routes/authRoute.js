import express from "express";
import { chatPrompt } from "../controller/authContoller.js";

const HomeRouter = express.Router();

HomeRouter.post("/promptData", chatPrompt);

export default HomeRouter;
