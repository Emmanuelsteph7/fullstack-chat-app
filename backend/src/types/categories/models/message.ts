import mongoose, { Document } from "mongoose";

export namespace Message {
  export type MessageStatus = "sent" | "delivered" | "read";

  export interface MessageReaction {
    emoji: string;
    userId: mongoose.Types.ObjectId;
  }

  export interface MessageBackup {
    reactions: mongoose.Types.DocumentArray<{
      emoji: string;
      userId: mongoose.Types.ObjectId;
    }>;
    text?: string | null | undefined;
    image?:
      | {
          public_id?: string | null | undefined;
          url?: string | null | undefined;
        }
      | null
      | undefined;
  }

  export interface MessageModel extends Document {
    senderId: string;
    receiverId: string;
    text: string;
    isEdited: boolean;
    isDeleted: boolean;
    isForwarded: boolean;
    image: any;
    status: MessageStatus;
    reactions: MessageReaction[];
    backupMessages?: MessageBackup | null | undefined;
  }
}
