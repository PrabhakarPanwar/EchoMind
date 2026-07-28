import express from "express";
import cors from "cors";
import "dotenv/config";
import connect from "./config/connectDB.js";
import HomeRouter from "./routes/authRoute.js";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
connect();

app.use(HomeRouter);

const port = process.env.PORT;

app.listen(port, () => console.log("working", port));
