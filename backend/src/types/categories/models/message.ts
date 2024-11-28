import { Document } from "mongoose";

export namespace Message {
  export interface MessageModel extends Document {
    senderId: string;
    receiverId: string;
    text: string;
    image: any;
  }
}
