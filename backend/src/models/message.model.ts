import mongoose, { Schema } from "mongoose";
import { Api } from "../types";
import { USER_MODEL_NAME } from "./user.model";

const messageSchema: Schema = new Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: USER_MODEL_NAME,
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: USER_MODEL_NAME,
      required: true,
    },
    text: {
      type: String,
    },
    image: {
      public_id: String,
      url: String,
    },
    status: {
      type: String,
      enum: ["sent", "delivered", "read"],
      default: "sent",
    },
    reactions: {
      type: [
        {
          userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
          },
          emoji: { type: String, required: true },
        },
      ],
      default: [],
    },
  },
  {
    // This will add created at and updated at timestamps
    timestamps: true,
    versionKey: false,
  }
);

const MessageModel = mongoose.model<Api.Models.Message.MessageModel>(
  "Message",
  messageSchema
);

export default MessageModel;
