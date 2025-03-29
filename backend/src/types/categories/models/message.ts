import mongoose, { Document } from "mongoose";

export namespace Message {
  export type MessageStatus = "sent" | "delivered" | "read";

  export type MessageReaction = {
    emoji: string;
    userId: mongoose.Types.ObjectId;
  };

  export interface MessageModel extends Document {
    senderId: string;
    receiverId: string;
    text: string;
    image: any;
    status: MessageStatus;
    reactions: MessageReaction[];
  }
}
