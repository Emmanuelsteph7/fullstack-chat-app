import mongoose, { Schema } from "mongoose";
import { Api } from "../types";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const OTP_MODEL_NAME = "Otp";

const otpSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Please enter your email"],
      validate: {
        validator: (value: string) => emailRegex.test(value),
        message: "Please enter valid email",
      },
      unique: true,
    },
    otp: { type: String, required: true },
    expiresAt: { type: Date, required: true },
  },
  {
    // This will add created at and updated at timestamps
    timestamps: true,
    versionKey: false,
  }
);

const OtpModel = mongoose.model<Api.Models.Otp.OtpModel>(
  OTP_MODEL_NAME,
  otpSchema
);

export default OtpModel;
