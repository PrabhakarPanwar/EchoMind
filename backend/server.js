import express from "express";
import cors from "cors";
import "dotenv/config";
import connect from "./config/connectDB.js";
import cookieParser from "cookie-parser";
import HomeRouter from "./routes/authRoute.js";

const allowedOrigins = process.env.ALLOWED_ORIGIN;

const app = express();
connect();
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(HomeRouter);

const port = process.env.PORT;

app.listen(port, () => console.log("working", port));
