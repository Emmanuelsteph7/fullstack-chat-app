import { Document } from "mongoose";

export namespace Message {
  export type MessageStatus = "sent" | "delivered" | "read";

  export interface MessageModel extends Document {
    senderId: string;
    receiverId: string;
    text: string;
    image: any;
    status: MessageStatus;
  }
}
