import nodemailer from "nodemailer";
import { otpTemplate } from "../templates/otpTemplate";
import { NODEMAILER_USER_EMAIL, NODEMAILER_USER_PASS } from "../constants";

const transporter = nodemailer.createTransport({
  secure: true,
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: NODEMAILER_USER_EMAIL,
    pass: NODEMAILER_USER_PASS,
  },
});

interface ISendMailOptions {
  subject: string;
  html: string;
  to: string;
}

export const sendMail = async ({ html, subject, to }: ISendMailOptions) => {
  await transporter.sendMail({
    from: `"Eming ChatChat 💬" <${NODEMAILER_USER_EMAIL}>`, // sender address
    to, // list of receivers
    subject, // Subject line
    html, // html body
  });
};
