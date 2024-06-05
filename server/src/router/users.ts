import {
  checkEmailExist,
  emailVerification,
  loginUser,
  verifyEmail,
} from "../controllers/authentication";
import express from "express";

export default (router: express.Router) => {
  router.get("/checkEmail", checkEmailExist);
  router.get("/emailVerification", emailVerification);
  router.post("/verifyOTP", verifyEmail);
  router.post("/",loginUser)
};
