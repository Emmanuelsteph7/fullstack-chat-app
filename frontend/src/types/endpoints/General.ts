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

  export interface User {
    _id: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    profilePic?: {
      public_id: string;
      url: string;
    };
  }

  export type LoadingStatus = "idle" | "loading" | "error" | "loaded";
}
