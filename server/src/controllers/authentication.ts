import { createUser, getUserByEmail } from "../db/user";
const Otp = require("../db/otp");
import express from "express";
import { authentication, random } from "../helpers";
import nodemailer from "nodemailer";
import cloudinary from "../utils/cloudinary";
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username,phone,location } = req.body;
    const file = req?.file;
    console.log(email, "email");

    // if (!email || !password || !username || !file) {
    //   return res.sendStatus(400);
    // }

    const existingUser = await getUserByEmail(email);
    if (existingUser) return res.status(200).json({ message: "User Already Exist" });


    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(file.path);
    console.log(result, "imnage");

    const salt = random();
    const user = await createUser({
      email,
      username,
      phoneNumber:phone,
      location,
      profilePictureURL: result.secure_url, 
      authentication: { salt, password: authentication(salt, password) },
    });

    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const loginUser = async(req:express.Request,res:express.Response)=>{
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.sendStatus(400);
    }
    const user = await getUserByEmail(email).select(
      "+authentication.salt +authentication.password"
    );
    if (!user) {
      return res.sendStatus(400);
    }
    const expectedHash = authentication(user.authentication.salt, password);

    if (user.authentication.password !== expectedHash) {
      return res.sendStatus(403);
    }
    const salt = random();
    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString()
    );
    await user.save();
    console.log("login sucess")

    res.cookie("CrowdCraft", user.authentication.sessionToken, {
      domain: "localhost",
      path: "/",
    });
    return res.status(200).json({ user: { username: user.username, email: user.email, _id: user._id } }).end();

  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}
export const checkEmailExist = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    console.log("Hello");
    const { email } = req.query;
    console.log(email, "email");

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const existingUser = await getUserByEmail(email as string);
    if (existingUser) {
      return res.status(200).json({ message: "User already exists" });
    }

    return res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

interface Emailemail {
  to: string;
  subject: string;
  text: string;
  html: string;
}

const sendMail = async (
  transporter: nodemailer.Transporter,
  email: Emailemail
) => {
  await transporter.sendMail({
    from: '"Fusion Furni 👻" <foo@example.com>',
    to: email.to,
    subject: email.subject,
    text: email.text,
    html: email.html,
  });
};

const sendEmail = async (email: Emailemail) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "arunfloyd9497@gmail.com",
      pass: "cnyv vdpf ssro gzgr",
    },
  });

  await sendMail(transporter, email);
};

export const emailVerification = async (req: express.Request, res: express.Response) => {
  const emailId = req.query.emailId as string;

  if (!emailId || typeof emailId !== "string") {
    return res.status(400).send("Invalid email ID");
  }

  try {
    const otp = otpGenerator.generate(6, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    const salt = await bcrypt.genSalt(10);
    const encryptedOtp = await bcrypt.hash(otp, salt);

    const otps = new Otp({
      otp: encryptedOtp,
      expiresAt: new Date(Date.now() + 59 * 1000), // 59 seconds
      user: emailId,
    });

    const savedOtp = await otps.save();

    const resetURL = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
        <h2 style="color: #007BFF;">Verify Your Email</h2>
        <p>Hi, To authenticate, please use the following One Time Password (OTP)</p>
        <div style="background-color: #f0f0f0; padding: 10px; border-radius: 5px; margin-bottom: 20px;">
          <h3 style="margin: 0; color: #007BFF;">${otp}</h3>
        </div>
        <p>Don't share this OTP with anyone. Our customer service team will never ask you for your password, OTP, credit card, or banking info.</p>
        <p>If you did not request this verification, please ignore this email.</p>
        <p>We hope to see you again soon.</p>
        <p style="color: #007BFF;">From Fusion Furni</p>
      </div>`;

    const email = {
      to: emailId,
      text: "Hey User",
      subject: "OTP Verification",
      html: resetURL,
    };

    await sendEmail(email);

    // Schedule the deletion of the OTP after 59 seconds
    setTimeout(async () => {
      try {
        await Otp.findByIdAndDelete(savedOtp._id);
        console.log(`OTP for email ${emailId} deleted after 59 seconds`);
      } catch (deleteError) {
        console.error('Error deleting OTP:', deleteError);
      }
    }, 59 * 1000);

    return res.status(200).json("newUser").end();
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
};

export const verifyEmail = async (
  req: express.Request,
  res: express.Response
) => {
  const { otp, email } = req.body;
  console.log(otp, email, "fdf");

  try {
    if (!otp) {
      return res.status(400).send("Invalid Otp");
    }
    if (!email || typeof email !== "string") {
      return res.status(400).send("Invalid email ID");
    }
    const storedOtp = await Otp.findOne({ user: email });
    console.log(storedOtp);

    if (storedOtp) {
      const isMatch = await bcrypt.compare(otp, storedOtp.otp);
      console.log(isMatch, "true");
      if (isMatch) {
        return res.status(200).json({ message: "Sucess" });
      } else {
        return res.status(200).json({ message: "Entered OTP is Wrong" });
      }
    } else {
      return res.status(200).json({ message: "Entered OTP is Wrong " });
    }
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
};
