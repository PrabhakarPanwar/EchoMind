import express from "express";
import { promptData } from "../controller/authContoller.js";

const HomeRouter = express();

HomeRouter.post("/promptData", promptData);

export default HomeRouter;
