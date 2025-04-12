import mongoose, { Schema } from "mongoose";
import { Api } from "../types";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const USER_MODEL_NAME = "User";

const userSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      validate: {
        validator: (value: string) => emailRegex.test(value),
        message: "Please enter valid email",
      },
      unique: true,
    },
    password: {
      // Password is supposed to be required, but it isn't because of the social authentication
      type: String,
      minlength: [6, "Password must be at least 6 characters"],
      select: false, // this means when the user is displayed, the password won't be sent along
    },
    profilePic: {
      public_id: String,
      url: String,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    // This will add created at and updated at timestamps
    timestamps: true,
    versionKey: false,
  }
);

const UserModel = mongoose.model<Api.Models.User.UserModel>(
  USER_MODEL_NAME,
  userSchema
);

export default UserModel;
