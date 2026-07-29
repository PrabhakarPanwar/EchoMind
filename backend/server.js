import express from "express";
import cors from "cors";
import "dotenv/config";
import connect from "./config/connectDB.js";
import HomeRouter from "./routes/authRoute.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connect();

app.use(HomeRouter);

const port = process.env.PORT;

app.listen(port, () => console.log("working", port));
