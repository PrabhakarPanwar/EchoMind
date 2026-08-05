import express from "express";
import {
  authenticate,
  chatPrompt,
  login,
  logout,
  register,
} from "../controller/authContoller.js";
import verify from "../middleware/verify.js";

const HomeRouter = express.Router();

HomeRouter.post("/register", register);
HomeRouter.post("/login", login);

HomeRouter.post("/logout", logout);

HomeRouter.post("/promptData", verify, chatPrompt);

HomeRouter.get("/auth", verify, authenticate);

export default HomeRouter;
