import { Document } from "mongoose";

export namespace Otp {
  export interface OtpModel extends Document {
    email: string;
    otp: string;
    expiresAt: Date;
  }
}
