import express from "express";
import { first } from "../controller/authContoller.js";

const HomeRouter = express();

HomeRouter.get("/ok", first);

export default HomeRouter;
