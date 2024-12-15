/* eslint-disable @typescript-eslint/no-namespace */
export namespace General {
  export interface SuccessResponse {
    success: boolean;
    message: string;
  }

  export interface ErrorResponse {
    success: boolean;
    errMessage: string;
  }

  export interface ImageObj {
    public_id: string;
    url: string;
  }

  export interface User {
    _id: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    profilePic?: ImageObj;
  }

  export type MessageStatus = "sent" | "delivered" | "read";

  export interface Message {
    _id: string;
    senderId: string;
    receiverId: string;
    text: string;
    image: ImageObj;
    status: MessageStatus;
    createdAt: string;
    updatedAt: string;
  }

  export type LoadingStatus = "idle" | "loading" | "error" | "loaded";
}
