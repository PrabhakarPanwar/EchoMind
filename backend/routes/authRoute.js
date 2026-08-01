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
HomeRouter.post("/promptData", chatPrompt);
HomeRouter.post("/logout", logout);

HomeRouter.get("/auth", verify, authenticate);

export default HomeRouter;
