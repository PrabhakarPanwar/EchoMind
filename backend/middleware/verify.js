import jwt from "jsonwebtoken";
import { UserSM } from "../models/User.js";

const verify = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "No token provided. Please login." });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const Userid = decoded.userId;
    const user = await UserSM.findById(Userid);

    if (!user) {
      return res.json({
        success: false,
        message: "Not authorized,user not found",
      });
    }

    req.user = user;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ error: "Session expired. Please login again." });
    }
    return res.status(401).json({ error: "Invalid token." });
  }
};

export default verify;
