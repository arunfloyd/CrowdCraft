// import { render } from "@react-email/components";
// import nodemailer from "nodemailer";
// import { Email } from "./email";

// const transporter = nodemailer.createTransport({
//   host: "smtp.forwardemail.net",
//   port: 465,
//   secure: true,
//   auth: {
//     user: "arunfloyd9497@gmail.com",
//     pass: "cnyv vdpf ssro gzgr",
//   },
// });

// const emailHtml = render(<Email url="https://example.com" />);

// const options = {
//   from: "CrowdCraft@gmail.com",
//   to: "user@gmail.com",
//   subject: "Verification Code",
//   html: emailHtml,
// };

// await transporter.sendMail(options);


import { render } from "@react-email/components";
import nodemailer from "nodemailer";
import { Email } from "./email";

const sendEmail = async () => {
  // Configure the transporter
  const transporter = nodemailer.createTransport({
    host: "smtp.forwardemail.net",
    port: 465,
    secure: true,
    auth: {
      user: "your-email@gmail.com",
      pass: "your-email-password",
    },
  });

  // Render the email HTML
  const emailHtml = render(<Email url="https://example.com" />);

  // Define email options
  const options = {
    from: "CrowdCraft@gmail.com",
    to: "user@gmail.com",
    subject: "Verification Code",
    html: emailHtml,
  };

  // Send the email
  try {
    await transporter.sendMail(options);
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

// Call the function to send the email
sendEmail();
