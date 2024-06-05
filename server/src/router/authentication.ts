import { register } from "../controllers/authentication";
import express from "express";
import upload from "../middleware/multer";

export default (router: express.Router) => {
  router.post("/auth/register",upload.single('image'), register);
};
