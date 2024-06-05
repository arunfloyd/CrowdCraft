require('dotenv').config();
import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import multer from "multer";
import router from "./router";
const app = express();
const uploader = multer();
app.use(
  cors({
    credentials: true,
  })
);
app.use(express.json());

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
// app.use(uploader.none());

const server = http.createServer(app);

server.listen(8080, () => {
  console.log("Server is Started");
});

const MONGO_URL = "mongodb://localhost:27017/CrowdCraft";

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on("error", (error: Error) => console.log(error));

app.use("/", router());
