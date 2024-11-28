import { Document } from "mongoose";

export namespace User {
  export interface UserModel extends Document {
    name: string;
    email: string;
    password: string;
    profilePic?: {
      public_id: string;
      url: string;
    };
  }
}
